
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Binary, ShieldAlert, GitBranch, ArrowRight, Info, 
  Layers, Database, Zap, Share2, Calculator, Search,
  Box, MousePointer2, Workflow, Activity, Trash2,
  Lock, Unlock, HelpCircle, CheckCircle2, Sparkles,
  RefreshCw, List, Network, Triangle, Globe, Eye,
  Tv, Cpu, PenTool, Lightbulb, GraduationCap, ArrowLeftRight,
  Plus, Minus, Scissors, MoveRight, Layers3, ArrowDown,
  Hash, Link, Code, ZapOff, Scale, Star
} from 'lucide-react';

const B4ADTSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fundamentals');

  const tabs = [
    { id: 'fundamentals', label: 'B4.1.1 Fundamentals', icon: Binary },
    { id: 'linked-lists', label: 'B4.1.2-3 Linked Lists', icon: List },
    { id: 'bst', label: 'B4.1.4 BSTs', icon: Network },
    { id: 'sets-hashing', label: 'B4.1.5-6 Sets & Hashing', icon: Database },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <div className="mb-4 inline-flex items-center space-x-2 bg-purple-900 text-white px-6 py-2 rounded-full font-black text-sm shadow-xl animate-pulse uppercase tracking-[0.2em]">
           <ShieldAlert size={16} /> <span>HL Mastery Core (B4)</span>
        </div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight text-balance">Abstract Data Architect</h1>
        <p className="text-2xl font-bold text-slate-600 italic max-w-2xl mx-auto">"Evaluating and constructing complex information hierarchies."</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-3 bg-white/80 backdrop-blur-md p-2 rounded-3xl sketch-border border-slate-200 sticky top-4 z-50 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-xs transition-all ${activeTab === tab.id ? 'bg-purple-800 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-white hover:text-purple-700'}`}
          >
            <tab.icon size={16} />
            <span className="handwritten text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-right-4 duration-500" key={activeTab}>
        {activeTab === 'fundamentals' && <FundamentalsModule />}
        {activeTab === 'linked-lists' && <LinkedListsModule />}
        {activeTab === 'bst' && <BSTModule />}
        {activeTab === 'sets-hashing' && <SetsHashingModule />}
      </div>
    </div>
  );
};

const FundamentalsModule = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-purple-900 text-white rounded-2xl shadow-xl"><Binary /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B4.1.1 Properties & Purpose of ADTs</h2>
    </div>

    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <HandwrittenCard title="Logical vs Physical Reality" bgColor="bg-white" className="border-4 border-purple-900 shadow-xl overflow-hidden">
           <div className="absolute top-2 right-4 opacity-5 rotate-12"><Cpu size={120} /></div>
           <p className="text-lg font-bold text-slate-700 leading-relaxed mb-6 font-medium">
             "An ADT is the <b>logical contract</b>. It describes <u>what</u> data we have and <u>what</u> we can do with it, completely ignoring <u>how</u> it actually fits in memory."
           </p>
           
           <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
                 <h5 className="font-black text-xs text-indigo-900 uppercase mb-2 flex items-center"><Eye size={14} className="mr-1"/> Logical Layer</h5>
                 <p className="text-[11px] font-bold text-slate-600 leading-tight">Focuses on user needs. Operations like <code>enqueue()</code> or <code>peek()</code>. The developer's mental model.</p>
              </div>
              <div className="p-5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
                 <h5 className="font-black text-xs text-emerald-900 uppercase mb-2 flex items-center"><Database size={14} className="mr-1"/> Physical Layer</h5>
                 <p className="text-[11px] font-bold text-slate-600 leading-tight">Focuses on machine needs. Pointers, memory addresses, and actual storage in Arrays or Nodes.</p>
              </div>
           </div>

           <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
              <h6 className="text-yellow-400 font-black text-xs uppercase mb-4 tracking-widest">The Complexity Hiding Metaphor</h6>
              <div className="flex items-center space-x-6">
                 <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-white/10 rounded-xl"><Tv className="text-yellow-400" /></div>
                    <span className="text-[8px] font-black uppercase text-slate-500">The TV Remote</span>
                 </div>
                 <ArrowRight className="text-slate-700" />
                 <p className="text-[11px] text-slate-300 italic flex-1 font-medium">
                    "You press 'Channel Up' (the ADT method). You don't care about the radio frequencies or infrared signals (the implementation). <br/><br/>
                    <b>Abstraction</b> hides the messy electronics so you can focus on watching the game!"
                 </p>
              </div>
           </div>
        </HandwrittenCard>

        <div className="bg-white p-10 sketch-border shadow-2xl relative overflow-hidden flex flex-col items-center">
            <h4 className="text-2xl font-black handwritten text-slate-900 mb-8 border-b-4 border-purple-200 pb-2">The Abstraction Barrier</h4>
            
            <div className="w-full flex justify-between items-center relative">
               <div className="flex flex-col items-center space-y-4 w-1/3">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg text-center w-full group hover:scale-105 transition-transform">
                     <span className="font-black text-[10px] uppercase">Application Code</span>
                     <p className="text-[8px] opacity-70">The User/Programmer</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                     <span className="text-[9px] font-mono font-black text-indigo-500">my_stack.push(10)</span>
                     <span className="text-[9px] font-mono font-black text-indigo-500">val = my_stack.pop()</span>
                  </div>
               </div>

               <div className="h-48 w-1 bg-rose-500 relative flex items-center justify-center group">
                  <div className="absolute w-20 bg-rose-500 text-white text-[8px] font-black py-1 text-center rounded rotate-[-90deg] shadow-lg group-hover:scale-110 transition-transform">INTERFACE BARRIER</div>
                  <Lock className="absolute bg-white p-1 rounded-full text-rose-500 border-2 border-rose-500" size={24} />
               </div>

               <div className="flex flex-col items-center space-y-4 w-1/3">
                  <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg text-center w-full group hover:scale-105 transition-transform">
                     <span className="font-black text-[10px] uppercase">Data Implementation</span>
                     <p className="text-[8px] opacity-70">Internal Memory / Pointers</p>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                     <div className="w-16 h-4 bg-slate-100 border border-slate-300 rounded flex space-x-1 p-0.5">
                        <div className="flex-1 bg-emerald-300 rounded-sm"></div>
                        <div className="flex-1 bg-emerald-300 rounded-sm"></div>
                        <div className="flex-1 bg-slate-200 rounded-sm"></div>
                     </div>
                     <span className="text-[8px] font-mono text-slate-400">Array indices or Next-Pointers</span>
                  </div>
               </div>
            </div>

            <p className="mt-10 text-[11px] kalam font-bold text-slate-500 text-center max-w-lg italic">
              "This barrier ensures that if we swap an Array-based Stack for a Linked-List-based Stack, the <b>Application Code</b> doesn't have to change a single line!"
            </p>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
         <HandwrittenCard title="Architect's Design Principles" bgColor="bg-purple-50" className="border-4 border-purple-200 h-full">
            <div className="space-y-6">
               <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-200 rounded-xl shrink-0"><PenTool className="text-purple-700" size={20}/></div>
                  <div>
                     <h6 className="font-black text-xs text-purple-900 uppercase mb-1">Encapsulation</h6>
                     <p className="text-[11px] kalam font-bold text-slate-600">The ADT wraps data and methods. You can only touch the data using the allowed 'Public' operations.</p>
                  </div>
               </div>
               <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-200 rounded-xl shrink-0"><Zap className="text-purple-700" size={20}/></div>
                  <div>
                     <h6 className="font-black text-xs text-purple-900 uppercase mb-1">Operation Atomicity</h6>
                     <p className="text-[11px] kalam font-bold text-slate-600">Operations (like push/pop) should be single, logical tasks. They hide the internal shifting or pointer arithmetic.</p>
                  </div>
               </div>
               <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-200 rounded-xl shrink-0"><CheckCircle2 className="text-purple-700" size={20}/></div>
                  <div>
                     <h6 className="font-black text-xs text-purple-900 uppercase mb-1">Independence</h6>
                     <p className="text-[11px] kalam font-bold text-slate-600">The high-level logic should not depend on whether the data is in RAM, on Disk, or in a Cloud bucket.</p>
                  </div>
               </div>
            </div>

            <div className="mt-10 p-6 bg-white rounded-3xl border-2 border-dashed border-purple-300">
               <h5 className="font-black text-[10px] text-purple-400 uppercase mb-3 tracking-widest">Mastery Check:</h5>
               <p className="text-xs kalam font-black text-purple-900 italic leading-tight">"Which of the following is an example of an ADT, not an implementation?"</p>
               <div className="grid grid-cols-2 gap-2 mt-4">
                  <button onClick={() => alert('❌ Incorrect! Memory address is a physical implementation detail.')} className="p-2 bg-white border border-purple-200 rounded-lg text-[9px] font-black hover:bg-rose-50 transition-colors">0x7FFE RAM BLOCK</button>
                  <button onClick={() => alert('✅ Correct! A "Stack" is a logical description (LIFO).')} className="p-2 bg-white border border-purple-200 rounded-lg text-[9px] font-black hover:bg-emerald-50 transition-colors">A LIFO STACK</button>
               </div>
            </div>
         </HandwrittenCard>

         <div className="bg-yellow-400 p-8 rounded-[3rem] sketch-border shadow-xl rotate-[-1deg]">
            <h4 className="font-black text-xl handwritten text-slate-900 mb-2 flex items-center"><GraduationCap className="mr-2" size={20}/> Syllabus Deep Link</h4>
            <p className="text-[11px] font-bold kalam text-slate-800 italic leading-relaxed">
               "B4.1.1 requires you to explain that ADTs provide <b>high-level descriptions</b>. In an exam, emphasize that this leads to <b>Code Portability</b> and <b>Easier Maintenance</b>."
            </p>
         </div>
      </div>
    </div>
  </div>
);

const LinkedListsModule = () => {
  const [activeView, setActiveView] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const [activeOp, setActiveOp] = useState<'insert' | 'delete' | 'traverse'>('insert');

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b-4 border-dashed border-slate-200 pb-6">
         <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl"><List /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">B4.1.2-3 Linked List Architect</h2>
         </div>
         <div className="flex space-x-2">
            <button onClick={() => setActiveView('singly')} className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${activeView === 'singly' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>Singly</button>
            <button onClick={() => setActiveView('doubly')} className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${activeView === 'doubly' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>Doubly</button>
            <button onClick={() => setActiveView('circular')} className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${activeView === 'circular' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>Circular</button>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visualizer */}
          <HandwrittenCard title={`${activeView.toUpperCase()} Architecture`} bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
             <div className="flex items-center space-x-12 relative py-20">
                {/* HEAD Marker */}
                <div className="absolute -top-10 left-4 flex flex-col items-center group">
                   <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mb-2">HEAD</span>
                   <ArrowDown className="text-indigo-400 animate-bounce" size={24} />
                </div>

                <ListNode data="A" next="Ptr" active={activeView === 'singly'} color="bg-emerald-500" />
                
                <div className="flex flex-col items-center">
                   {activeView === 'doubly' && <ArrowLeftRight className="text-slate-300" size={32} />}
                   {activeView !== 'doubly' && <ArrowRight className="text-slate-300" size={32} />}
                </div>

                <ListNode data="B" next="Ptr" prev="Ptr" active={activeView === 'doubly'} color="bg-indigo-500" />

                <div className="flex flex-col items-center">
                   {activeView === 'doubly' && <ArrowLeftRight className="text-slate-300" size={32} />}
                   {activeView !== 'doubly' && <ArrowRight className="text-slate-300" size={32} />}
                </div>

                <ListNode data="C" next={activeView === 'circular' ? 'HEAD' : 'NULL'} prev="Ptr" active={activeView === 'circular'} color="bg-rose-500" />

                {/* Circular Loop-back visual */}
                {activeView === 'circular' && (
                  <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible">
                    <path 
                      d="M 640 40 L 680 40 L 680 -40 L 40 -40 L 40 0" 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="3" 
                      strokeDasharray="8,4" 
                      className="animate-pulse"
                      transform="translate(10, 40)"
                    />
                    <text x="300" y="-10" className="text-[10px] font-black fill-rose-400 uppercase">Back to Head</text>
                  </svg>
                )}
             </div>

             <div className="mt-8 flex space-x-6 text-[10px] font-bold kalam text-slate-500 italic">
                <span className="flex items-center"><CheckCircle2 size={12} className="mr-1 text-emerald-500"/> Non-Contiguous Memory</span>
                <span className="flex items-center"><CheckCircle2 size={12} className="mr-1 text-emerald-500"/> Linear logical order</span>
                <span className="flex items-center"><CheckCircle2 size={12} className="mr-1 text-emerald-500"/> Dynamic resizing (Heap)</span>
             </div>
          </HandwrittenCard>

          {/* Operation Workbench */}
          <div className="bg-slate-50 p-8 rounded-[3rem] sketch-border border-2 border-slate-200 shadow-inner">
             <div className="flex items-center space-x-4 mb-8">
                <div className="p-2 bg-indigo-600 text-white rounded-lg"><Zap size={20}/></div>
                <h3 className="text-2xl font-black handwritten">Pointer Operation Workbench</h3>
                <div className="flex-grow"></div>
                <div className="flex bg-white p-1 rounded-full border border-slate-200">
                   <button onClick={() => setActiveOp('insert')} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${activeOp === 'insert' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>Insertion</button>
                   <button onClick={() => setActiveOp('delete')} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${activeOp === 'delete' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>Deletion</button>
                </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-8">
                {/* Logic Steps */}
                <div className="space-y-4">
                   <h5 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Logic Map: {activeOp === 'insert' ? 'Insert After B' : 'Delete B'}</h5>
                   {activeOp === 'insert' ? (
                     <div className="space-y-3">
                        <Step num="1" text="Instantiate NEW Node(X)." />
                        <Step num="2" text="Point X.next to B.next." active />
                        <Step num="3" text="Point B.next to X." active />
                        <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl mt-4">
                           <p className="text-[10px] kalam font-bold text-yellow-800 italic leading-tight">
                              <b>Exam Warning:</b> Order matters! If you point B to X first, you LOSE the reference to C, and the rest of the list vanishes into the void of memory leaks.
                           </p>
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-3">
                        <Step num="1" text="Traverse to node BEFORE target (A)." />
                        <Step num="2" text="Update A.next to point to B.next (C)." active />
                        <Step num="3" text="Garbage collector deletes B." />
                        <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl mt-4">
                           <p className="text-[10px] kalam font-bold text-indigo-800 italic leading-tight">
                              <b>Logical Bypass:</b> Deletion in a Singly List is actually just 'unhooking'. We bypass the node so it is no longer reachable.
                           </p>
                        </div>
                     </div>
                   )}
                </div>

                {/* Code Snippet */}
                <div className="bg-slate-950 p-6 rounded-3xl border-b-8 border-slate-900 shadow-xl overflow-hidden relative">
                   <div className="absolute top-2 right-4 text-[8px] font-mono text-slate-600 uppercase tracking-widest">LinkedList.py</div>
                   <pre className="text-[10px] font-mono leading-relaxed text-indigo-300">
{activeOp === 'insert' ? 
`# [!] Rewiring Logic
def insert_after(prev_node, data):
    # 1. Create X
    new_node = Node(data)
    
    # 2. X points to C
    new_node.next = prev_node.next
    
    # 3. B points to X
    prev_node.next = new_node` 
: 
`# [!] Bypass Logic
def delete_node(prev_node):
    # Current node to be removed
    target = prev_node.next
    
    # A points directly to C
    prev_node.next = target.next
    
    # Optional: Clear target ref
    target = None`}
                   </pre>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar evaluation */}
        <div className="lg:col-span-4 space-y-6">
           <HandwrittenCard title="B4.1.2 Evaluation" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 h-full shadow-2xl">
              <h5 className="text-[10px] font-black uppercase text-yellow-400 mb-6 tracking-widest flex items-center">
                 <Activity size={14} className="mr-2"/> Performance Metrics
              </h5>
              <div className="space-y-6">
                 <EvalPoint title="Memory Access" val="O(N)" status="Worse than Array" desc="To find node #50, you MUST walk through nodes 1-49. No jump-access!" />
                 <EvalPoint title="Insert / Delete" val="O(1)" status="Better than Array" desc="Just move 2 pointers. No need to 'shift' thousands of elements right or left." />
                 <EvalPoint title="Memory Layout" val="Fragmented" status="Dynamic" desc="Nodes can be scattered anywhere in the heap. Uses extra memory for the Pointers!" />
              </div>

              <div className="mt-12 bg-white/5 p-6 rounded-3xl border border-white/10">
                 <h6 className="text-[10px] font-black uppercase text-emerald-400 mb-3 tracking-widest">Variant Selection:</h6>
                 <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                       <MoveRight className="text-emerald-500" size={16}/>
                       <p className="text-[10px] kalam text-slate-400"><b>Singly:</b> Use for simple stacks/queues where only 1-way flow is needed.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                       <ArrowLeftRight className="text-indigo-500" size={16}/>
                       <p className="text-[10px] kalam text-slate-400"><b>Doubly:</b> Use for Browser History (Back/Forward) or Music Playlists.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                       <RefreshCw className="text-rose-500" size={16}/>
                       <p className="text-[10px] kalam text-slate-400"><b>Circular:</b> Multi-player games (Turns) or Round-Robin CPU scheduling.</p>
                    </div>
                 </div>
              </div>
           </HandwrittenCard>
        </div>
      </div>

      {/* Code for Node structure */}
      <HandwrittenCard title="B4.1.3 Constructing the Foundation" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h4 className="text-2xl font-black handwritten text-emerald-700">The Node Blueprint</h4>
               <p className="kalam text-lg font-bold text-slate-700 italic">
                 "In OOP terms, a Linked List is a class that manages multiple instances of a <b>Node class</b>. Each Node is an object containing data and a reference to another Node object."
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                     <span className="text-[9px] font-black uppercase text-emerald-700">Data Field</span>
                     <p className="text-[10px] kalam font-bold text-slate-500">Stores the actual value (Int, String, Object).</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
                     <span className="text-[9px] font-black uppercase text-indigo-700">Pointer Field</span>
                     <p className="text-[10px] kalam font-bold text-slate-500">Stores the memory address of the next neighbor.</p>
                  </div>
               </div>
            </div>
            <div className="bg-slate-950 p-8 rounded-[3rem] border-b-8 border-emerald-900 shadow-2xl">
               <pre className="text-xs font-mono leading-relaxed text-emerald-400">
{`class Node:
    def __init__(self, data):
        self.data = data # Payload
        self.next = None # Singly Pointer
        self.prev = None # Doubly Pointer (Optional)

class LinkedList:
    def __init__(self):
        self.head = None # Start of the chain

# Usage
n1 = Node(10)
n2 = Node(20)
n1.next = n2 # The Link is created!`}
               </pre>
            </div>
         </div>
      </HandwrittenCard>
    </div>
  );
};

