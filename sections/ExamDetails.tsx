
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Award, Timer, Target, FileText, CheckCircle, Info, ChevronRight, LayoutList } from 'lucide-react';

const ExamDetails: React.FC = () => {
  const [level, setLevel] = useState<'SL' | 'HL'>('SL');

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Assessment Outline</h1>
        <div className="flex justify-center mt-6">
          <div className="inline-flex bg-slate-200 p-1 rounded-2xl sketch-border">
            <button 
              onClick={() => setLevel('SL')} 
              className={`px-10 py-2 rounded-xl font-black text-sm transition-all ${level === 'SL' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500'}`}
            >
              Standard (SL)
            </button>
            <button 
              onClick={() => setLevel('HL')} 
              className={`px-10 py-2 rounded-xl font-black text-sm transition-all ${level === 'HL' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500'}`}
            >
              Higher (HL)
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <AssessmentCard 
          title="Paper 1" 
          weight={level === 'SL' ? '35%' : '40%'}
          time={level === 'SL' ? '1h 15m' : '2h'}
          marks={level === 'SL' ? '50' : '80'}
          color={level === 'SL' ? 'bg-blue-50 border-blue-200' : 'bg-indigo-50 border-indigo-200'}
          details={[
            "Section A: Theme A Concepts",
            "Section B: Pre-seen Case Study",
            "No programming code required",
            level === 'HL' ? "Includes additional HL-only topics" : "Core topics only"
          ]}
        />
        <AssessmentCard 
          title="Paper 2" 
          weight={level === 'SL' ? '35%' : '40%'}
          time={level === 'SL' ? '1h 15m' : '2h'}
          marks={level === 'SL' ? '50' : '80'}
          color={level === 'SL' ? 'bg-emerald-50 border-emerald-200' : 'bg-cyan-50 border-cyan-200'}
          details={[
            "Focus: Theme B Problem-Solving",
            "Structured coding tasks (Java/Python)",
            "Algorithmic Thinking focus",
            level === 'HL' ? "Advanced ADTs & OOP tasks" : "Foundational programming"
          ]}
        />
        <AssessmentCard 
          title="Internal Assessment" 
          weight={level === 'SL' ? '30%' : '20%'}
          time="35+ Hours"
          marks="30"
          color="bg-pink-50 border-pink-200"
          details={[
            "The Computational Solution",
            "Video demonstration required",
            "Documented design process",
            "Internally assessed, Externally moderated"
          ]}
        />
      </div>

      <HandwrittenCard title="Teacher's Key Strategy" bgColor="bg-slate-900" className="text-white">
        <div className="grid md:grid-cols-2 gap-10 p-4">
           <div className="space-y-4">
              <h4 className="text-yellow-400 font-black text-xl flex items-center underline decoration-slate-700 decoration-4 underline-offset-8">
                <Target className="mr-2" /> Marking Balance
              </h4>
              <p className="text-sm kalam text-slate-300">
                Notice the weightings. For SL students, the <b>IA (30%)</b> is a massive safety net. For HL, the <b>Final Exams (80% total)</b> carry the most weight. 
              </p>
           </div>
           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h5 className="text-pink-400 font-black mb-3 flex items-center"><Info size={16} className="mr-2"/> Essential Note</h5>
              <p className="text-[10px] font-mono text-slate-400 leading-relaxed uppercase tracking-widest">
                /* Paper 1 Case Study is released 12 months prior to exams. Research and guest speakers are recommended for this section to maximize marks! */
              </p>
           </div>
        </div>
      </HandwrittenCard>
    </div>
  );
};

const AssessmentCard = ({ title, weight, time, marks, color, details }: any) => (
  <div className={`p-8 sketch-border ${color} flex flex-col shadow-lg transform transition-all hover:-translate-y-2`}>
    <div className="flex justify-between items-start mb-6">
      <h3 className="text-3xl font-black handwritten text-slate-900">{title}</h3>
      <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black shadow-md">{weight}</span>
    </div>
    
    <div className="flex space-x-4 mb-8">
      <div className="flex items-center text-xs font-bold text-slate-500">
        <Timer size={14} className="mr-1"/> {time}
      </div>
      <div className="flex items-center text-xs font-bold text-slate-500">
        <LayoutList size={14} className="mr-1"/> {marks} Marks
      </div>
    </div>

    <div className="space-y-3 flex-grow">
      {details.map((d: string, i: number) => (
        <div key={i} className="flex items-start text-[11px] kalam font-bold text-slate-700">
          <CheckCircle size={12} className="mr-2 mt-1 text-slate-400 shrink-0"/>
          {d}
        </div>
      ))}
    </div>
  </div>
);

export default ExamDetails;
