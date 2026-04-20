import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Construction, Trash2, CheckCircle2, Info, 
  Target, RotateCcw, ArrowRight, HelpCircle, 
  Repeat, ArrowUp, Zap, ChevronRight, ArrowDown
} from 'lucide-react';

interface Block {
  id: string;
  type: 'terminal' | 'io' | 'process' | 'decision' | 'loop-connector';
  label: string;
}

const SHAPE_OPTIONS: Block[] = [
  { id: 'start', type: 'terminal', label: 'START' },
  { id: 'end', type: 'terminal', label: 'END' },
  { id: 'input_score', type: 'io', label: 'INPUT SCORE' },
  { id: 'init_total', type: 'process', label: 'TOTAL = 0' },
  { id: 'init_count', type: 'process', label: 'COUNT = 1' },
  { id: 'calc_sum', type: 'process', label: 'TOTAL = TOTAL + SCORE' },
  { id: 'output_msg', type: 'io', label: 'OUTPUT RESULT' },
  { id: 'is_pass', type: 'decision', label: 'SCORE >= 50?' },
  { id: 'is_done', type: 'decision', label: 'COUNT < 5?' },
  { id: 'inc_count', type: 'process', label: 'COUNT = COUNT + 1' },
  { id: 'loop_back', type: 'loop-connector', label: 'LOOP BACK' },
];

const MISSIONS = [
  {
    id: 1,
    title: "Mission 1: The Basic Adder",
    objective: "Create a Sequence: Start, Initialize TOTAL to 0, Input a Score, and Add it to TOTAL.",
    targetSequence: ['start', 'init_total', 'input_score', 'calc_sum', 'end'],
    hint: "Every algorithm begins with START and ends with END. Place your initialization before you accept user input."
  },
  {
    id: 2,
    title: "Mission 2: The Logic Guard",
    objective: "Selection Challenge: Input a score, decide if it's a pass (>= 50), output the result if it passes, and end.",
    targetSequence: ['start', 'input_score', 'is_pass', 'output_msg', 'end'],
    hint: "Selection uses the Diamond shape. It usually filters whether a process or output should happen."
  },
  {
    id: 3,
    title: "Mission 3: The 5-Count Loop",
    objective: "Iteration Challenge: Create a loop that inputs scores 5 times. Use COUNT, increment it, and use a Loop Connector to return to the input step.",
    targetSequence: ['start', 'init_count', 'input_score', 'inc_count', 'is_done', 'loop_back', 'end'],
    hint: "A loop needs a counter (COUNT), a way to increase it (COUNT+1), and a connector to point back up to the top of the logic."
  }
];

