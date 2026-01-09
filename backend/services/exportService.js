/**
 * Export Service
 * Handles JSON and Excel export functionality
 */

import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { EXPORT_DIR } from '../config/constants.js';
import { getLeaderboard } from './rankingService.js';

// Ensure export directory exists
const ensureExportDir = () => {
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }
};

/**
 * Generate JSON export
 * @param {array} teams - Array of team objects
 * @param {object} matchState - Current match state
 * @returns {object} Export data
 */
const generateJsonExport = (teams, matchState) => {
  const leaderboard = getLeaderboard(teams);
  
  const exportData = {
    exportTimestamp: new Date().toISOString(),
    tournamentInfo: {
      totalMatches: matchState.matchNumber,
      currentState: matchState.state,
      totalTeams: teams.length
    },
    leaderboard: leaderboard.map(team => ({
      rank: team.rank,
      teamName: team.name,
      matchesPlayed: team.matchesPlayed,
      totalKills: team.totalKills,
      totalPlacementPoints: team.totalPlacementPoints,
      totalKillPoints: team.totalKillPoints,
      totalPoints: team.totalPoints,
      firstPlaceFinishes: team.firstPlaceFinishes,
      qualificationStatus: team.qualificationStatus
    }))
  };
  
  return exportData;
};

/**
 * Save JSON export to file
 * @param {array} teams - Array of team objects
 * @param {object} matchState - Current match state
 * @returns {string} File path
 */
const saveJsonExport = (teams, matchState) => {
  ensureExportDir();
  
  const exportData = generateJsonExport(teams, matchState);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `leaderboard_match${matchState.matchNumber}_${timestamp}.json`;
  const filepath = path.join(EXPORT_DIR, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));
  
  return filepath;
};

/**
 * Generate Excel export
 * @param {array} teams - Array of team objects
 * @param {object} matchState - Current match state
 * @returns {Promise<string>} File path
 */
const generateExcelExport = async (teams, matchState) => {
  ensureExportDir();
  
  const leaderboard = getLeaderboard(teams);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Leaderboard');
  
  // Set column widths
  worksheet.columns = [
    { header: 'Rank', key: 'rank', width: 8 },
    { header: 'Team Name', key: 'teamName', width: 25 },
    { header: 'Matches Played', key: 'matchesPlayed', width: 15 },
    { header: 'Total Kills', key: 'totalKills', width: 12 },
    { header: 'Placement Points', key: 'placementPoints', width: 18 },
    { header: 'Kill Points', key: 'killPoints', width: 12 },
    { header: 'Total Points', key: 'totalPoints', width: 15 },
    { header: '1st Place Wins', key: 'firstPlaceWins', width: 15 },
    { header: 'Status', key: 'status', width: 12 }
  ];
  
  // Style header row
  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' }
  };
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  
  // Add data rows
  leaderboard.forEach((team, index) => {
    const row = worksheet.addRow({
      rank: team.rank,
      teamName: team.name,
      matchesPlayed: team.matchesPlayed,
      totalKills: team.totalKills,
      placementPoints: team.totalPlacementPoints,
      killPoints: team.totalKillPoints,
      totalPoints: team.totalPoints,
      firstPlaceWins: team.firstPlaceFinishes,
      status: team.qualificationStatus
    });
    
    // Alternate row colors
    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE7E6E6' }
      };
    }
    
    // Highlight qualified teams
    if (team.qualificationStatus === 'QUALIFIED') {
      row.getCell('status').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF92D050' }
      };
      row.getCell('status').font = { bold: true };
    } else if (team.qualificationStatus === 'ELIMINATED') {
      row.getCell('status').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF6B6B' }
      };
    }
    
    // Center align all cells
    row.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  
  // Add borders to all cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });
  
  // Add tournament info at the bottom
  const infoRow = worksheet.addRow([]);
  worksheet.addRow(['Tournament Summary']);
  worksheet.addRow(['Total Matches:', matchState.matchNumber]);
  worksheet.addRow(['Total Teams:', teams.length]);
  worksheet.addRow(['Export Date:', new Date().toLocaleString()]);
  
  // Save file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `leaderboard_match${matchState.matchNumber}_${timestamp}.xlsx`;
  const filepath = path.join(EXPORT_DIR, filename);
  
  await workbook.xlsx.writeFile(filepath);
  
  return filepath;
};

/**
 * Get all export files
 * @returns {array} List of export files
 */
const getExportFiles = () => {
  ensureExportDir();
  
  const files = fs.readdirSync(EXPORT_DIR);
  return files.map(filename => ({
    filename,
    path: path.join(EXPORT_DIR, filename),
    createdAt: fs.statSync(path.join(EXPORT_DIR, filename)).birthtime
  }));
};

export {
  generateJsonExport,
  saveJsonExport,
  generateExcelExport,
  getExportFiles
};
