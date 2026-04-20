import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Repeat, ShieldAlert, Layers, ArrowDown, 
  Info, Box, Trash2, ArrowUp, Zap, MousePointer2,
  Binary, Calculator, HelpCircle
} from 'lucide-react';

const B2RecursionSection: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState(0);

  const frames = [
    { label: 'factorial(3)', calc: '3 * factorial(2)', status: 'Waiting...' },
    { label: 'factorial(2)', calc: '2 * factorial(1)', status: 'Waiting...' },
    { label: 'factorial(1)', calc: '1 (Base Case reached!)', status: 'Resolving!' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <div className="mb-4 inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-full font-black text-sm shadow-xl animate-pulse uppercase tracking-[0.2em]">
           <ShieldAlert size={16} /> <span>Higher Level Only (B2.4.4)</span>
        </div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">Recursion Masterclass</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Functions calling themselves into the infinite abyss"</p>
      </div>

      {/* Theory Section */}
      <div className="grid lg:grid-cols-2 gap-10">
        <HandwrittenCard title="The Core Concept" bgColor="bg-white" className="border-4 border-purple-900 shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]">
           <p className="kalam text-lg font-bold text-slate-800 leading-relaxed mb-6">
             "Recursion is solving a problem by solving a <b>smaller instance</b> of the same problem. Think of it as a set of Russian Nesting Dolls."
           </p>
           <div className="space-y-4">
              <div className="p-5 bg-purple-50 rounded-2xl border-l-4 border-purple-600 group hover:bg-white transition-all">
                 <h5 className="font-black text-xs uppercase text-purple-900 mb-1 flex items-center">
                    <ShieldAlert size={14} className="mr-2"/> 1. The Base Case
                 </h5>
                 <p className="text-[11px] kalam italic text-slate-600">The "Exit Strategy". A simple condition where the function <b>stops</b> calling itself and returns a concrete value.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-2xl border-l-4 border-purple-600 group hover:bg-white transition-all">
                 <h5 className="font-black text-xs uppercase text-purple-900 mb-1 flex items-center">
                    <Repeat size={14} className="mr-2"/> 2. The Recursive Step
                 </h5>
                 <p className="text-[11px] kalam italic text-slate-600">Calling the function again with a <b>modified input</b> that moves closer to the base case (e.g. n - 1).</p>
              </div>
           </div>
        </HandwrittenCard>

        <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl text-white relative">
           <div className="absolute top-2 right-8 text-[8px] font-mono text-purple-400 tracking-widest">PYTHON.PY</div>
           <h4 className="text-xl font-black handwritten text-yellow-400 mb-4 flex items-center"><Calculator className="mr-2" size={18}/> Classical: Factorial</h4>
           <pre className="font-mono text-sm text-purple-300 leading-relaxed">
{`def factorial(n):
    # 1. Base Case
    if n == 1:
        return 1
    
    # 2. Recursive Step
    else:
        return n * factorial(n - 1)

result = factorial(3) # -> 6`}
           </pre>
           <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-[10px] kalam text-slate-400 italic">"Imagine trying to find 3!. To find it, you need 2!. To find 2!, you need 1!. 1! is just 1. Now work your way back up!"</p>
           </div>
        </div>
      </div>

      {/* Visual Recursion Stack */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Layers /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.4.5 Visualizing the Call Stack</h2>
        </div>

        <HandwrittenCard bgColor="bg-slate-50" className="border-4 border-purple-200">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                 <p className="kalam text-lg font-bold text-slate-700 italic">"Python keeps a 'Stack' of frames in memory. Every recursive call pushes a new frame onto the stack. They only disappear once the Base Case is hit!"</p>
                 <div className="bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-inner">
                    <h5 className="font-black text-xs text-indigo-900 uppercase mb-3">Stack Anatomy</h5>
                    <ul className="space-y-3">
                       <StackRule icon={ArrowDown} text="Push: Adding a call" color="text-indigo-500" />
                       <StackRule icon={ArrowUp} text="Pop: Resolving & Returning" color="text-emerald-500" />
                       <StackRule icon={ShieldAlert} text="Overflow: Out of Memory!" color="text-rose-500" />
                    </ul>
                 </div>
              </div>

              <div className="w-full max-w-md flex flex-col items-center space-y-3">
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Hover to inspect frames</div>
                 {frames.map((f, i) => (
                   <div 
                     key={i}
                     onMouseEnter={() => setActiveFrame(i)}
                     className={`w-full p-4 border-4 rounded-2xl transition-all duration-300 cursor-pointer ${activeFrame === i ? 'bg-purple-600 text-white border-purple-900 scale-105 shadow-2xl' : 'bg-white text-slate-300 border-slate-100 opacity-60'}`}
                   >
                     <div className="flex justify-between items-center mb-1">
                       <span className="font-mono font-black text-[12px]">{f.label}</span>
                       <span className={`text-[8px] uppercase font-black tracking-widest ${activeFrame === i ? 'text-yellow-300' : 'text-slate-300'}`}>{f.status}</span>
                     </div>
                     <p className={`text-[10px] font-black ${activeFrame === i ? 'text-purple-200' : 'text-slate-100'}`}>Calc: {f.calc}</p>
                   </div>
                 ))}
                 <div className="mt-4 flex items-center space-x-2 text-rose-500">
                    <Info size={14} />
                    <span className="text-[10px] font-black uppercase tracking-tight">Infinite recursion causes RecursionError!</span>
                 </div>
              </div>
           </div>
        </HandwrittenCard>
      </section>

      {/* Advanced Example: Fibonacci */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-900 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Binary /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">Fibonacci: Branching Recursion</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
           <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl text-white">
              <h4 className="text-xl font-black handwritten text-indigo-400 mb-4">Tree Recursion</h4>
              <pre className="font-mono text-sm text-indigo-200 leading-relaxed">
{`def fib(n):
    if n <= 1:
        return n
    else:
        # Branching! One call becomes TWO.
        return fib(n-1) + fib(n-2)

print(fib(5)) # Output: 5`}
              </pre>
           </div>
           <HandwrittenCard title="The 'Tree' Visualization" bgColor="bg-white" className="border-4 border-indigo-900">
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                 <div className="p-2 border-2 border-slate-900 rounded bg-indigo-50 font-black text-xs">fib(3)</div>
                 <div className="flex space-x-12 relative">
                    <div className="absolute top-[-10px] left-1/2 w-0.5 h-4 bg-slate-300"></div>
                    <div className="flex flex-col items-center space-y-4">
                       <div className="p-2 border-2 border-slate-900 rounded bg-indigo-50 font-black text-[10px]">fib(2)</div>
                       <div className="flex space-x-4">
                          <div className="p-1 border border-slate-400 rounded text-[8px] text-slate-400">fib(1)</div>
                          <div className="p-1 border border-slate-400 rounded text-[8px] text-slate-400">fib(0)</div>
                       </div>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="p-2 border-2 border-slate-900 rounded bg-indigo-50 font-black text-[10px]">fib(1)</div>
                    </div>
                 </div>
                 <p className="text-[10px] kalam text-slate-400 italic text-center mt-4">"Branching recursion grows EXPONENTIALLY. fib(50) might take years to calculate on your laptop!"</p>
              </div>
           </HandwrittenCard>
        </div>
      </section>
      
      {/* Exam Strategy Section */}
      <div className="bg-yellow-100 p-10 rounded-[3rem] sketch-border border-2 border-yellow-300 shadow-xl relative overflow-hidden">
         <div className="absolute top-[-20px] left-[-20px] opacity-10 rotate-12"><HelpCircle size={150}/></div>
         <div className="relative z-10">
            <h4 className="text-3xl font-black handwritten text-yellow-900 mb-6 flex items-center">
               <Zap className="mr-3 text-yellow-600 animate-pulse" size={28}/> Exam Showdown: Iteration vs Recursion
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4 bg-white/40 p-6 rounded-3xl border border-yellow-200">
                  <h5 className="font-black text-xs uppercase text-indigo-600">Why choose RECURSION?</h5>
                  <ul className="text-sm kalam font-bold text-slate-700 italic space-y-2">
                     <li>• Cleaner, more "Elegant" code for complex trees.</li>
                     <li>• Natural fit for recursive data types (like Trees/Graphs).</li>
                     <li>• Follows the "Divide and Conquer" logic perfectly.</li>
                  </ul>
               </div>
               <div className="space-y-4 bg-white/40 p-6 rounded-3xl border border-yellow-200">
                  <h5 className="font-black text-xs uppercase text-rose-600">Why choose ITERATION (Loops)?</h5>
                  <ul className="text-sm kalam font-bold text-slate-700 italic space-y-2">
                     <li>• <b>Memory Efficient:</b> No new stack frames created.</li>
                     <li>• <b>Safer:</b> No risk of Stack Overflow crashes.</li>
                     <li>• <b>Performance:</b> Faster for simple, sequential tasks.</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StackRule = ({ icon: Icon, text, color }: any) => (
  <li className="flex items-center space-x-3 group">
     <div className={`${color} p-1 bg-slate-50 rounded transition-transform group-hover:scale-125`}>
        <Icon size={16} />
     </div>
     <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{text}</span>
  </li>
);

export default B2RecursionSection;