const BSTModule = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-purple-900 text-white rounded-2xl shadow-xl"><Network /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B4.1.4 Binary Search Trees (BST)</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
      <HandwrittenCard title="Hierarchical Logic" bgColor="bg-white" className="border-4 border-slate-900 shadow-xl overflow-hidden relative">
         <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Triangle size={200} /></div>
         <p className="kalam text-lg font-bold text-slate-800 leading-relaxed mb-10">
           "A specialized tree where for every node: <br/> 
           <span className="text-rose-600">Left Child {'<'} Root</span> and <span className="text-emerald-600">Right Child {'>'} Root</span>."
         </p>
         
         <div className="flex flex-col items-center">
            {/* Root */}
            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-900 text-white flex items-center justify-center font-black text-xl mb-4 shadow-xl">50</div>
            
            <div className="flex space-x-20 relative">
               <div className="absolute top-[-10px] left-1/2 w-0.5 h-6 bg-slate-300 -translate-x-1/2"></div>
               {/* Left Subtree */}
               <div className="flex flex-col items-center space-y-4">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-rose-500 text-white flex items-center justify-center font-black shadow-lg">30</div>
                  <div className="flex space-x-8">
                     <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-400 text-xs">20</div>
                     <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-400 text-xs">40</div>
                  </div>
               </div>
               {/* Right Subtree */}
               <div className="flex flex-col items-center space-y-4">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg">70</div>
                  <div className="flex space-x-8">
                     <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-400 text-xs">60</div>
                     <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-400 text-xs">80</div>
                  </div>
               </div>
            </div>
         </div>
      </HandwrittenCard>

      <div className="space-y-6">
         <div className="p-8 bg-slate-900 text-white rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Activity size={100}/></div>
            <h4 className="text-2xl font-black handwritten text-yellow-400 mb-6">Traversal Logic</h4>
            <div className="space-y-4">
               <TraversalStep type="In-Order" logic="Left -> Root -> Right" result="Sorted Sequence" />
               <TraversalStep type="Pre-Order" logic="Root -> Left -> Right" result="Tree Duplication" />
               <TraversalStep type="Post-Order" logic="Left -> Right -> Root" result="Deletion Order" />
            </div>
         </div>

         <HandwrittenCard title="Operations Complexity" bgColor="bg-indigo-50">
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white rounded-2xl border-2 border-indigo-200">
                  <span className="text-[10px] font-black uppercase text-indigo-400">Search/Insert</span>
                  <div className="text-2xl font-mono font-black text-indigo-700">O(log N)</div>
                  <p className="text-[8px] kalam italic text-slate-500">Assuming balanced tree.</p>
               </div>
               <div className="p-4 bg-white rounded-2xl border-2 border-indigo-200">
                  <span className="text-[10px] font-black uppercase text-indigo-400">Worst Case</span>
                  <div className="text-2xl font-mono font-black text-rose-600">O(N)</div>
                  <p className="text-[8px] kalam italic text-slate-500">When the tree is "Skewed" (a line).</p>
               </div>
            </div>
         </HandwrittenCard>
      </div>
    </div>
  </div>
);

