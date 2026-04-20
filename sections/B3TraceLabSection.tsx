
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  RefreshCw, CheckCircle2, AlertCircle, 
  Info, Code, MousePointer2, Trash2, ArrowRight, Star,
  ArrowUp, ArrowDown
} from 'lucide-react';

// Helper component for cells - Updated for dark mode readability
const TraceInput = ({ id, values, onChange }: any) => (
  <input 
    type="text"
    value={values[id] || ''}
    onChange={(e) => onChange({...values, [id]: e.target.value})}
    placeholder="..."
    className="w-full h-10 border-2 border-transparent bg-slate-800 focus:border-indigo-500 rounded p-1 text-center font-bold text-white outline-none transition-all placeholder:text-slate-600"
  />
);

const B3TraceLabSection: React.FC = () => {
  const [activeEx, setActiveEx] = useState(1);
  const [userCells1, setUserCells1] = useState<Record<string, string>>({});
  const [userCells2, setUserCells2] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');

  const correct1: Record<string, string> = {
    "1-1": "5", "2-1": "6", "3-1": "9", "4-2": "Count: 9", "5-1": "0", "6-1": "2", "7-2": "Count: 2"
  };

  const correct2: Record<string, string> = {
    "1-1": "3", "1-2": "4", "2-3": "5", "2-4": "2", "3-5": "12", "4-1": "6", "5-5": "24", "6-5": "10"
  };

  const checkTrace = () => {
    const target = activeEx === 1 ? correct1 : correct2;
    const current = activeEx === 1 ? userCells1 : userCells2;
    
    const isCorrect = Object.keys(target).every(key => 
      current[key]?.trim().toLowerCase() === target[key].toLowerCase()
    );
    
    setFeedback(isCorrect ? 'success' : 'error');
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Object Trace Lab</h1>
        <p className="text-xl kalam text-slate-600 italic">"Step-by-Step Logic Tracking"</p>
        
        <div className="flex justify-center mt-10 space-x-4">
           <button onClick={() => {setActiveEx(1); setFeedback('idle')}} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeEx === 1 ? 'bg-indigo-600 text-white border-indigo-900 shadow-xl scale-105' : 'bg-white text-slate-500 border-slate-200'}`}>EX 1: STATE MANAGER</button>
           <button onClick={() => {setActiveEx(2); setFeedback('idle')}} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeEx === 2 ? 'bg-indigo-600 text-white border-indigo-900 shadow-xl scale-105' : 'bg-white text-slate-500 border-slate-200'}`}>EX 2: THE BOX GRID</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Code Box */}
        <div className="lg:col-span-5 space-y-6">
           <HandwrittenCard title="Python Execution" bgColor="bg-slate-950" className="text-white border-slate-800 border-4 shadow-2xl h-full min-h-[500px]">
              <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-3">
                 <Code size={18} className="text-indigo-400"/>
                 <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Trace_Subject.py</span>
              </div>
              <pre className="text-xs font-mono leading-7 overflow-x-auto whitespace-pre text-emerald-400">
{activeEx === 1 ? 
`class Counter:
    def __init__(self, start):
        self.count = start
    def inc(self, n=1):
        self.count += n
    def reset(self):
        self.count = 0
    def disp(self):
        print(f"Count: {self.count}")

c1 = Counter(5)    # Step 1
c1.inc()           # Step 2
c1.inc(3)          # Step 3
c1.disp()          # Step 4
c1.reset()         # Step 5
c1.inc(2)          # Step 6
c1.disp()          # Step 7` 
: 
`class Box:
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h
    def dbl(self):
        self.w *= 2

a = Box(3, 4)      # Step 1
b = Box(5, 2)      # Step 2
print(a.area())    # Step 3
a.dbl()            # Step 4
print(a.area())    # Step 5
print(b.area())    # Step 6`}
              </pre>
           </HandwrittenCard>

           <div className="p-6 bg-indigo-900 text-white rounded-3xl border-2 border-indigo-700 sketch-border shadow-lg">
              <h4 className="font-black text-xs text-yellow-400 uppercase mb-2 flex items-center tracking-tighter">
                <Info size={14} className="mr-1 text-yellow-400"/> Tracing Rule #1
              </h4>
              <p className="text-[11px] kalam font-bold text-indigo-100 leading-relaxed italic">
                "Methods only affect the attributes of the <b>specific object</b> instance they are called on. If you double box 'A', box 'B' stays the same size!"
              </p>
           </div>
        </div>

        {/* Right: Interactive Table - Updated to Dark Theme for white text visibility */}
        <div className="lg:col-span-7">
           <HandwrittenCard title="Memory Registry Table" bgColor="bg-slate-900" className="text-white border-4 border-slate-950 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden p-0">
              <div className="overflow-x-auto">
                 <table className="w-full text-xs font-mono border-collapse">
                    <thead className="bg-slate-950 text-white uppercase text-[9px] tracking-widest border-b border-slate-800">
                       {activeEx === 1 ? (
                         <tr>
                           <th className="p-5 border-r border-slate-800 w-20 text-center">Step</th>
                           <th className="p-5 border-r border-slate-800">Attribute: c1.count</th>
                           <th className="p-5">Console Output</th>
                         </tr>
                       ) : (
                         <tr>
                           <th className="p-5 border-r border-slate-800 w-16 text-center">Step</th>
                           <th className="p-5 border-r border-slate-800">a.w</th>
                           <th className="p-5 border-r border-slate-800">a.h</th>
                           <th className="p-5 border-r border-slate-800">b.w</th>
                           <th className="p-5 border-r border-slate-800">b.h</th>
                           <th className="p-5">Console Output</th>
                         </tr>
                       )}
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900">
                       {activeEx === 1 ? [1,2,3,4,5,6,7].map(i => (
                         <tr key={i} className="hover:bg-slate-800 transition-colors">
                           <td className="p-4 bg-slate-950 border-r border-slate-800 font-black text-center text-slate-400">{i}</td>
                           <td className="p-1 border-r border-slate-800">
                             {![4,7].includes(i) ? <TraceInput id={`${i}-1`} values={userCells1} onChange={setUserCells1} /> : <div className="text-center font-bold text-slate-600 italic">Static</div>}
                           </td>
                           <td className="p-1">
                             {[4,7].includes(i) ? <TraceInput id={`${i}-2`} values={userCells1} onChange={setUserCells1} /> : <div className="text-center text-slate-700">---</div>}
                           </td>
                         </tr>
                       )) : [1,2,3,4,5,6].map(i => (
                        <tr key={i} className="hover:bg-slate-800 transition-colors">
                          <td className="p-4 bg-slate-950 border-r border-slate-800 font-black text-center text-slate-400">{i}</td>
                          <td className="p-1 border-r border-slate-800"><TraceInput id={`${i}-1`} values={userCells2} onChange={setUserCells2} /></td>
                          <td className="p-1 border-r border-slate-800"><TraceInput id={`${i}-2`} values={userCells2} onChange={setUserCells2} /></td>
                          <td className="p-1 border-r border-slate-800"><TraceInput id={`${i}-3`} values={userCells2} onChange={setUserCells2} /></td>
                          <td className="p-1 border-r border-slate-800"><TraceInput id={`${i}-4`} values={userCells2} onChange={setUserCells2} /></td>
                          <td className="p-1"><TraceInput id={`${i}-5`} values={userCells2} onChange={setUserCells2} /></td>
                        </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="p-8 flex items-center justify-between bg-slate-950 border-t-2 border-slate-800">
                 <button 
                   onClick={() => {setUserCells1({}); setUserCells2({}); setFeedback('idle')}} 
                   className="p-4 bg-slate-800 border-2 border-slate-700 rounded-full hover:rotate-180 transition-all duration-500 shadow-lg group"
                   title="Reset Lab"
                 >
                    <RefreshCw size={20} className="text-white group-hover:text-indigo-400"/>
                 </button>
                 <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 px-4 py-2 border-2 border-slate-700 rounded-2xl flex items-center">
                       <MousePointer2 size={16} className="mr-2 text-indigo-400 animate-bounce"/>
                       <span className="text-[10px] font-black uppercase text-slate-400">Trace carefully...</span>
                    </div>
                    <button 
                      onClick={checkTrace} 
                      className="px-12 py-4 bg-indigo-600 text-white rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:bg-indigo-500 active:scale-95 transition-all uppercase tracking-widest text-xs border-2 border-indigo-700"
                    >
                      MARK SUBMISSION
                    </button>
                 </div>
              </div>

              {feedback !== 'idle' && (
                <div className={`p-8 animate-in slide-in-from-top-4 border-t-4 shadow-inner ${feedback === 'success' ? 'bg-emerald-950 text-emerald-100 border-emerald-500' : 'bg-rose-950 text-rose-100 border-rose-500'}`}>
                   <div className="flex items-center space-x-6">
                      <div className={`p-3 rounded-full ${feedback === 'success' ? 'bg-emerald-900' : 'bg-rose-900'}`}>
                         {feedback === 'success' ? <CheckCircle2 size={32} className="text-emerald-400"/> : <AlertCircle size={32} className="text-rose-400"/>}
                      </div>
                      <div>
                        <h4 className="font-black text-2xl handwritten mb-1 uppercase">{feedback === 'success' ? 'Architect Approved!' : 'Logic Failure'}</h4>
                        <p className="text-sm kalam font-bold opacity-80 leading-relaxed">
                          {feedback === 'success' ? 
                            'You have successfully tracked the dynamic state of complex objects. This is a core Paper 2 skill!' : 
                            'The memory registers do not match. Re-trace your method calls. Did you update the correct object attributes?'}
                        </p>
                      </div>
                   </div>
                </div>
              )}
           </HandwrittenCard>

           <div className="mt-8 flex justify-center space-x-6">
              <div className="flex flex-col items-center">
                 <div className="w-10 h-1 bg-indigo-500 rounded-full mb-2 shadow-sm" />
                 <span className="text-[8px] font-black uppercase text-slate-400">Object A Scope</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-10 h-1 bg-pink-500 rounded-full mb-2 shadow-sm" />
                 <span className="text-[8px] font-black uppercase text-slate-400">Object B Scope</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default B3TraceLabSection;
