
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  List, Layers, ArrowUp, ArrowDown, ArrowRight, Info, 
  Table as TableIcon, Zap, Repeat, MousePointer2, GitBranch,
  Scissors, Plus, Trash2, Hash, Grid3X3, Terminal,
  Maximize2, Move, LayoutGrid, Search, Calculator,
  Armchair, Gamepad2, Smartphone
} from 'lucide-react';

const B2StructuresSection: React.FC = () => {
  const [hoverCell, setHoverCell] = useState<[number, number] | null>(null);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B2.2 Data Structures</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Lists, Matrices, and Abstract Memory Management"</p>
      </div>

      {/* B2.2.2: 1D Dynamic Lists Recap */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><List /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.2.2 1D Dynamic Lists</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <HandwrittenCard title="Visual Memory" bgColor="bg-white" className="border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]">
             <p className="kalam text-sm mb-6 text-slate-500 font-bold italic">"Lists are ordered, changeable, and allow duplicate values. In memory, they are like a row of lockers."</p>
             <div className="flex items-center space-x-2 mb-10 overflow-x-auto py-2">
                {['A', 'B', 'C', 'D'].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 mb-1 font-black">{idx}</span>
                    <div className="w-16 h-16 border-2 border-slate-900 bg-white shadow-md flex items-center justify-center font-black text-xl text-emerald-600 rotate-1">{item}</div>
                    <span className="text-[8px] font-mono text-slate-300 mt-1">Locker #{idx}</span>
                  </div>
                ))}
                <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded flex items-center justify-center opacity-40">
                  <Plus className="text-slate-400" />
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
               <MethodMini name=".append(x)" desc="Add to the END" color="emerald" />
               <MethodMini name=".insert(i, x)" desc="Add at Index i" color="emerald" />
               <MethodMini name=".pop(i)" desc="Remove at Index i" color="emerald" />
               <MethodMini name=".remove(x)" desc="Remove first Value x" color="emerald" />
               <MethodMini name=".sort()" desc="Order the list" color="emerald" />
               <MethodMini name="len(L)" desc="Get size of list" color="emerald" />
             </div>
          </HandwrittenCard>

          <div className="space-y-6">
             <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal size={80} className="text-white"/></div>
                <h4 className="text-xl font-black handwritten text-yellow-400 mb-4">Python Code Snapshot</h4>
                <pre className="font-mono text-xs text-emerald-400 leading-relaxed">
{`players = ["Alice", "Bob"]

# Growing the list
players.append("Charlie") # ["Alice", "Bob", "Charlie"]

# Inserting at start
players.insert(0, "Zoe")  # ["Zoe", "Alice", "Bob", "Charlie"]

# Slicing the list
winners = players[0:2]    # ["Zoe", "Alice"]`}
                </pre>
                <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/10">
                   <p className="text-[10px] kalam text-slate-400 italic">"Lists are DYNAMIC because they resize themselves as you add/remove data."</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* B2.2.2: 2D Arrays DEEP DIVE */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><LayoutGrid /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">2D Arrays: The Grid Masterclass</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Conceptual Visualization */}
          <div className="lg:col-span-7 space-y-6">
            <HandwrittenCard title="Addressing the Matrix" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Row-Major Order</div>
              <p className="kalam text-lg font-bold text-slate-700 mb-8 leading-tight">
                "Think of a 2D array as a <b>List of Lists</b>. To find an item, you need two coordinates: <span className="text-indigo-600 underline">Row</span> first, then <span className="text-pink-600 underline">Column</span>."
              </p>

              <div className="flex justify-center py-10 relative">
                {/* Horizontal Axis (Columns) */}
                <div className="absolute top-0 left-[20%] right-0 flex justify-around">
                   {[0, 1, 2, 3].map(c => (
                     <div key={c} className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-pink-500 font-mono">Col {c}</span>
                        <ArrowDown size={12} className="text-pink-300 mt-1" />
                     </div>
                   ))}
                </div>

                {/* Vertical Axis (Rows) */}
                <div className="absolute left-0 top-[20%] bottom-0 flex flex-col justify-around">
                   {[0, 1, 2].map(r => (
                     <div key={r} className="flex items-center space-x-2">
                        <span className="text-[10px] font-black text-indigo-500 font-mono">Row {r}</span>
                        <ArrowRight size={12} className="text-indigo-300" />
                     </div>
                   ))}
                </div>

                {/* The Matrix Grid */}
                <div className="grid grid-cols-4 gap-3 bg-slate-50 p-6 border-4 border-slate-900 rounded-3xl shadow-inner ml-12 mt-8">
                  {[0, 1, 2].map(r => (
                    [0, 1, 2, 3].map(c => (
                      <div 
                        key={`${r}-${c}`}
                        onMouseEnter={() => setHoverCell([r, c])}
                        onMouseLeave={() => setHoverCell(null)}
                        className={`w-20 h-20 bg-white border-2 border-slate-200 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group hover:border-indigo-500 hover:shadow-xl ${hoverCell?.[0] === r && hoverCell?.[1] === c ? 'scale-110 ring-4 ring-indigo-200' : ''}`}
                      >
                        <span className="text-[8px] font-mono text-slate-400 group-hover:text-indigo-400">grid[{r}][{c}]</span>
                        <div className="text-2xl font-black text-slate-800">{(r * 4) + c + 1}</div>
                      </div>
                    ))
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[2.5rem]">
                 <h5 className="font-black text-xs text-indigo-900 uppercase mb-3 flex items-center"><Calculator size={14} className="mr-2"/> The Len() Trap</h5>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-xl border border-indigo-100 text-center">
                       <code className="text-indigo-600 font-black">len(grid)</code>
                       <p className="text-[9px] kalam font-bold text-slate-500 mt-1 uppercase">Total Number of ROWS (3)</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-indigo-100 text-center">
                       <code className="text-pink-600 font-black">len(grid[0])</code>
                       <p className="text-[9px] kalam font-bold text-slate-500 mt-1 uppercase">Total Number of COLS (4)</p>
                    </div>
                 </div>
              </div>
            </HandwrittenCard>
          </div>

          {/* Iteration Logic */}
          <div className="lg:col-span-5 space-y-6">
             <div className="p-8 bg-slate-900 text-white rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Repeat size={120}/></div>
                <h4 className="text-2xl font-black handwritten text-yellow-400 mb-6 flex items-center">Nested Loop Pattern</h4>
                <p className="text-xs kalam italic text-slate-400 mb-6 leading-relaxed">"To process a 2D array, we use a loop inside a loop. The <b>Outer Loop</b> stays on one row while the <b>Inner Loop</b> visits every chair in that row."</p>
                
                <div className="bg-black/40 p-6 rounded-2xl font-mono text-xs border border-white/5 space-y-4">
                   <div className="text-indigo-400">
                     for r in range(len(grid)): <span className="text-slate-600 ml-4"># Outer: Rows</span>
                   </div>
                   <div className="text-pink-400 ml-6">
                     for c in range(len(grid[r])): <span className="text-slate-600 ml-4"># Inner: Columns</span>
                   </div>
                   <div className="text-emerald-400 ml-12">
                     print(grid[r][c]) <span className="text-slate-600 ml-4"># Action!</span>
                   </div>
                </div>

                <div className="mt-8 space-y-3">
                   <div className="flex items-center space-x-3 text-indigo-300">
                      <Zap size={14}/>
                      <span className="text-[10px] font-black uppercase">Example: Summing all numbers</span>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl text-[10px] font-mono text-slate-300">
                      total = 0<br/>
                      for r in grid:<br/>
                      &nbsp;&nbsp;for item in r:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;total += item
                   </div>
                </div>
             </div>

             <HandwrittenCard title="Real World Mapping" bgColor="bg-yellow-50" className="border-yellow-200">
                <div className="space-y-4">
                   <UseCase 
                    icon={Armchair} 
                    title="Cinema Seating" 
                    desc="Rows (A-Z) and Seats (1-20). Array stores strings like 'Reserved' or 'Empty'." 
                   />
                   <UseCase 
                    icon={Gamepad2} 
                    title="Tic-Tac-Toe / Chess" 
                    desc="A 3x3 or 8x8 grid where each cell holds 'X', 'O', or a Piece ID." 
                   />
                   <UseCase 
                    icon={Smartphone} 
                    title="Digital Images" 
                    desc="A massive 2D array of PIXELS where each cell stores an RGB color code." 
                   />
                </div>
             </HandwrittenCard>
          </div>
        </div>
      </section>

      {/* B2.2.3 & B2.2.4: Abstract Data Types (ADTs) */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Layers /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.2.3 - 4 Stacks & Queues (ADTs)</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Stack */}
          <div className="space-y-6">
             <div className="p-8 bg-white sketch-border border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-2xl font-black handwritten text-indigo-700">The Stack (LIFO)</h4>
                   <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-2 py-0.5 rounded">"Last In, First Out"</span>
                </div>
                <div className="flex flex-col items-center space-y-1 mb-8">
                   <div className="w-40 h-10 bg-indigo-600 text-white flex items-center justify-center font-black rounded-lg border-2 border-slate-900 shadow-md relative group">
                      <ArrowDown className="absolute -top-6 text-indigo-400 animate-bounce" size={18}/>
                      PUSH("C")
                   </div>
                   <div className="w-40 h-10 bg-indigo-500 text-white flex items-center justify-center font-black rounded-lg border-2 border-slate-900 shadow-sm">ITEM B</div>
                   <div className="w-40 h-10 bg-indigo-400 text-white flex items-center justify-center font-black rounded-lg border-2 border-slate-900 opacity-50">ITEM A</div>
                </div>
                <div className="space-y-2">
                   <MethodLine name="push(item)" desc="Add item to top" />
                   <MethodLine name="pop()" desc="Remove from top" />
                   <MethodLine name="peek()" desc="Look at top without removing" />
                </div>
                <div className="mt-6 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                   <p className="text-[10px] kalam font-bold text-slate-500">Real World: Back Button, Undo, Plate Stacks.</p>
                </div>
             </div>
          </div>

          {/* Queue */}
          <div className="space-y-6">
             <div className="p-8 bg-white sketch-border border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-2xl font-black handwritten text-emerald-700">The Queue (FIFO)</h4>
                   <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded">"First In, First Out"</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-10 py-2">
                   <div className="shrink-0 w-24 h-20 bg-emerald-600 text-white flex flex-col items-center justify-center font-black rounded-xl border-2 border-slate-900 shadow-lg relative">
                      <span className="text-[8px] absolute -top-4 text-emerald-600 font-black flex items-center">DEQUEUE <ArrowUp size={8}/></span>
                      USER 1
                   </div>
                   <ArrowRight className="text-slate-300" />
                   <div className="shrink-0 w-20 h-20 bg-emerald-500 text-white flex items-center justify-center font-black rounded-xl border-2 border-slate-900">USER 2</div>
                   <ArrowRight className="text-slate-300" />
                   <div className="shrink-0 w-20 h-20 bg-emerald-400 text-white flex items-center justify-center font-black rounded-xl border-2 border-slate-900 opacity-50 relative">
                      <span className="text-[8px] absolute -top-4 text-slate-400 flex items-center">ENQUEUE <ArrowDown size={8}/></span>
                      USER 3
                   </div>
                </div>
                <div className="space-y-2">
                   <MethodLine name="enqueue(item)" desc="Add item to back" />
                   <MethodLine name="dequeue()" desc="Remove from front" />
                   <MethodLine name="isEmpty()" desc="Check if queue is empty" />
                </div>
                <div className="mt-6 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                   <p className="text-[10px] kalam font-bold text-slate-500">Real World: Printers, Waitlines, Packet Buffers.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Comparison: Static vs Dynamic */}
      <HandwrittenCard title="Static vs Dynamic Memory (EXAM FOCUS)" bgColor="bg-slate-900" className="text-white border-4 border-slate-700">
        <div className="grid md:grid-cols-2 gap-12 p-4">
           <div className="space-y-4">
              <h5 className="font-black text-xs text-yellow-400 uppercase tracking-widest flex items-center"><Hash className="mr-2" size={14}/> Static Data Structures</h5>
              <ul className="space-y-2 text-[11px] kalam text-slate-400 leading-relaxed italic">
                <li>• Size is fixed at compile time (Cannot grow).</li>
                <li>• <b>Benefit:</b> Extremely fast access & predictable memory.</li>
                <li>• <b>Limit:</b> Wasteful if data is small; crashes if too large.</li>
              </ul>
           </div>
           <div className="space-y-4">
              <h5 className="font-black text-xs text-emerald-400 uppercase tracking-widest flex items-center"><Repeat className="mr-2" size={14}/> Dynamic Data Structures</h5>
              <ul className="space-y-2 text-[11px] kalam text-slate-400 leading-relaxed italic">
                <li>• Size changes as the program runs (Shrink/Grow).</li>
                <li>• <b>Benefit:</b> Efficient memory usage—only takes what it needs.</li>
                <li>• <b>Limit:</b> Overhead for managing pointers & memory blocks.</li>
              </ul>
           </div>
        </div>
      </HandwrittenCard>
    </div>
  );
};

const MethodMini = ({ name, desc, color }: any) => (
  <div className={`flex flex-col border-l-2 border-${color}-200 pl-3 py-1 group hover:border-${color}-600 transition-colors`}>
    <code className={`text-[10px] font-mono font-black text-${color}-700 group-hover:text-${color}-900`}>{name}</code>
    <span className="text-[8px] kalam font-bold text-slate-400 uppercase">{desc}</span>
  </div>
);

const MethodLine = ({ name, desc }: any) => (
  <div className="flex justify-between items-center border-b border-slate-100 py-1">
    <code className="text-[10px] font-mono font-black text-indigo-600">{name}</code>
    <span className="text-[9px] kalam font-bold text-slate-400 italic">{desc}</span>
  </div>
);

const UseCase = ({ icon: Icon, title, desc }: any) => (
  <div className="flex items-start space-x-3 p-3 bg-white/40 rounded-xl border border-yellow-200 hover:bg-white transition-all group">
    <div className="p-2 bg-yellow-400 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
      <Icon size={16} className="text-yellow-900" />
    </div>
    <div>
      <h6 className="text-[10px] font-black uppercase text-yellow-900">{title}</h6>
      <p className="text-[9px] kalam text-slate-600 leading-tight italic font-bold">{desc}</p>
    </div>
  </div>
);

export default B2StructuresSection;
