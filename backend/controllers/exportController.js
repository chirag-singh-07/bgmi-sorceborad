/**
 * Export Controller
 * Handles data export operations
 */

import path from 'path';
import { getAllTeams } from '../models/team.js';
import { getCurrentMatchState } from '../models/match.js';
import { 
  generateJsonExport, 
  saveJsonExport, 
  generateExcelExport,
  getExportFiles 
} from '../services/exportService.js';

/**
 * Export data as JSON
 */
const exportJson = async (req, res) => {
  try {
    const teams = getAllTeams();
    const matchState = getCurrentMatchState();
    
    const filepath = saveJsonExport(teams, matchState);
    const filename = path.basename(filepath);
    
    console.log(`📄 JSON export created: ${filename}`);
    
    // Send file for download
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Error sending JSON file:', err);
        res.status(500).json({
          success: false,
          error: 'Failed to download file'
        });
      }
    });
  } catch (error) {
    console.error('Error exporting JSON:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Export data as Excel
 */
const exportExcel = async (req, res) => {
  try {
    const teams = getAllTeams();
    const matchState = getCurrentMatchState();
    
    const filepath = await generateExcelExport(teams, matchState);
    const filename = path.basename(filepath);
    
    console.log(`📊 Excel export created: ${filename}`);
    
    // Send file for download
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Error sending Excel file:', err);
        res.status(500).json({
          success: false,
          error: 'Failed to download file'
        });
      }
    });
  } catch (error) {
    console.error('Error exporting Excel:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get JSON data without saving to file
 */
const getJsonData = (req, res) => {
  try {
    const teams = getAllTeams();
    const matchState = getCurrentMatchState();
    
    const exportData = generateJsonExport(teams, matchState);
    
    res.json({
      success: true,
      data: exportData
    });
  } catch (error) {
    console.error('Error getting JSON data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * List all export files
 */
const listExports = (req, res) => {
  try {
    const files = getExportFiles();
    
    res.json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    console.error('Error listing exports:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export {
  exportJson,
  exportExcel,
  getJsonData,
  listExports
};