const SetsHashingModule = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-pink-600 text-white rounded-2xl shadow-xl"><Database /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B4.1.5-6 Sets & Hashing Masterclass</h2>
    </div>

    {/* Section 1: Sets */}
    <div className="grid lg:grid-cols-2 gap-12">
      <HandwrittenCard title="B4.1.5 Sets: The Venn Reality" bgColor="bg-white" className="border-4 border-pink-600 shadow-xl overflow-hidden relative">
         <div className="flex flex-col items-center space-y-10">
            <div className="flex -space-x-12 relative h-48 w-64 items-center justify-center">
               <div className="w-40 h-40 rounded-full bg-pink-100/50 border-4 border-pink-500 flex items-center justify-center"><span className="text-xs font-black -ml-16">Set A</span></div>
               <div className="w-40 h-40 rounded-full bg-blue-100/50 border-4 border-blue-500 flex items-center justify-center"><span className="text-xs font-black ml-16">Set B</span></div>
               <div className="absolute inset-0 flex items-center justify-center"><Sparkles className="text-purple-600 opacity-40" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full">
               <SetOp name="Union" symbol="∪" desc="A or B" />
               <SetOp name="Intersec." symbol="∩" desc="A and B" />
               <SetOp name="Diff." symbol="-" desc="In A NOT B" />
            </div>
            <div className="w-full bg-slate-950 p-4 rounded-2xl font-mono text-[10px] text-pink-400">
               s = {"{1, 2, 3}"} <span className="text-slate-600"># Literal</span><br/>
               s.add(4) <span className="text-slate-600"># O(1) avg</span><br/>
               print(3 in s) <span className="text-slate-600"># Fast Lookup</span>
            </div>
         </div>
      </HandwrittenCard>

      <div className="space-y-6">
         <HandwrittenCard title="Architect's Set Logic" bgColor="bg-slate-50" className="border-4 border-slate-200">
            <p className="kalam text-lg font-bold text-slate-700 italic mb-6">"Sets are collections of <b>unique</b> items with no logical order. Their superpower? <b>Instant Membership Check</b>."</p>
            <div className="space-y-4">
               <div className="p-4 bg-white border-l-4 border-pink-500 rounded-r-xl shadow-sm">
                  <h6 className="font-black text-xs text-pink-900 uppercase mb-1">Key Characteristic: No Duplicates</h6>
                  <p className="text-[10px] kalam text-slate-500 italic">"Adding 'Apple' twice still results in one 'Apple'. This is crucial for filtering large datasets (A1.2)."</p>
               </div>
               <div className="p-4 bg-white border-l-4 border-pink-500 rounded-r-xl shadow-sm">
                  <h6 className="font-black text-xs text-pink-900 uppercase mb-1">Hashing Implementation</h6>
                  <p className="text-[10px] kalam text-slate-500 italic">"How are sets so fast? They use a <b>Hash Table</b> internally. Instead of searching a list, Python 'jumps' straight to the item's location."</p>
               </div>
            </div>
         </HandwrittenCard>
      </div>
    </div>

    {/* Section 2: Hashing Deep Dive */}
    <div className="pt-10 space-y-10">
       <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl"><Hash /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B4.1.6 The Hashing Pipeline</h2>
       </div>

       <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
             {/* The Pipeline Visual */}
             <HandwrittenCard title="Direct Mapping Strategy" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-16 py-12">
                   {/* Step 1: The Key */}
                   <div className="flex flex-col items-center group">
                      <div className="w-24 h-16 bg-slate-900 text-white flex items-center justify-center font-black text-xs rounded-xl shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform">
                         <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400" />
                         "Alice"
                      </div>
                      <span className="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Input Key</span>
                   </div>

                   <ArrowRight className="text-slate-300 hidden md:block" size={32} />

                   {/* Step 2: The Function */}
                   <div className="flex flex-col items-center group">
                      <div className="w-32 h-32 bg-indigo-50 border-4 border-indigo-600 rounded-[2rem] flex flex-col items-center justify-center text-center p-4 shadow-xl group-hover:rotate-6 transition-all">
                         <Calculator className="text-indigo-600 mb-2" size={24} />
                         <span className="text-[10px] font-mono font-black text-indigo-900">h(k) = k % size</span>
                      </div>
                      <span className="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Hash Function</span>
                   </div>

                   <ArrowRight className="text-slate-300 hidden md:block" size={32} />

                   {/* Step 3: The Index */}
                   <div className="flex flex-col items-center group">
                      <div className="w-24 h-24 bg-emerald-50 border-4 border-emerald-500 rounded-full flex items-center justify-center font-black text-3xl text-emerald-700 shadow-lg group-hover:scale-110 transition-transform">
                         05
                      </div>
                      <span className="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Memory Slot</span>
                   </div>
                </div>

                <div className="bg-slate-50 p-6 w-full mt-auto border-t-2 border-slate-100 flex items-center justify-center space-x-8">
                   <div className="flex items-center space-x-2">
                      <Zap className="text-yellow-500" size={16}/>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Average Search: <b className="text-slate-900">O(1)</b></span>
                   </div>
                   <div className="flex items-center space-x-2">
                      <Layers className="text-indigo-500" size={16}/>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Requirement: <b className="text-slate-900">Hashable Keys</b></span>
                   </div>
                </div>
             </HandwrittenCard>

             {/* Collision Resolution Gallery */}
             <div className="grid md:grid-cols-2 gap-8">
                <HandwrittenCard title="Strategy 1: Chaining" bgColor="bg-white" className="border-4 border-indigo-600">
                   <p className="text-[10px] kalam font-bold text-slate-500 italic mb-6 leading-tight">"If index 5 is taken, attach a <b>Linked List</b> at that index. The bucket stores multiple items."</p>
                   <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-10 border-2 border-slate-900 bg-indigo-100 flex items-center justify-center font-black text-xs">Idx 5</div>
                         <ArrowRight className="text-slate-300" size={16}/>
                         <div className="flex space-x-2">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center text-[10px] font-black">Val A</div>
                            <Link className="text-slate-200 mt-3" size={12}/>
                            <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center text-[10px] font-black animate-pulse">Val B</div>
                         </div>
                      </div>
                   </div>
                   <div className="mt-6 p-3 bg-indigo-50 rounded-xl">
                      <p className="text-[9px] font-black uppercase text-indigo-700">Exam Note: Space intensive but easy to implement.</p>
                   </div>
                </HandwrittenCard>

                <HandwrittenCard title="Strategy 2: Linear Probing" bgColor="bg-white" className="border-4 border-emerald-600">
                   <p className="text-[10px] kalam font-bold text-slate-500 italic mb-6 leading-tight">"If index 5 is taken, look for index 6. If that's taken, look for 7. Find the next <b>empty slot</b>."</p>
                   <div className="flex flex-col space-y-2">
                      <div className="flex space-x-1">
                         <div className="flex-1 h-10 bg-slate-200 border border-slate-300 flex items-center justify-center text-[8px] font-black">ID 4</div>
                         <div className="flex-1 h-10 bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black text-white">OCCUPIED</div>
                         <div className="flex-1 h-10 bg-emerald-100 border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center animate-bounce">
                            <span className="text-[7px] font-black text-emerald-600">EMPTY</span>
                            <ArrowDown size={8} className="text-emerald-400" />
                         </div>
                      </div>
                   </div>
                   <div className="mt-10 p-3 bg-emerald-50 rounded-xl">
                      <p className="text-[9px] font-black uppercase text-emerald-700">Exam Note: Prone to 'Clustering'.</p>
                   </div>
                </HandwrittenCard>
             </div>
          </div>

          {/* Python Implementation Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             <HandwrittenCard title="Under the Python Hood" bgColor="bg-slate-950" className="text-indigo-300 border-slate-800 border-4 shadow-2xl h-full flex flex-col">
                <div className="flex-1">
                   <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-3">
                      <Code size={18} className="text-emerald-400"/>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">HashTable.py</span>
                   </div>
                   <pre className="text-[10px] font-mono leading-relaxed text-indigo-200">
{`class MyHash:
    def __init__(self, size):
        # [!] Internal Array Implementation
        self.size = size
        self.table = [None] * size

    def _hash(self, key):
        # 1. Standard MODULO mapping
        # Built-in hash() for strings
        return hash(key) % self.size

    def put(self, key, value):
        idx = self._hash(key)
        # 2. Linear Probing logic
        while self.table[idx] is not None:
            idx = (idx + 1) % self.size
        self.table[idx] = value

    def get(self, key):
        idx = self._hash(key)
        return self.table[idx]`}
                   </pre>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800">
                   <h6 className="text-[10px] font-black uppercase text-yellow-400 mb-3 tracking-widest flex items-center">
                      <Star size={14} className="mr-2"/> Python built-ins:
                   </h6>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all">
                         <span className="text-xs font-bold text-white block">dict()</span>
                         <p className="text-[8px] kalam italic text-slate-500 mt-1">Key-Value Map</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all">
                         <span className="text-xs font-bold text-white block">set()</span>
                         <p className="text-[8px] kalam italic text-slate-500 mt-1">Unique Keys Only</p>
                      </div>
                   </div>
                </div>
             </HandwrittenCard>
          </div>
       </div>

       {/* Performance Evaluation Footer */}
       <div className="bg-slate-900 p-10 rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden border-4 border-indigo-500">
          <div className="absolute top-0 right-0 p-10 opacity-5"><Scale size={140} className="text-white"/></div>
          <h3 className="text-3xl font-black handwritten text-yellow-400 mb-8 uppercase tracking-tighter">B4.1.6 Evaluation: The Load Factor</h3>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <h5 className="font-black text-xs uppercase text-indigo-300 tracking-widest">Average Performance</h5>
                <div className="text-4xl font-black font-mono text-white">O(1)</div>
                <p className="text-[11px] kalam italic text-slate-400">Assuming a <b>sparse table</b> (Load Factor {'<'} 0.7), lookup is constant time regardless of N.</p>
             </div>
             <div className="space-y-4">
                <h5 className="font-black text-xs uppercase text-rose-400 tracking-widest">Worst Case Logic</h5>
                <div className="text-4xl font-black font-mono text-rose-500">O(N)</div>
                <p className="text-[11px] kalam italic text-slate-400">When the table is full or the hash function is poor, many <b>collisions</b> occur, turning the table into a simple list.</p>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col justify-center">
                <h6 className="text-[10px] font-black uppercase text-yellow-400 mb-4">Paper 1 Prompt Checklist:</h6>
                <ul className="text-[9px] font-mono text-slate-500 space-y-2 uppercase leading-tight">
                   <li className="flex items-start"><CheckCircle2 size={10} className="mr-2 text-emerald-500 shrink-0"/> Direct Memory Mapping</li>
                   <li className="flex items-start"><CheckCircle2 size={10} className="mr-2 text-emerald-500 shrink-0"/> Non-Ordered ADT</li>
                   <li className="flex items-start"><CheckCircle2 size={10} className="mr-2 text-emerald-500 shrink-0"/> Space/Time Tradeoff</li>
                </ul>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// Helpers
