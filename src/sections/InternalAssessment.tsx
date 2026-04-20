
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Briefcase, Video, FileText, CheckSquare, MessageCircle, PenTool, Search, Zap, Code, ShieldCheck, HelpCircle, MessageSquareText } from 'lucide-react';

const InternalAssessment: React.FC = () => {
  const [activeCriteria, setActiveCriteria] = useState('A');

  const criteria = [
    { 
      id: 'A', 
      title: 'Problem Specification', 
      marks: 4, 
      words: '300 words',
      desc: 'Define the problem and its requirements.',
      tasks: ["Outline a real-world scenario", "State measurable success criteria", "Explain the computational context"],
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'B', 
      title: 'Planning', 
      marks: 4, 
      words: '150 words',
      desc: 'Decompose the problem into components.',
      tasks: ["Construct a reasonable decomposition", "Provide a chronology/schedule", "Include research on code libraries"],
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 'C', 
      title: 'System Overview', 
      marks: 6, 
      words: '150 words',
      desc: 'The technical blueprint.',
      tasks: ["Construct a complete system model", "Outline key algorithms (Flowcharts/Pseudocode)", "Define a testing strategy"],
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    { 
      id: 'D', 
      title: 'Development', 
      marks: 12, 
      words: '1000 words',
      desc: 'The actual coding and product.',
      tasks: ["Fully functional coded product", "Explain complex techniques used", "Justify structure and design choices"],
      icon: Code,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    { 
      id: 'E', 
      title: 'Evaluation', 
      marks: 4, 
      words: '400 words',
      desc: 'Critique your own work.',
      tasks: ["Evaluate against success criteria", "Justify future improvements", "Incorporate user feedback"],
      icon: MessageCircle,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const current = criteria.find(c => c.id === activeCriteria)!;

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">IA Navigator</h1>
        <p className="text-xl kalam text-slate-600 italic mb-6">"Criteria A to E: Your Road to the Computational Solution"</p>
        
        {/* New "Speak to Ms Arora" Note */}
        <div className="flex justify-center">
          <div className="bg-yellow-200 px-6 py-2 sketch-border -rotate-1 shadow-md hover:rotate-0 transition-transform cursor-pointer group">
            <p className="handwritten text-xl font-bold text-slate-900 flex items-center">
              <MessageSquareText size={20} className="mr-2 text-slate-700 group-hover:animate-bounce" />
              Speak to Ms Arora for 1-on-1 guidance!
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* IA Checklist Card */}
        <HandwrittenCard title="The Submission Package" bgColor="bg-slate-900" className="text-white">
          <ul className="space-y-4 mt-4">
            <li className="flex items-center space-x-3 text-xs">
              <div className="p-2 bg-indigo-600 rounded-lg"><FileText size={18}/></div>
              <span><b>Documentation:</b> PDF (Max 2,000 words)</span>
            </li>
            <li className="flex items-center space-x-3 text-xs">
              <div className="p-2 bg-pink-600 rounded-lg"><Video size={18}/></div>
              <span><b>Video:</b> MP4/AVI (Max 5 mins)</span>
            </li>
            <li className="flex items-center space-x-3 text-xs">
              <div className="p-2 bg-emerald-600 rounded-lg"><CheckSquare size={18}/></div>
              <span><b>Appendices:</b> Full Source Code</span>
            </li>
          </ul>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] kalam text-slate-400 italic">
            "Remember: The video must demonstrate the FULL functionality and your testing strategy in action!"
          </div>
        </HandwrittenCard>

        {/* Detailed Criteria Explorer */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex space-x-2 bg-slate-200 p-1.5 rounded-2xl sketch-border overflow-x-auto">
            {criteria.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveCriteria(c.id)}
                className={`flex-1 min-w-[60px] py-2 rounded-xl font-black text-xs transition-all ${activeCriteria === c.id ? 'bg-slate-900 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Crit {c.id}
              </button>
            ))}
          </div>

          <div className={`p-8 sketch-border ${current.bgColor} min-h-[400px] flex flex-col relative overflow-hidden transition-colors duration-500`}>
            <div className="absolute top-4 right-4 opacity-10 rotate-12">
              <current.icon size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-3xl font-black handwritten ${current.color}`}>Criterion {current.id}: {current.title}</h3>
                <div className="flex space-x-2">
                  <span className="bg-white/80 px-2 py-1 rounded text-[10px] font-black border border-slate-200">{current.marks} Marks</span>
                  <span className="bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-black">{current.words}</span>
                </div>
              </div>
              <p className="kalam text-slate-600 mb-8 italic">{current.desc}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Key Requirements:</h4>
                  {current.tasks.map((t, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl sketch-border shadow-sm">
                      <div className={`w-2 h-2 rounded-full ${current.color.replace('text', 'bg')}`}/>
                      <span className="text-[11px] font-bold text-slate-800">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-white/40 rounded-3xl border-2 border-dashed border-slate-300">
                  <h4 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center">
                    <PenTool size={14} className="mr-2"/> Teacher's Pro Tip
                  </h4>
                  <p className="text-[11px] kalam leading-relaxed text-slate-700 italic">
                    {current.id === 'A' && "Don't just say 'I want to build a game'. Explain WHY the client needs it and what the specific hardware limits are."}
                    {current.id === 'B' && "GANTT or AGILE charts are expected here. Show the examiner that you can manage your time properly!"}
                    {current.id === 'C' && "The examiner should be able to rebuild your project from these diagrams. Be precise!"}
                    {current.id === 'D' && "This is 40% of the IA marks! Highlight loops, classes, and data structures. Comment your code heavily."}
                    {current.id === 'E' && "Be honest. If a feature failed, explain why and how you'd fix it in Version 2.0."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IA Idea Generator */}
      <HandwrittenCard title="Stuck for an Idea?" bgColor="bg-white" className="border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <p className="kalam text-slate-700 leading-relaxed font-bold">
              "The best IAs solve a small problem for a specific person. <br/>Think about: <span className="text-pink-600 underline">Teachers, Parents, Small Business Owners, or School Clubs.</span>"
            </p>
            <div className="flex flex-wrap gap-2">
              {['Inventory Tracker', 'Sports Coach Assistant', 'Library Booking System', 'Revision Flashcard OOP'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold border border-slate-200">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
             <div className="w-48 h-48 bg-indigo-50 sketch-border flex flex-col items-center justify-center text-center p-4 transform rotate-3">
                <HelpCircle size={40} className="text-indigo-400 mb-2"/>
                <p className="text-[10px] font-black uppercase text-indigo-900">Speak to Ms Arora!</p>
                <p className="text-[8px] kalam text-slate-500 italic mt-1">Book a consultation to finalize your Criteria A draft.</p>
             </div>
          </div>
        </div>
      </HandwrittenCard>
    </div>
  );
};

export default InternalAssessment;