const B1FlowchartLabSection: React.FC = () => {
  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const [currentBuild, setCurrentBuild] = useState<Block[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'idle', msg: string }>({ type: 'idle', msg: '' });

  const mission = MISSIONS[activeMissionIdx];

  const addBlock = (block: Block) => {
    if (currentBuild.length >= 12) return;
    setCurrentBuild([...currentBuild, { ...block, id: `${block.id}-${Date.now()}` }]);
    setFeedback({ type: 'idle', msg: '' });
  };

  const removeBlock = (index: number) => {
    setCurrentBuild(currentBuild.filter((_, i) => i !== index));
    setFeedback({ type: 'idle', msg: '' });
  };

  const checkBuild = () => {
    const buildKeys = currentBuild.map(b => b.id.split('-')[0]);
    const isCorrect = JSON.stringify(buildKeys) === JSON.stringify(mission.targetSequence);

    if (isCorrect) {
      setFeedback({ type: 'success', msg: 'Algorithm Validated! Your logic structure is efficient and correct.' });
    } else {
      setFeedback({ type: 'error', msg: `Logical error detected. Check your ${mission.title} requirements.` });
    }
  };

  const nextMission = () => {
    if (activeMissionIdx < MISSIONS.length - 1) {
      setActiveMissionIdx(activeMissionIdx + 1);
      setCurrentBuild([]);
      setFeedback({ type: 'idle', msg: '' });
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">Construction Lab</h1>
        <p className="text-xl kalam text-slate-600 italic">"Assemble Algorithms with Standard Symbols"</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Component Toolbox */}
        <div className="lg:col-span-4 space-y-6">
          <HandwrittenCard title="Logic Toolbox" bgColor="bg-white">
            <p className="text-[10px] kalam font-bold text-slate-400 mb-4 uppercase tracking-widest">Select shapes to build your flow:</p>
            <div className="grid grid-cols-2 gap-2">
              {SHAPE_OPTIONS.map((opt) => (
                <button 
                  key={opt.id}
                  onClick={() => addBlock(opt)}
                  className="p-3 border-2 border-slate-900 rounded-xl hover:bg-slate-50 hover:scale-105 transition-all flex flex-col items-center group shadow-sm bg-white"
                >
                  <div className="mb-2">
                    <ShapeMiniIcon type={opt.type} />
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-700 text-center">{opt.label}</span>
                </button>
              ))}
            </div>
          </HandwrittenCard>

          <div className="bg-slate-900 text-white p-6 rounded-3xl sketch-border shadow-2xl">
             <h3 className="text-xl font-black handwritten text-yellow-400 mb-4 flex items-center"><Target size={18} className="mr-2"/> Objective</h3>
             <h4 className="font-bold text-sm text-indigo-300 mb-2">{mission.title}</h4>
             <p className="text-xs kalam text-slate-300 leading-relaxed italic mb-6">"{mission.objective}"</p>
             <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-start space-x-2">
                <HelpCircle size={14} className="text-yellow-500 shrink-0" />
                <p className="text-[10px] kalam text-slate-400"><b>Hint:</b> {mission.hint}</p>
             </div>
          </div>
        </div>

        {/* Construction Canvas */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
           <HandwrittenCard title="Flowchart Workspace" bgColor="bg-slate-50" className="border-4 border-slate-900 min-h-[600px] flex flex-col items-center py-16 relative overflow-y-auto overflow-x-hidden">
              
              {currentBuild.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 pointer-events-none">
                   <Construction size={100} className="mb-4 text-slate-300" />
                   <p className="kalam font-bold text-slate-400 text-2xl">Build your algorithm here...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full max-w-md relative pb-10">
                   {currentBuild.map((block, idx) => {
                     const isLoop = block.type === 'loop-connector';
                     return (
                       <React.Fragment key={block.id}>
                          <div className="group relative z-10">
                            <ShapeDisplay type={block.type} label={block.label} />
                            <button 
                              onClick={() => removeBlock(idx)}
                              className="absolute -top-2 -right-4 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-50"
                            >
                              <Trash2 size={12}/>
                            </button>
                            
                            {/* Improved Loop Back Visual Arrow */}
                            {isLoop && (
                                <div className="absolute top-1/2 right-full h-full -translate-y-1/2 flex items-center pr-2">
                                    <svg width="100" height="450" className="absolute right-0 bottom-1/2 pointer-events-none overflow-visible">
                                        <path 
                                            d={`M 0 0 L -50 0 L -50 -380 L 0 -380`} 
                                            fill="none" 
                                            stroke="#6366f1" 
                                            strokeWidth="4" 
                                            strokeDasharray="8,4"
                                            className="animate-pulse"
                                        />
                                        <ArrowUp size={24} className="text-indigo-600 absolute -top-[392px] -right-3" />
                                    </svg>
                                </div>
                            )}
                          </div>
                          
                          {/* Connector Arrow to next block */}
                          {idx < currentBuild.length - 1 && (
                            <div className="flex flex-col items-center py-2 z-0">
                              <div className="w-1.5 h-10 bg-slate-900"></div>
                              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-900 -mt-[1px]"></div>
                            </div>
                          )}
                       </React.Fragment>
                     );
                   })}
                </div>
              )}

              <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                 <button 
                  onClick={() => setCurrentBuild([])}
                  className="p-3 bg-white text-slate-400 rounded-full border-2 border-slate-200 hover:text-red-500 hover:border-red-200 transition-all"
                  title="Clear Workspace"
                 >
                   <RotateCcw size={20}/>
                 </button>
                 <button 
                  onClick={checkBuild}
                  disabled={currentBuild.length === 0}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-full font-black shadow-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95 flex items-center border-b-4 border-indigo-900"
                 >
                   <CheckCircle2 size={18} className="mr-2" /> VALIDATE ALGORITHM
                 </button>
              </div>
              
              <div className="absolute top-6 left-6 flex flex-col space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400">Blueprint Grid</span>
                <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                </div>
              </div>
           </HandwrittenCard>

           {feedback.type !== 'idle' && (
             <div className={`p-8 rounded-[2.5rem] border-4 animate-in slide-in-from-top-6 shadow-2xl ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {feedback.type === 'success' ? <CheckCircle2 size={40}/> : <Zap size={40} className="text-rose-500" />}
                    <div>
                      <h4 className="font-black text-2xl handwritten">{feedback.type === 'success' ? 'Algorithm Approved!' : 'Logic Sequence Error'}</h4>
                      <p className="text-sm kalam font-bold opacity-80">{feedback.msg}</p>
                    </div>
                  </div>
                  {feedback.type === 'success' && activeMissionIdx < MISSIONS.length - 1 && (
                    <button 
                      onClick={nextMission}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-full font-black flex items-center hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                    >
                      CONTINUE MISSION <ArrowRight size={20} className="ml-2"/>
                    </button>
                  )}
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Internal Helpers for Mini Icons
const ShapeMiniIcon = ({ type }: { type: string }) => {
  if (type === 'terminal') return <div className="w-10 h-4 border-2 border-slate-900 rounded-full bg-slate-100 shadow-sm"></div>;
  if (type === 'io') return <div style={{clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'}} className="w-12 h-4 border-2 border-slate-900 bg-blue-100 shadow-sm"></div>;
  if (type === 'process') return <div className="w-12 h-4 border-2 border-slate-900 bg-green-100 shadow-sm"></div>;
  if (type === 'decision') return <div className="w-6 h-6 border-2 border-slate-900 rotate-45 bg-amber-100 shadow-sm"></div>;
  if (type === 'loop-connector') return <div className="flex flex-col items-center"><Repeat size={14} className="text-indigo-600" /><ArrowUp size={8} className="text-indigo-400" /></div>;
  return null;
};

// Formal Flowchart Symbols for Display
const ShapeDisplay = ({ type, label }: any) => {
  const baseClasses = "flex items-center justify-center font-black transition-all duration-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-[11px] text-center p-3 uppercase leading-tight select-none";
  
  if (type === 'terminal') {
    return (
      <div className={`${baseClasses} w-36 h-12 rounded-full bg-slate-900 text-white`}>
        {label}
      </div>
    );
  }
  
  if (type === 'io') {
    return (
      <div 
        style={{clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'}} 
        className={`${baseClasses} w-52 h-12 bg-blue-500 text-white px-8`}
      >
        {label}
      </div>
    );
  }
  
  if (type === 'process') {
    return (
      <div className={`${baseClasses} w-52 h-12 bg-green-500 text-white`}>
        {label}
      </div>
    );
  }
  
  if (type === 'decision') {
    return (
      <div className="relative flex items-center justify-center">
         <div className={`${baseClasses} w-28 h-28 rotate-45 bg-amber-400 text-slate-900`}>
           <span className="-rotate-45 block w-full px-2">{label}</span>
         </div>
         {/* Branch Indicators */}
         <div className="absolute top-1/2 left-full translate-x-2 -translate-y-1/2 text-[9px] font-black text-green-600 bg-green-50 px-1 rounded border border-green-200">YES</div>
         <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 text-[9px] font-black text-red-600 bg-red-50 px-1 rounded border border-red-200">NO</div>
      </div>
    );
  }

  if (type === 'loop-connector') {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-52 h-14 bg-indigo-50 border-2 border-dashed border-indigo-600 rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-inner group transition-all hover:bg-indigo-100">
          <div className="flex items-center space-x-2">
             <Repeat size={16} className="text-indigo-600" />
             <span className="text-[11px] font-black text-indigo-900">RETURN TO LOOP HEAD</span>
          </div>
          <p className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Logic Re-entry</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default B1FlowchartLabSection;