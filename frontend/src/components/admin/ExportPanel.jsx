import React, { useState } from 'react';
import { exportApi } from '../../api/client';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';

const ExportPanel = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (type) => {
    try {
      setExporting(true);
      const res = type === 'json' ? await exportApi.getJson() : await exportApi.getExcel();
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const ext = type === 'json' ? 'json' : 'xlsx';
      link.setAttribute('download', `bgmi_leaderboard_${timestamp}.${ext}`);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert(`Export failed: ${error.message}`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={() => handleExport('json')}
        disabled={exporting}
        className="flex items-center justify-between p-4 bg-gunmetal border-l-4 border-gold shadow-lg hover:bg-white/5 transition-all group disabled:opacity-30 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 bg-black flex items-center justify-center border border-white/10 group-hover:border-gold transition-colors">
                 <FileJson className="text-gold w-5 h-5" />
            </div>
            <div className="text-left">
                <div className="font-teko font-bold text-xl leading-none text-white uppercase tracking-wide">Report.JSON</div>
                <div className="text-[9px] text-gold/60 font-black uppercase tracking-widest mt-1">Raw Data Structure</div>
            </div>
        </div>
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileJson size={64} />
        </div>
      </button>

      <button
        onClick={() => handleExport('excel')}
        disabled={exporting}
        className="flex items-center justify-between p-4 bg-gunmetal border-l-4 border-success shadow-lg hover:bg-white/5 transition-all group disabled:opacity-30 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 bg-black flex items-center justify-center border border-white/10 group-hover:border-success transition-colors">
                 <FileSpreadsheet className="text-success w-5 h-5" />
            </div>
             <div className="text-left">
                <div className="font-teko font-bold text-xl leading-none text-white uppercase tracking-wide">Sheets.XLSX</div>
                <div className="text-[9px] text-success/60 font-black uppercase tracking-widest mt-1">Formatted Grid</div>
            </div>
        </div>
         <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileSpreadsheet size={64} />
        </div>
      </button>
      
      <div className="sm:col-span-2 pt-4 border-t border-white/5 mt-2 flex justify-center">
        <div className="flex items-center gap-2 p-2 bg-black/20 rounded-full border border-white/5 text-[9px] text-gray-500 font-bold uppercase tracking-widest px-6">
            <Download size={12} className="animate-bounce" />
            Archiving Recommended After Match Completion
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
