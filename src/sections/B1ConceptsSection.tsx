import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Brain, Scissors, Eye, Search, Terminal, ArrowRight, Zap, Info, Cake, Users, Music, MapPin } from 'lucide-react';

const B1ConceptsSection: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState(0);

  const concepts = [
    {
      title: 'Decomposition',
      icon: Scissors,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      detail: 'The process of breaking a complex problem into smaller, sub-problems that are easier to understand and solve.',
      example: 'To plan a massive Birthday Party: Decompose into Guest List, Venue, Food, and Entertainment.'
    },
    {
      title: 'Abstraction',
      icon: Eye,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      detail: 'The process of filtering out unnecessary details to focus on the essential features of a problem.',
      example: 'A GPS map abstracts away trees and buildings to focus only on roads and intersections.'
    },
    {
      title: 'Pattern Recognition',
      icon: Search,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      detail: 'The process of looking for similarities or trends within or between problems.',
      example: 'In web dev, recognizing that every "user profile" needs a name, photo, and bio creates a reusable pattern.'
    },
    {
      title: 'Algorithmic Thinking',
      icon: Terminal,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      detail: 'The process of developing a step-by-step set of instructions or rules to solve a problem.',
      example: 'A recipe for a cake or the sorting steps of a Bubble Sort.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">B1.1.2 The Core Concepts</h1>
        <p className="text-xl kalam text-slate-600 italic">"The Four Pillars of CT"</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {concepts.map((c, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveConcept(idx)}
            className={`p-6 sketch-border text-left transition-all hover:-translate-y-1 ${c.bg} ${activeConcept === idx ? 'ring-4 ring-slate-900 shadow-2xl scale-105' : 'opacity-60'}`}
          >
            <c.icon className={`${c.color} mb-4`} size={32} />
            <h3 className="font-black text-xl handwritten mb-1">{c.title}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Concept {idx + 1}</p>
          </button>
        ))}
      </div>

      <HandwrittenCard bgColor="bg-white" className="min-h-[300px]">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500" key={activeConcept}>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <h2 className={`text-4xl font-black handwritten ${concepts[activeConcept].color} underline decoration-slate-200`}>
                {concepts[activeConcept].title}
              </h2>
              <p className="kalam text-lg leading-relaxed text-slate-800 font-bold italic">
                "{concepts[activeConcept].detail}"
              </p>
              <div className="p-4 bg-slate-900 text-white rounded-2xl sketch-border flex items-start space-x-4">
                 <Zap className="text-yellow-400 shrink-0" size={24} />
                 <div>
                    <h5 className="text-xs font-black uppercase text-slate-400">Real World Example</h5>
                    <p className="text-sm kalam text-slate-200">{concepts[activeConcept].example}</p>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-80 flex flex-col items-center justify-center p-6 bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl">
               {activeConcept === 0 && <DecompositionPartyVisual />}
               {activeConcept === 1 && <AbstractionVisual />}
               {activeConcept === 2 && <PatternVisual />}
               {activeConcept === 3 && <AlgorithmVisual />}
            </div>
          </div>
        </div>
      </HandwrittenCard>

      {/* Infographic Note for Decomposition */}
      {activeConcept === 0 && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <HandwrittenCard title="Handwritten Note: Why Decompose?" bgColor="bg-rose-50">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="kalam text-md leading-relaxed text-slate-800">
                  Imagine trying to build <b>YouTube</b> all at once. You'd go crazy! 🤯 
                  <br/><br/>
                  By <b>decomposing</b> it, we focus on tiny pieces:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border border-rose-200 rounded-full text-[10px] font-black text-rose-700 shadow-sm">Video Upload</span>
                  <span className="px-3 py-1 bg-white border border-rose-200 rounded-full text-[10px] font-black text-rose-700 shadow-sm">Comment Section</span>
                  <span className="px-3 py-1 bg-white border border-rose-200 rounded-full text-[10px] font-black text-rose-700 shadow-sm">Search Bar</span>
                  <span className="px-3 py-1 bg-white border border-rose-200 rounded-full text-[10px] font-black text-rose-700 shadow-sm">User Login</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-rose-200 flex flex-col items-center text-center">
                <Info size={32} className="text-rose-400 mb-2" />
                <h4 className="font-black text-xs uppercase text-slate-900 mb-2">Teacher's Insight</h4>
                <p className="text-xs kalam italic text-slate-600">
                  "In IBDP CS exams, if asked how to approach a large system, <b>ALWAYS</b> mention decomposition. It allows for <b>Parallel Development</b>—different teams working on different parts at the same time!"
                </p>
              </div>
            </div>
          </HandwrittenCard>
        </div>
      )}

      <HandwrittenCard title="Teacher's Pro Tip" bgColor="bg-yellow-50">
        <p className="kalam text-sm italic font-bold">
          "CT is not just for computers! You use Decomposition when you divide a large essay into paragraphs. You use Abstraction when you ignore the color of a car to calculate its velocity."
        </p>
      </HandwrittenCard>
    </div>
  );
};

