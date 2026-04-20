
import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Section } from '../types';
import { BookOpen, Zap, Layers, Clock, CheckCircle2, ChevronRight, Binary, Network, Database, Cpu, Search, FlaskConical, Presentation, ShieldAlert } from 'lucide-react';

interface CourseOverviewProps {
  onNavigate: (section: Section) => void;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">IBDP CS Roadmap 2027</h1>
        <p className="text-xl kalam text-slate-600 italic">"Mapping your journey through the full 240-hour curriculum"</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Theme A */}
        <HandwrittenCard title="Theme A: Concepts" bgColor="bg-blue-50" className="border-blue-200">
          <p className="kalam text-sm mb-6 font-bold text-slate-700 italic">"Theoretical Foundations of CS"</p>
          <div className="space-y-4">
             <TopicRow 
                id="A1" 
                title="Computer fundamentals" 
                hours="11/18" 
                icon={Cpu} 
                color="bg-blue-100 text-blue-700" 
                isPartialHL={true} 
                status="Ready"
                onClick={() => onNavigate(Section.A1_HARDWARE)}
             />
             <TopicRow 
                id="A2" 
                title="Networks" 
                hours="11/18" 
                icon={Network} 
                color="bg-indigo-100 text-indigo-700" 
                isPartialHL={true} 
                status="Ready"
                onClick={() => onNavigate(Section.A2_BASICS)}
             />
             <TopicRow 
                id="A3" 
                title="Databases" 
                hours="11/18" 
                icon={Database} 
                color="bg-pink-100 text-pink-700" 
                status="Mastered" 
                isPartialHL={true}
                onClick={() => onNavigate(Section.A3_HOME)}
             />
             <TopicRow 
                id="A4" 
                title="Machine learning" 
                hours="5/18" 
                icon={Binary} 
                color="bg-purple-100 text-purple-700" 
                isPartialHL={true} 
                status="New Spec"
                onClick={() => onNavigate(Section.A4_ML_TYPES)}
             />
          </div>
        </HandwrittenCard>

        {/* Theme B */}
        <HandwrittenCard title="Theme B: Problem-Solving" bgColor="bg-emerald-50" className="border-emerald-200">
          <p className="kalam text-sm mb-6 font-bold text-slate-700 italic">"Computational Thinking & Programming"</p>
          <div className="space-y-4">
             <TopicRow 
                id="B1" 
                title="Computational thinking" 
                hours="5/5" 
                icon={Zap} 
                color="bg-emerald-100 text-emerald-700" 
                onClick={() => onNavigate(Section.B1_SPEC)}
             />
             <TopicRow 
                id="B2" 
                title="Programming" 
                hours="40/42" 
                icon={CodeRowIcon} 
                color="bg-teal-100 text-teal-700" 
                status="Ready"
                onClick={() => onNavigate(Section.B2_BASICS)}
             />
             <TopicRow 
                id="B3" 
                title="Object-oriented programming" 
                hours="7/23" 
                icon={Layers} 
                color="bg-cyan-100 text-cyan-700" 
                status="Ready"
                isPartialHL={true} 
                onClick={() => onNavigate(Section.B3_CONCEPTS)}
             />
             <TopicRow 
                id="B4" 
                title="Abstract data types" 
                hours="- / 23" 
                icon={Binary} 
                color="bg-purple-900 text-white" 
                isHLOnly={true} 
                status="HL Ready"
                onClick={() => onNavigate(Section.B4_HL_ADT)}
             />
          </div>
        </HandwrittenCard>
      </div>

      <HandwrittenCard title="Teacher's Guide to SL vs HL" bgColor="bg-slate-900" className="text-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h4 className="text-2xl font-black handwritten text-yellow-400">Understanding the Depth</h4>
            <p className="kalam text-sm text-slate-400 italic">"The 2027 curriculum is designed for modularity. Standard Level students cover the Core, while Higher Level students explore the technical extremes."</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-xs font-black uppercase text-pink-400">Topic A3 HL Depth:</span>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono">SQL Aggregates, Database Views, ACID Transactions, and Data Warehousing.</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-xs font-black uppercase text-purple-400">B4 HL Mastery:</span>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono">Linked Lists (Singly/Doubly), Binary Search Trees, and Sets as ADTs.</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-400 text-slate-900 p-6 rounded-3xl sketch-border rotate-2 flex flex-col items-center text-center">
            <ShieldAlert size={32} className="mb-2" />
            <h5 className="font-black text-xs uppercase">Exam Warning</h5>
            <p className="text-[10px] kalam font-bold">SL Students: Do not study ADTs! <br/> HL Students: ADTs are 23% <br/> of your HL-specific time.</p>
          </div>
        </div>
      </HandwrittenCard>

      <HandwrittenCard title="Teaching Hours Overview" bgColor="bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 sketch-border bg-slate-900 text-white rounded-3xl">
               <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Standard Level (SL)</p>
                 <h4 className="text-4xl font-black handwritten text-yellow-400">150 Hours</h4>
               </div>
               <Clock className="text-slate-700" size={48}/>
            </div>
            <div className="flex items-center justify-between p-6 sketch-border bg-indigo-900 text-white rounded-3xl">
               <div>
                 <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest">Total Higher Level (HL)</p>
                 <h4 className="text-4xl font-black handwritten text-pink-400">240 Hours</h4>
               </div>
               <Clock className="text-indigo-800" size={48}/>
            </div>
          </div>
          <div className="p-8 bg-yellow-50 sketch-border h-full flex flex-col justify-center">
             <h4 className="font-black text-xl mb-4 flex items-center"><BookOpen className="mr-2 text-yellow-600"/> Teaching Allocation</h4>
             <p className="text-sm kalam leading-relaxed text-slate-800 font-bold">
               Teaching hours are strictly allocated across the two-year program. 
               <b> Theme B (Programming) </b> receives the largest chunk of time, while <b> Themes A1-A4 </b> provide the theoretical depth. 
               The <b> Internal Assessment </b> is a major 35-hour practical project.
             </p>
          </div>
        </div>
      </HandwrittenCard>
    </div>
  );
};

const TopicRow = ({ id, title, hours, icon: Icon, color, status, onClick, isPartialHL, isHLOnly }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-3 bg-white sketch-border transition-all group ${onClick ? 'cursor-pointer hover:shadow-xl hover:border-slate-900 transform hover:-translate-y-1' : 'opacity-80'}`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${color} transition-transform group-hover:scale-110`}>
        <Icon size={18}/>
      </div>
      <div>
        <h5 className="font-black text-xs text-slate-900 flex items-center">
          {id ? `${id}: ` : ''}{title}
          {status && <span className="ml-2 px-1.5 py-0.5 bg-pink-100 text-pink-600 text-[8px] font-black rounded uppercase animate-pulse">{status}</span>}
          {isHLOnly && <span className="ml-2 px-1.5 py-0.5 bg-purple-600 text-white text-[8px] font-black rounded uppercase">HL ONLY</span>}
          {isPartialHL && !isHLOnly && <span className="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-600 text-[8px] font-black rounded border border-purple-200 uppercase">SL + HL Depth</span>}
        </h5>
        <p className="text-[9px] font-mono text-slate-400">{hours} SL/HL Hours</p>
      </div>
    </div>
    <div className="flex items-center">
      {onClick && <span className="mr-2 text-[8px] font-black uppercase text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Open</span>}
      <ChevronRight size={14} className={`${onClick ? 'text-indigo-500' : 'text-slate-200'} group-hover:translate-x-1 transition-transform`}/>
    </div>
  </div>
);

const CodeRowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export default CourseOverview;
