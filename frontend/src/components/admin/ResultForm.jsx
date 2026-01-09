import React, { useState, useEffect } from 'react';
import { matchApi, teamApi } from '../../api/client';
import { Save, UserPlus, Trash2, Plus } from 'lucide-react';
import { cn } from '../../utils';

const ResultForm = ({ matchState }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize with at least one empty row or existing teams
  useEffect(() => {
    const initForm = async () => {
      try {
        const res = await teamApi.getAll();
        const teams = res.data.data;
        if (teams.length > 0) {
          setResults(teams.map(t => ({ teamName: t.name, kills: 0, placement: '' })));
        } else {
          setResults([{ teamName: '', kills: 0, placement: '' }]);
        }
      } catch (error) {
        setResults([{ teamName: '', kills: 0, placement: '' }]);
      }
    };
    initForm();
  }, []);

  const handleAddRow = () => {
    setResults([...results, { teamName: '', kills: 0, placement: '' }]);
  };

  const handleRemoveRow = (index) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newResults = [...results];
    newResults[index][field] = field === 'teamName' ? value : (value === '' ? '' : parseInt(value));
    setResults(newResults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matchState || matchState.state !== 'COMPLETED') {
      alert('Match status must be COMPLETED to submit results');
      return;
    }

    // Filter out empty rows and validate
    const validResults = results.filter(r => r.teamName.trim() !== '' && r.placement !== '');
    
    if (validResults.length === 0) {
      alert('Please enter at least one team result');
      return;
    }

    try {
      setLoading(true);
      await matchApi.submitResults(validResults);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Failed to submit: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const isFormDisabled = !matchState || matchState.state !== 'COMPLETED';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
       {/* Decorative Lines */}
       <div className="absolute left-[20px] top-0 bottom-0 w-[1px] bg-white/5 z-0" />
       
      <div className="space-y-2 relative z-10">
        <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-white/10 text-[9px] font-black text-gold uppercase tracking-[0.3em] opacity-70">
          <div className="col-span-1 text-center">ID</div>
          <div className="col-span-5">Squad Designation</div>
          <div className="col-span-3 text-center">Confirmed Kills</div>
          <div className="col-span-2 text-center">Rank #</div>
          <div className="col-span-1"></div>
        </div>
        
        {results.map((result, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center bg-black/40 p-1 border-l-2 border-transparent hover:border-gold hover:bg-white/5 transition-all group">
            <div className="col-span-1 text-center font-teko text-xl text-gray-600 group-hover:text-gold transition-colors pt-1">
               {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
            <div className="col-span-5">
              <input
                type="text"
                value={result.teamName}
                onChange={(e) => handleInputChange(index, 'teamName', e.target.value)}
                placeholder="[EMPTY SLOT]"
                disabled={isFormDisabled}
                className="w-full bg-transparent border-b border-white/10 px-2 py-1 font-teko text-xl tracking-wider text-white focus:border-gold focus:bg-gold/5 outline-none disabled:opacity-30 placeholder:text-gray-800 uppercase transition-all"
                required
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                min="0"
                value={result.kills}
                onChange={(e) => handleInputChange(index, 'kills', e.target.value)}
                disabled={isFormDisabled}
                className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-center font-teko text-xl text-gold focus:border-gold outline-none disabled:opacity-30"
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                min="1"
                max="16"
                value={result.placement}
                onChange={(e) => handleInputChange(index, 'placement', e.target.value)}
                placeholder="-"
                disabled={isFormDisabled}
                className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-center font-teko text-xl text-gray-300 focus:border-gold focus:text-white outline-none disabled:opacity-30"
                required
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                disabled={isFormDisabled}
                className="text-gray-800 hover:text-danger p-1 transition-colors disabled:opacity-0 opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={handleAddRow}
          disabled={isFormDisabled || results.length >= 16}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-dashed border-gray-700 hover:border-gold/50 hover:bg-gold/5 text-gray-500 hover:text-gold font-bold tracking-widest text-[10px] transition-colors disabled:opacity-30 uppercase"
        >
          <Plus size={14} />
          ADD SLOT
        </button>
        
        <button
          type="submit"
          disabled={isFormDisabled || loading}
          className={cn(
            "flex-1 flex items-center justify-center gap-3 py-4 clip-angled-sm font-black tracking-[0.2em] uppercase transition-all duration-300 text-xs shadow-lg relative overflow-hidden group",
            success ? 'bg-success text-black' : 'bg-gold hover:bg-white text-black disabled:opacity-30 disabled:grayscale'
          )}
        >
           {/* Button Shine Effect */}
           <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700" />
           
          {success ? (
            <>DATA UPLOAD COMPLETE ✓</>
          ) : (
            <>
              <Save size={18} />
              COMMIT TO DATABASE
            </>
          )}
        </button>
      </div>

      {isFormDisabled && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20 border border-danger/30">
            <div className="bg-black border border-danger p-4 flex flex-col items-center gap-2 text-danger animate-pulse">
                <Trash2 size={24} />
                <p className="text-[10px] font-black tracking-widest uppercase">
                    TERMINAL LOCKED: MATCH IN PROGRESS
                </p>
            </div>
        </div>
      )}
    </form>
  );
};

export default ResultForm;