// Simple visual components for the concepts
const DecompositionPartyVisual = () => (
  <div className="space-y-4 w-full">
    <div className="w-full p-2 bg-rose-600 border-2 border-rose-900 rounded-lg text-white font-black text-center shadow-lg relative">
      BIRTHDAY PARTY
      <div className="absolute -top-2 -right-2 text-yellow-400"><Users size={16}/></div>
    </div>
    
    <div className="flex justify-center -my-2">
      <div className="w-0.5 h-6 bg-slate-300"></div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="p-2 bg-white border-2 border-rose-300 rounded-xl flex flex-col items-center shadow-sm">
        <Cake size={16} className="text-rose-500 mb-1"/>
        <span className="text-[8px] font-black uppercase">Food & Cake</span>
      </div>
      <div className="p-2 bg-white border-2 border-rose-300 rounded-xl flex flex-col items-center shadow-sm">
        <MapPin size={16} className="text-rose-500 mb-1"/>
        <span className="text-[8px] font-black uppercase">Venue</span>
      </div>
      <div className="p-2 bg-white border-2 border-rose-300 rounded-xl flex flex-col items-center shadow-sm">
        <Users size={16} className="text-rose-500 mb-1"/>
        <span className="text-[8px] font-black uppercase">Guest List</span>
      </div>
      <div className="p-2 bg-white border-2 border-rose-300 rounded-xl flex flex-col items-center shadow-sm">
        <Music size={16} className="text-rose-500 mb-1"/>
        <span className="text-[8px] font-black uppercase">Entertainment</span>
      </div>
    </div>
    
    <div className="p-2 bg-rose-100/50 rounded-lg text-center">
       <p className="text-[7px] font-mono text-rose-800 italic uppercase">Result: 4 simple tasks instead of 1 giant stress!</p>
    </div>
  </div>
);

const AbstractionVisual = () => (
  <div className="relative w-full h-32 bg-indigo-100 rounded-xl overflow-hidden flex items-center justify-center border-2 border-indigo-200">
    <div className="absolute inset-0 opacity-10">
      {[...Array(20)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-indigo-900 rounded-full" style={{top: `${Math.random()*100}%`, left: `${Math.random()*100}%`}}></div>)}
    </div>
    <div className="z-10 bg-white p-3 rounded-lg shadow-xl border-2 border-indigo-600 font-black text-xs">ESSENTIAL INFO</div>
  </div>
);

const PatternVisual = () => (
  <div className="grid grid-cols-2 gap-2 w-full">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-10 bg-emerald-100 border-2 border-emerald-400 rounded flex items-center justify-center">
        <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
      </div>
    ))}
  </div>
);

const AlgorithmVisual = () => (
  <div className="space-y-1 w-full font-mono text-[8px] text-slate-600">
    <div>1. START</div>
    <div>2. INPUT DATA</div>
    <div>3. IF X {'&gt;'} 5 GOTO 5</div>
    <div>4. X = X + 1</div>
    <div>5. PRINT X</div>
    <div>6. END</div>
  </div>
);

export default B1ConceptsSection;