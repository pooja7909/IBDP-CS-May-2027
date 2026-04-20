
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Brain, Zap, Scissors, Search, GitBranch, Terminal, 
  HelpCircle, CheckCircle2, Info, ArrowRight, Sparkles, 
  Box, Eye, Layers, Lock, Cpu, Database, Network, Binary,
  Play, RotateCcw
} from 'lucide-react';

const ComputationalThinkingSection: React.FC = () => {
  const [specSelections, setSpecSelections] = useState<Record<string, string>>({});
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [tracerInput, setTracerInput] = useState<number>(5);
  const [showTracerResult, setShowTracerResult] = useState(false);

  // B1.1.1 Data
  const specItems = [
    { id: '1', type: 'Input', item: 'Student Barcode', group: 'input' },
    { id: '2', type: 'Process', item: 'Deduct Balance', group: 'process' },
    { id: '3', type: 'Output', item: 'Receipt Receipt', group: 'output' },
    { id: '4', type: 'Constraint', item: 'No Offline Sales', group: 'constraint' }
  ];

  // B1.1.2 Data
  const ctConcepts = [
    { 
      id: 'decomposition', 
      title: 'Decomposition', 
      icon: Scissors, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50',
      detail: 'Breaking a complex problem down into smaller, manageable parts.' 
    },
    { 
      id: 'abstraction', 
      title: 'Abstraction', 
      icon: Eye, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50',
      detail: 'Removing unnecessary details to focus on the essential features.' 
    },
    { 
      id: 'patterns', 
      title: 'Pattern Recognition', 
      icon: Search, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      detail: 'Looking for similarities or trends within problems.' 
    },
    { 
      id: 'algorithms', 
      title: 'Algorithmic Thinking', 
      icon: Terminal, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      detail: 'Developing a step-by-step solution to the problem.' 
    }
  ];

  const handleSpecSelect = (id: string, group: string) => {
    setSpecSelections(prev => ({ ...prev, [id]: group }));
  };

  const checkSpec = () => {
    const correctCount = specItems.filter(item => specSelections[item.id] === item.group).length;
    alert(correctCount === 4 ? "✅ Perfect Specification!" : "🧐 Some items are in the wrong bucket. Try again!");
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Topic B1: Computational Thinking</h1>
        <p className="text-xl kalam text-slate-600 italic">"The Mindset of a Problem Solver"</p>
      </div>

      {/* B1.1.1: Problem Specification Lab */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
            <Box size={24}/>
          </div>
          <h2 className="text-3xl font-black handwritten text-slate-900">B1.1.1: Problem Specification Lab</h2>
        </div>
        
        <HandwrittenCard bgColor="bg-white">
          <p className="kalam text-lg mb-6"><b>Scenario:</b> We are building an <b>Automated School Canteen App</b>. Sort the following components into their correct categories to build a valid specification.</p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {specItems.map(item => (
              <div key={item.id} className="p-4 bg-slate-50 border-2 border-slate-200 sketch-border flex flex-col items-center">
                <span className="font-black text-sm mb-3">{item.item}</span>
                <select 
                  onChange={(e) => handleSpecSelect(item.id, e.target.value)}
                  className="w-full p-2 text-[10px] font-black uppercase bg-white border-2 border-slate-900 rounded-lg outline-none"
                >
                  <option value="">Category?</option>
                  <option value="input">Input</option>
                  <option value="process">Process</option>
                  <option value="output">Output</option>
                  <option value="constraint">Constraint</option>
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={checkSpec}
              className="px-10 py-3 bg-indigo-600 text-white rounded-full font-black shadow-xl hover:scale-105 transition-all"
            >
              VALIDATE SPECIFICATION
            </button>
          </div>
        </HandwrittenCard>
      </section>

      {/* B1.1.2: The Fundamental Concepts */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg">
            <Brain size={24}/>
          </div>
          <h2 className="text-3xl font-black handwritten text-slate-900">B1.1.2: The Core Concepts</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ctConcepts.map((concept) => (
            <div 
              key={concept.id}
              onClick={() => setActiveConcept(concept.id)}
              className={`p-6 sketch-border cursor-pointer transition-all duration-300 ${concept.bg} ${activeConcept === concept.id ? 'scale-105 shadow-2xl ring-4 ring-slate-900' : 'hover:-translate-y-2'}`}
            >
              <concept.icon className={`${concept.color} mb-4`} size={32} />
              <h3 className="font-black text-xl handwritten mb-2">{concept.title}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">The "How"</p>
              
              {activeConcept === concept.id && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm kalam text-slate-800 leading-relaxed font-bold">{concept.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* B1.1.3: CT in Computer Science Applications */}
      <section className="space-y-8 pt-8">
        <div className="relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full font-black text-xs shadow-xl z-10 flex items-center">
            <Zap size={14} className="mr-2 text-yellow-400" /> B1.1.3: CROSS-CURRICULAR APPLICATIONS
          </div>
          
          <HandwrittenCard bgColor="bg-indigo-50" className="border-indigo-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              <AppCard 
                icon={Database} 
                title="Database Design" 
                detail="Using ABSTRACTION to focus on entity relationships (ERDs) while ignoring raw storage physics." 
              />
              <AppCard 
                icon={Lock} 
                title="Network Security" 
                detail="PATTERN RECOGNITION to detect suspicious traffic behaviors or known virus signatures." 
              />
              <AppCard 
                icon={Binary} 
                title="Machine Learning" 
                detail="ALGORITHMIC THINKING to define the training steps a model must take to learn from data." 
              />
              <AppCard 
                icon={Cpu} 
                title="Software Dev" 
                detail="DECOMPOSITION to break a massive app into reusable functions and object-oriented classes." 
              />
              <AppCard 
                icon={Sparkles} 
                title="Data Analysis" 
                detail="Removing noise (ABSTRACTION) to find the core trends that answer a business question." 
              />
              <AppCard 
                icon={Layers} 
                title="System Design" 
                detail="Step-by-step logic for how a user moves through an interface (UX Design)." 
              />
            </div>
          </HandwrittenCard>
        </div>
      </section>

      {/* B1.1.4: Flowchart Workshop */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg">
            <GitBranch size={24}/>
          </div>
          <h2 className="text-3xl font-black handwritten text-slate-900">B1.1.4: Flowchart Workshop</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Legend */}
          <HandwrittenCard title="Symbol Legend" bgColor="bg-white">
            <div className="space-y-4">
              <FlowLegend 
                shape="rounded-full" 
                label="Terminal" 
                usage="Start or End of the program." 
                color="bg-slate-200 border-slate-900" 
              />
              <FlowLegend 
                shape="rotate-[12deg] rounded-none" 
                label="Input/Output" 
                usage="Getting data or showing results." 
                color="bg-blue-100 border-blue-900" 
              />
              <FlowLegend 
                shape="rounded-none" 
                label="Process" 
                usage="Calculations or internal assignments." 
                color="bg-green-100 border-green-900" 
              />
              <FlowLegend 
                shape="rotate-45" 
                label="Decision" 
                usage="A question (Yes/No) that splits the path." 
                color="bg-amber-100 border-amber-900" 
              />
            </div>
          </HandwrittenCard>

          {/* Interactive Tracer */}
          <HandwrittenCard title="Interactive Logic Tracer" bgColor="bg-slate-900" className="text-white">
            <p className="text-xs text-slate-400 mb-6 font-mono">Trace the following logic: If N = {tracerInput}, what is the result?</p>
            
            <div className="space-y-6 flex flex-col items-center">
              <div className="px-4 py-2 border-2 border-white rounded-full text-[10px] font-black">START</div>
              <ArrowRight className="rotate-90 text-slate-600" size={16}/>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500">Input N:</span>
                <input 
                  type="number" 
                  value={tracerInput} 
                  onChange={(e) => { setTracerInput(Number(e.target.value)); setShowTracerResult(false); }}
                  className="bg-slate-800 border border-slate-600 text-white px-3 py-1 rounded w-20 text-center font-bold"
                />
              </div>
              
              <ArrowRight className="rotate-90 text-slate-600" size={16}/>
              
              <div className="p-4 border-2 border-white rotate-45 w-24 h-24 flex items-center justify-center text-center">
                <span className="text-[10px] -rotate-45 font-black uppercase">N {'>'} 10?</span>
              </div>
              
              <div className="flex w-full justify-between max-w-[200px]">
                <div className="flex flex-col items-center">
                   <span className="text-[10px] font-bold text-green-400 mb-1">YES</span>
                   <ArrowRight className="rotate-90 text-slate-600" size={16}/>
                   <div className="p-2 border-2 border-green-500 text-[10px] font-black uppercase">Print "Big"</div>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-[10px] font-bold text-red-400 mb-1">NO</span>
                   <ArrowRight className="rotate-90 text-slate-600" size={16}/>
                   <div className="p-2 border-2 border-red-500 text-[10px] font-black uppercase">Print "Small"</div>
                </div>
              </div>

              <div className="mt-8">
                 <button 
                  onClick={() => setShowTracerResult(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded font-black text-xs hover:bg-indigo-500 transition-all flex items-center"
                 >
                   <Play size={14} className="mr-2"/> RUN TRACE
                 </button>
              </div>

              {showTracerResult && (
                <div className="mt-4 p-4 bg-indigo-950 border border-indigo-500 rounded-xl animate-bounce">
                  <p className="text-xl font-black text-indigo-300">
                    OUTPUT: "{tracerInput > 10 ? 'Big' : 'Small'}"
                  </p>
                </div>
              )}
            </div>
          </HandwrittenCard>
        </div>
      </section>

      {/* Recap Challenge */}
      <div className="pt-10 flex flex-col items-center">
         <div className="bg-emerald-100 p-8 rounded-[3rem] sketch-border max-w-2xl w-full text-center relative overflow-hidden">
            <div className="absolute top-2 right-10 text-emerald-300 opacity-20"><HelpCircle size={80}/></div>
            <h3 className="text-3xl font-black handwritten text-emerald-900 mb-4">Topic B1 Mastery Check</h3>
            <p className="kalam text-emerald-800 font-bold mb-6 italic">"Which CT pillar is used when you create a generalized formula for finding the area of any rectangle?"</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-white border-2 border-emerald-900 rounded-2xl font-black text-xs hover:bg-emerald-900 hover:text-white transition-all">DECOMPOSITION</button>
              <button onClick={() => alert("✅ CORRECT! Abstraction focuses on the formula, ignoring specific numbers.")} className="p-4 bg-white border-2 border-emerald-900 rounded-2xl font-black text-xs hover:bg-emerald-900 hover:text-white transition-all">ABSTRACTION</button>
              <button className="p-4 bg-white border-2 border-emerald-900 rounded-2xl font-black text-xs hover:bg-emerald-900 hover:text-white transition-all">PATTERNS</button>
              <button className="p-4 bg-white border-2 border-emerald-900 rounded-2xl font-black text-xs hover:bg-emerald-900 hover:text-white transition-all">ALGORITHMS</button>
            </div>
         </div>
      </div>
    </div>
  );
};

// Sub-components
const FlowLegend = ({ shape, label, usage, color }: any) => (
  <div className="flex items-center space-x-6 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
    <div className={`w-12 h-12 border-2 ${color} ${shape} shrink-0 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110`}>
      <div className="w-1 h-1 bg-slate-900 rounded-full opacity-20"/>
    </div>
    <div>
      <h5 className="font-black text-sm text-slate-900">{label}</h5>
      <p className="text-[10px] kalam text-slate-500 font-bold">{usage}</p>
    </div>
  </div>
);

const AppCard = ({ icon: Icon, title, detail }: any) => (
  <div className="p-4 bg-white sketch-border flex flex-col items-center text-center group hover:shadow-lg transition-all">
    <div className="p-3 bg-slate-900 text-white rounded-xl mb-3 group-hover:scale-110 transition-transform">
      <Icon size={18}/>
    </div>
    <h4 className="font-black text-xs text-slate-900 uppercase mb-2">{title}</h4>
    <p className="text-[9px] kalam text-slate-600 leading-relaxed font-bold">{detail}</p>
  </div>
);

export default ComputationalThinkingSection;
