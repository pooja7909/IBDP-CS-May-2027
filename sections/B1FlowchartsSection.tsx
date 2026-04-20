import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  GitBranch, RotateCcw, Play, CheckCircle2, 
  Info, Table as TableIcon, Zap, 
  ChevronRight, ArrowDown, Calculator, Search, ArrowUp,
  Settings2, MousePointer2, HelpCircle, Layout, Terminal
} from 'lucide-react';

const B1FlowchartsSection: React.FC = () => {
  // Trace state for "Mental Model Challenge"
  const [traceStep, setTraceStep] = useState(0);
  const [inputN, setInputN] = useState(3);
  const [vars, setVars] = useState({ N: 3, Total: 0, Count: 1 });
  const [history, setHistory] = useState<{ step: string, n: string | number, total: string | number, count: string | number }[]>([]);
  const [userPrediction, setUserPrediction] = useState<string>('');
  const [predictionFeedback, setPredictionFeedback] = useState<null | boolean>(null);

  const symbols = [
    { name: 'Terminal', shape: 'Oval', use: 'START / END points.', desc: 'Every flowchart must have exactly one START and at least one END.', color: 'bg-slate-200 border-slate-900' },
    { name: 'Process', shape: 'Rectangle', use: 'Calculations & Assignments.', desc: 'Used for internal operations like "Total = 0" or "X = X + 1".', color: 'bg-green-100 border-green-900' },
    { name: 'Input/Output', shape: 'Parallelogram', use: 'Data Entry & Results.', desc: 'Use this when getting data from a user or displaying results on screen.', color: 'bg-blue-100 border-blue-900' },
    { name: 'Decision', shape: 'Diamond', use: 'Selection (If/Then).', desc: 'A question that has only two paths: YES and NO.', color: 'bg-amber-100 border-amber-900' },
    { name: 'Subroutine', shape: 'Double-Stripe Rect', use: 'Complex Functions.', desc: 'Points to another flowchart or module defined elsewhere.', color: 'bg-purple-100 border-purple-900' },
  ];

  const handleStep = () => {
    switch (traceStep) {
      case 0: // Idle -> Start
        setVars({ N: inputN, Total: 0, Count: 1 });
        setHistory([{ step: 'START', n: '-', total: '-', count: '-' }]);
        setTraceStep(1);
        break;
      case 1: // Start -> Input N
        setHistory(prev => [...prev, { step: `INPUT N = ${inputN}`, n: inputN, total: '-', count: '-' }]);
        setTraceStep(2);
        break;
      case 2: // Input N -> Total = 0
        setHistory(prev => [...prev, { step: 'TOTAL = 0', n: inputN, total: 0, count: '-' }]);
        setTraceStep(3);
        break;
      case 3: // Total = 0 -> Count = 1
        setHistory(prev => [...prev, { step: 'COUNT = 1', n: inputN, total: 0, count: 1 }]);
        setTraceStep(4);
        break;
      case 4: // Decision Entry
        setTraceStep(5);
        break;
      case 5: // Decision Logic
        if (vars.Count <= vars.N) {
          setTraceStep(6);
        } else {
          setTraceStep(8);
        }
        break;
      case 6: // Total update
        const nextTotal = vars.Total + vars.Count;
        setHistory(prev => [...prev, { step: `TOTAL = ${vars.Total} + ${vars.Count}`, n: vars.N, total: nextTotal, count: vars.Count }]);
        setVars({ ...vars, Total: nextTotal });
        setTraceStep(7);
        break;
      case 7: // Count update
        const nextCount = vars.Count + 1;
        setHistory(prev => [...prev, { step: `COUNT = ${vars.Count} + 1`, n: vars.N, total: vars.Total, count: nextCount }]);
        setVars({ ...vars, Count: nextCount });
        setTraceStep(4); // Loop back
        break;
      case 8: // Output
        setHistory(prev => [...prev, { step: `OUTPUT ${vars.Total}`, n: vars.N, total: vars.Total, count: vars.Count }]);
        setTraceStep(9);
        break;
      case 9: // End
        setHistory(prev => [...prev, { step: 'END', n: vars.N, total: vars.Total, count: vars.Count }]);
        setTraceStep(10);
        break;
    }
  };

  const checkPrediction = () => {
    // Formula for sum of first N: (N * (N + 1)) / 2
    const correct = (inputN * (inputN + 1)) / 2;
    setPredictionFeedback(parseInt(userPrediction) === correct);
  };

  const reset = () => {
    setTraceStep(0);
    setVars({ N: inputN, Total: 0, Count: 1 });
    setHistory([]);
    setPredictionFeedback(null);
    setUserPrediction('');
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B1.1.4 Flowchart Design</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Drawing the Map of Computational Logic"</p>
      </div>

      {/* Symbol Dictionary */}
      <section className="space-y-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Layout /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">The Architect's Field Guide</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {symbols.map((s, idx) => (
            <HandwrittenCard key={idx} bgColor={s.color} className="flex flex-col hover:scale-105 transition-all duration-300">
               <h4 className="font-black text-lg handwritten border-b-2 border-slate-900/10 mb-2 pb-1">{s.name}</h4>
               <p className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">{s.shape}</p>
               <div className="p-3 bg-white/40 rounded-xl mb-4 border border-black/5 flex-grow">
                 <p className="text-xs kalam font-bold text-slate-800 italic">"{s.use}"</p>
               </div>
               <p className="text-[9px] font-mono leading-relaxed text-slate-600">{s.desc}</p>
            </HandwrittenCard>
          ))}
        </div>
      </section>

      {/* Logic Patterns */}
      <section className="grid lg:grid-cols-3 gap-8">
        <PatternCard title="Sequence" icon={ArrowDown} color="text-blue-600">
          Instructions execute one after another in a linear path.
        </PatternCard>
        <PatternCard title="Selection" icon={GitBranch} color="text-amber-600">
          The flow branches based on a condition (IF-THEN-ELSE).
        </PatternCard>
        <PatternCard title="Iteration" icon={RotateCcw} color="text-green-600">
          A block of code repeats until a condition is met (LOOPS).
        </PatternCard>
      </section>

      {/* Interactive Logic Tracer Challenge */}
      <section className="space-y-8 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Terminal /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">Mental Model Challenge</h2>
          </div>
          <div className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-black text-xs shadow-lg uppercase tracking-widest animate-pulse">
            Paper 1 Simulation
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <HandwrittenCard title="Algorithm: Sum of First N Numbers" bgColor="bg-white" className="border-4 border-slate-900 min-h-[600px] relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-slate-100 p-4 rounded-2xl border-2 border-slate-900 max-w-[200px] shadow-sm z-50">
                  <h5 className="text-[10px] font-black uppercase mb-2">Predict the Result</h5>
                  <p className="text-[10px] kalam text-slate-500 mb-3">If N = {inputN}, what will be printed?</p>
                  <div className="flex space-x-2">
                    <input 
                      type="number"
                      value={userPrediction}
                      onChange={(e) => setUserPrediction(e.target.value)}
                      className="w-full bg-white border-2 border-slate-900 rounded p-1 text-center font-bold"
                    />
                    <button onClick={checkPrediction} className="bg-slate-900 text-white p-1 rounded"><CheckCircle2 size={16}/></button>
                  </div>
                  {predictionFeedback !== null && (
                    <div className={`mt-2 text-[10px] font-black uppercase text-center ${predictionFeedback ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {predictionFeedback ? 'Correct!' : 'Try Again!'}
                    </div>
                  )}
               </div>

               <div className="flex flex-col items-center py-10 space-y-4">
                  <Shape type="terminal" label="START" active={traceStep >= 1} />
                  <Connector active={traceStep >= 2} />
                  
                  <div className="flex items-center space-x-4">
                    <Shape type="io" label={`INPUT N (${inputN})`} active={traceStep >= 2} />
                    <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      <Settings2 size={12} className="text-indigo-400 mr-2" />
                      <input 
                        type="range" min="1" max="5" value={inputN} 
                        onChange={(e) => { setInputN(parseInt(e.target.value)); reset(); }}
                        disabled={traceStep > 0}
                        className="w-16 accent-indigo-600"
                      />
                    </div>
                  </div>

                  <Connector active={traceStep >= 3} />
                  <Shape type="process" label="TOTAL = 0" active={traceStep >= 3} />
                  <Connector active={traceStep >= 4} />
                  <Shape type="process" label="COUNT = 1" active={traceStep >= 4} />
                  <Connector active={traceStep >= 5} />
                  
                  <div className="relative">
                    <Shape type="decision" label="COUNT <= N?" active={traceStep === 5} />
                    
                    {/* YES PATH */}
                    <div className="flex flex-col items-center mt-4">
                       <span className={`text-[10px] font-black ${vars.Count <= vars.N && traceStep >= 5 ? 'text-emerald-600' : 'text-slate-300'}`}>YES</span>
                       <Connector active={traceStep === 6} />
                       <Shape type="process" label="TOTAL = TOTAL + COUNT" active={traceStep === 6} />
                       <Connector active={traceStep === 7} />
                       <Shape type="process" label="COUNT = COUNT + 1" active={traceStep === 7} />
                    </div>

                    {/* NO PATH */}
                    <div className="absolute top-1/2 left-full flex items-center -translate-y-1/2 ml-10">
                       <span className={`text-[10px] font-black mr-4 ${vars.Count > vars.N && traceStep >= 5 ? 'text-rose-600' : 'text-slate-300'}`}>NO</span>
                       <div className={`h-1 w-12 ${vars.Count > vars.N && traceStep >= 5 ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                       <Shape type="io" label="PRINT TOTAL" active={traceStep === 8} className="scale-90" />
                    </div>
                  </div>

                  <div className="h-10"></div>
                  <Connector active={traceStep >= 9} />
                  <Shape type="terminal" label="END" active={traceStep >= 10} />
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3">
                  <button onClick={reset} className="p-3 bg-white border-2 border-slate-200 rounded-full hover:border-slate-900 transition-all"><RotateCcw size={20}/></button>
                  <button onClick={handleStep} disabled={traceStep >= 10} className="px-10 py-4 bg-slate-900 text-white rounded-full font-black shadow-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center">
                    <Play size={18} className="mr-2"/> {traceStep === 0 ? 'START TRACE' : 'EXECUTE NEXT'}
                  </button>
               </div>
            </HandwrittenCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <HandwrittenCard title="Trace Table Output" bgColor="bg-slate-900" className="text-white h-full min-h-[500px]">
               <div className="overflow-hidden rounded-xl border border-slate-700 bg-black/40">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="bg-slate-800 text-slate-400 uppercase text-[9px] tracking-widest">
                       <tr>
                         <th className="p-4">Instruction</th>
                         <th className="p-4 text-center">N</th>
                         <th className="p-4 text-center">Total</th>
                         <th className="p-4 text-center">Count</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {history.map((h, i) => (
                        <tr key={i} className="animate-in slide-in-from-left-4 duration-300">
                          <td className="p-4 text-indigo-400 font-bold">{h.step}</td>
                          <td className="p-4 text-center">{h.n}</td>
                          <td className="p-4 text-center text-yellow-400 font-black">{h.total}</td>
                          <td className="p-4 text-center text-emerald-400 font-black">{h.count}</td>
                        </tr>
                      ))}
                      {history.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-20 text-center text-slate-600 italic kalam">Run the algorithm to populate the trace table...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
               </div>
               <div className="mt-8 p-4 bg-indigo-950/50 rounded-2xl border border-indigo-900">
                  <h5 className="font-black text-xs text-indigo-300 uppercase mb-2 flex items-center"><Info size={14} className="mr-1"/> Logic Log</h5>
                  <p className="text-[10px] kalam text-slate-400 italic">"Notice how <b>Iteration</b> creates multiple entries in the trace table for the same variables. Every time the logic loops back, we record the new state of the memory registers."</p>
               </div>
            </HandwrittenCard>
          </div>
        </div>
      </section>
    </div>
  );
};

const PatternCard = ({ title, icon: Icon, color, children }: any) => (
  <div className="bg-white p-6 sketch-border shadow-xl group hover:shadow-2xl transition-all flex items-start space-x-4">
    <div className={`p-3 rounded-xl bg-slate-50 ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-black handwritten text-xl mb-1">{title}</h4>
      <p className="text-xs kalam font-bold text-slate-500 leading-relaxed italic">"{children}"</p>
    </div>
  </div>
);

const Shape = ({ type, label, active, className = "" }: any) => {
  const base = `flex items-center justify-center font-black transition-all duration-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${className}`;
  
  if (type === 'terminal') {
    return <div className={`${base} w-32 h-10 rounded-full ${active ? 'bg-slate-900 text-white' : 'bg-white text-slate-300'}`}>{label}</div>;
  }
  
  if (type === 'io') {
    return (
      <div 
        style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
        className={`${base} w-40 h-10 ${active ? 'bg-blue-500 text-white' : 'bg-blue-50 text-slate-300'}`}
      >
        <span className="text-[10px]">{label}</span>
      </div>
    );
  }
  
  if (type === 'process') {
    return <div className={`${base} w-48 h-10 ${active ? 'bg-green-500 text-white' : 'bg-green-50 text-slate-300'}`}><span className="text-[10px]">{label}</span></div>;
  }
  
  if (type === 'decision') {
    return (
      <div className="relative">
        <div className={`${base} w-24 h-24 rotate-45 ${active ? 'bg-amber-400 text-slate-900 shadow-amber-500/50' : 'bg-amber-50 text-slate-300'}`}>
          <span className="text-[10px] -rotate-45 text-center uppercase leading-tight font-black">{label}</span>
        </div>
      </div>
    );
  }

  return null;
};

const Connector = ({ active }: { active: boolean }) => (
  <div className="flex flex-col items-center">
    <div className={`w-0.5 h-6 transition-colors duration-500 ${active ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
    <div className={`w-2 h-2 border-b-2 border-r-2 rotate-45 -mt-1 transition-colors duration-500 ${active ? 'border-indigo-600' : 'border-slate-100'}`}></div>
  </div>
);

export default B1FlowchartsSection;