const NodeDisplay = ({ val, next, color }: any) => (
  <div className="flex flex-col items-center">
    <div className={`w-32 h-20 border-4 border-slate-900 rounded-xl flex shadow-xl overflow-hidden ${color}`}>
       <div className="flex-1 bg-white flex items-center justify-center font-black text-slate-800 border-r-4 border-slate-900">{val}</div>
       <div className="w-10 bg-slate-900 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
       </div>
    </div>
    <span className="mt-3 text-[10px] font-black uppercase text-slate-400 tracking-tighter">{next}</span>
  </div>
);

const TypeBox = ({ title, desc, icon: Icon, color }: any) => (
  <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-slate-900 transition-all shadow-sm group">
     <div className={`p-2 rounded-xl bg-slate-50 mb-3 inline-block ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={18}/>
     </div>
     <h5 className="font-black text-sm text-slate-900 mb-1">{title}</h5>
     <p className="text-[10px] kalam font-bold text-slate-500 leading-relaxed italic">{desc}</p>
  </div>
);

const EvalRow = ({ label, arr, list, desc }: any) => (
  <div className="border-b border-white/5 py-3 last:border-0 group">
    <div className="flex justify-between items-center mb-1">
       <span className="font-black text-[10px] uppercase text-slate-500">{label}</span>
       <div className="flex space-x-2">
          <span className="bg-rose-950/40 text-rose-300 px-2 py-0.5 rounded text-[8px] font-mono">Arr: {arr}</span>
          <span className="bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded text-[8px] font-mono">List: {list}</span>
       </div>
    </div>
    <p className="text-[9px] kalam italic text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity">{desc}</p>
  </div>
);

const TraversalStep = ({ type, logic, result }: any) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
     <div className="flex justify-between items-center mb-1">
        <span className="text-indigo-300 font-black text-sm">{type}</span>
        <span className="text-[10px] font-mono text-slate-500">{logic}</span>
     </div>
     <p className="text-[9px] uppercase tracking-widest text-emerald-500 font-black">{result}</p>
  </div>
);

const SetOp = ({ name, symbol, desc }: any) => (
  <div className="p-3 bg-slate-50 rounded-xl text-center border-2 border-slate-100">
     <span className="text-xl font-black text-pink-600 block">{symbol}</span>
     <span className="text-[10px] font-black uppercase text-slate-900">{name}</span>
     <p className="text-[8px] kalam font-bold text-slate-400 mt-1 italic">{desc}</p>
  </div>
);

const CheckPoint = ({ text }: { text: string }) => (
  <li className="flex items-start space-x-2 text-purple-900/70">
     <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-purple-900" />
     <span className="text-xs kalam font-bold italic">{text}</span>
  </li>
);

// Sub Components for LinkedLists logic
const ListNode = ({ data, next, prev, active, color }: any) => (
  <div className={`relative flex flex-col items-center group transition-all duration-500 ${active ? 'scale-110 shadow-2xl' : 'opacity-80 scale-90'}`}>
     <div className={`w-36 h-24 border-4 border-slate-900 rounded-2xl flex overflow-hidden shadow-xl ${color}`}>
        {prev && (
          <div className="w-8 bg-slate-900 flex items-center justify-center border-r-2 border-white/20">
             <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full" />
          </div>
        )}
        <div className="flex-1 bg-white flex flex-col items-center justify-center font-black text-slate-800">
           <span className="text-2xl">{data}</span>
           <span className="text-[8px] uppercase opacity-40 mt-1">Payload</span>
        </div>
        <div className="w-10 bg-slate-900 flex items-center justify-center border-l-2 border-white/20">
           <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
     </div>
     <div className="mt-3 flex justify-between w-full px-2">
        {prev && <span className="text-[8px] font-mono font-black text-slate-400">prev</span>}
        <span className="text-[8px] font-mono font-black text-slate-400 ml-auto">{next}</span>
     </div>
  </div>
);

const Step = ({ num, text, active }: any) => (
  <div className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all ${active ? 'bg-indigo-600 text-white border-indigo-900 shadow-md translate-x-2' : 'bg-white border-slate-100 text-slate-500'}`}>
     <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ${active ? 'bg-white text-indigo-600' : 'bg-slate-100'}`}>{num}</span>
     <p className="text-xs font-bold kalam">{text}</p>
  </div>
);

const EvalPoint = ({ title, val, status, desc }: any) => (
  <div className="border-b border-white/5 pb-4 last:border-0 group">
     <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-black text-indigo-400 uppercase">{title}</span>
        <div className="flex space-x-2">
           <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-yellow-400">{val}</span>
        </div>
     </div>
     <div className="flex items-center space-x-2 mb-2">
        <div className={`w-1.5 h-1.5 rounded-full ${status.includes('Better') ? 'bg-emerald-500' : 'bg-rose-500'}`} />
        <span className="text-[9px] font-black text-slate-500 uppercase">{status}</span>
     </div>
     <p className="text-[10px] kalam text-slate-400 italic opacity-60 group-hover:opacity-100 transition-opacity leading-tight">"{desc}"</p>
  </div>
);

export default B4ADTSection;
