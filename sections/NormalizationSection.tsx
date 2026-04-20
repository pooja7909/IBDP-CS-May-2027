import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  CheckCircle2, Database, AlertCircle, 
  ArrowRight, Trash2, MousePointer2, Trophy,
  Key as KeyIcon, Table, ArrowDownCircle, RotateCcw,
  Zap, HelpCircle, Link
} from 'lucide-react';

const NormalizationSection: React.FC = () => {
  const [table1, setTable1] = useState(['StudentID', 'StudentName', 'CourseID', 'CourseInstructor']);
  const [table2, setTable2] = useState<string[]>([]);
  const [isResolved, setIsResolved] = useState(false);

  const moveField = (field: string) => {
    if (field === 'StudentID') return; 
    if (table1.includes(field)) {
      if (field === 'CourseID') {
        if (!table2.includes('CourseID')) setTable2(prev => [...prev, 'CourseID']);
      } else {
        setTable1(prev => prev.filter(f => f !== field));
        setTable2(prev => [...prev, field]);
      }
    } else {
      if (field === 'CourseID') setTable2(prev => prev.filter(f => f !== field));
      else {
        setTable2(prev => prev.filter(f => f !== field));
        setTable1(prev => [...prev, field]);
      }
    }
    setIsResolved(false);
  };

  const checkSolution = () => {
    // 3NF check: CourseInstructor (non-key) depends on CourseID (non-key).
    // Correct solution: Table1(StudentID, StudentName, CourseID FK), Table2(CourseID PK, CourseInstructor)
    const t1Has = (f: string) => table1.includes(f);
    const t2Has = (f: string) => table2.includes(f);
    
    if (t1Has('CourseID') && !t1Has('CourseInstructor') && t2Has('CourseID') && t2Has('CourseInstructor')) {
      setIsResolved(true);
    } else {
      alert("Wait! Instructor depends on CourseID, not StudentID. Move Instructor to Table 2, but keep CourseID in Table 1 as a link (FK).");
    }
  };

  return (
    <div className="space-y-24 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">A3.2.5 Normalization Mastery</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Resolving Data Dependencies Step-by-Step"</p>
      </div>

      <section className="grid md:grid-cols-2 gap-8">
        <HandwrittenCard title="Partial Dependency (Rule for 2NF)" bgColor="bg-blue-50" className="border-4 border-blue-900">
          <Zap className="text-blue-600 mb-4" size={32} />
          <p className="kalam text-lg font-bold text-slate-900 leading-tight">"This happens with <b>Composite Keys</b>. An attribute depends on only ONE part of the key."</p>
          <div className="mt-4 p-3 bg-white border-2 border-slate-900 rounded-xl font-mono text-[10px]">
            PK: (<u>StudentID</u>, <u>CourseID</u>)<br/>
            Attr: StudentName <span className="text-rose-600 font-black">← WRONG!</span><br/>
            Name only needs StudentID.
          </div>
        </HandwrittenCard>
        <HandwrittenCard title="Transitive Dependency (Rule for 3NF)" bgColor="bg-emerald-50" className="border-4 border-emerald-900">
          <Link className="text-emerald-600 mb-4" size={32} />
          <p className="kalam text-lg font-bold text-slate-900 leading-tight">"When a non-key field depends on ANOTHER non-key field."</p>
          <div className="mt-4 p-3 bg-white border-2 border-slate-900 rounded-xl font-mono text-[10px]">
            PK: StudentID<br/>
            Attr: CourseID → CourseInstructor<br/>
            <span className="text-rose-600 font-black">Issue:</span> Instructor relies on Course, not the Student.
          </div>
        </HandwrittenCard>
      </section>

      <section className="space-y-12 pt-16">
        <div className="flex items-center space-x-6">
          <div className="p-5 bg-indigo-600 text-white rounded-[2rem] shadow-2xl rotate-[-2deg] border-slate-900 border-4"><MousePointer2 size={32} /></div>
          <div>
            <h2 className="text-5xl font-black handwritten text-slate-900">Interactive 3NF Workshop</h2>
            <p className="text-indigo-600 font-black uppercase text-xs tracking-[0.3em]">Break the Transitive Chain</p>
          </div>
        </div>

        <HandwrittenCard bgColor="bg-slate-50" className="border-4 border-slate-900 relative shadow-2xl overflow-hidden">
           <div className="mb-12">
             <p className="kalam text-xl font-bold leading-relaxed text-slate-700">
               Target Schema: <b>STUDENTS(<u>StudentID</u>, StudentName, CourseID, CourseInstructor)</b>
             </p>
             <div className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-300 rounded-2xl flex items-center">
               <HelpCircle className="text-yellow-600 mr-2" />
               <p className="text-[11px] font-bold kalam italic">Mission: The Instructor depends on the CourseID. Separate them into two tables while maintaining the relationship link.</p>
             </div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
             <div className="p-8 bg-white sketch-border min-h-[300px] border-4 border-slate-900">
               <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest mb-6 border-b-2 pb-2">TABLE 1: STUDENTS</h4>
               <div className="flex flex-wrap gap-3">
                 {table1.map(f => (
                   <button key={f} onClick={() => moveField(f)} className={`px-4 py-2 border-2 rounded-xl text-[10px] font-black transition-all ${f === 'StudentID' ? 'bg-indigo-50 border-indigo-400 opacity-50' : 'bg-white border-slate-900 hover:bg-indigo-50'}`}>
                     {f === 'StudentID' && <KeyIcon size={12} className="inline mr-1 text-yellow-600"/>}{f}
                   </button>
                 ))}
               </div>
             </div>
             <div className="p-8 bg-white sketch-border min-h-[300px] border-4 border-dashed border-indigo-300 bg-indigo-50/20">
               <h4 className="font-black text-xs text-indigo-400 uppercase tracking-widest mb-6 border-b-2 pb-2">TABLE 2: COURSES</h4>
               <div className="flex flex-wrap gap-3">
                 {table2.map(f => (
                   <button key={f} onClick={() => moveField(f)} className="px-4 py-2 bg-indigo-600 text-white border-2 border-indigo-800 rounded-xl text-[10px] font-black animate-in zoom-in-95">
                     {f} <Trash2 size={12} className="inline ml-1"/>
                   </button>
                 ))}
               </div>
             </div>
           </div>

           <div className="mt-16 flex flex-col items-center">
             {!isResolved ? (
               <button onClick={checkSolution} className="px-16 py-4 bg-slate-900 text-white rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">VALIDATE DATABASE ARCHITECTURE</button>
             ) : (
               <div className="p-8 bg-emerald-600 text-white rounded-[3rem] sketch-border shadow-2xl flex items-center space-x-8 animate-in zoom-in border-4 border-emerald-500">
                 <Trophy size={60} className="text-yellow-400 animate-bounce" />
                 <div>
                    <h4 className="text-3xl font-black handwritten">3NF Verified!</h4>
                    <p className="text-lg kalam font-bold">"Instructor is now separate but linked via CourseID FK."</p>
                 </div>
                 <button onClick={() => {setTable1(['StudentID', 'StudentName', 'CourseID', 'CourseInstructor']); setTable2([]); setIsResolved(false);}} className="p-4 bg-white/20 rounded-full hover:bg-white/40"><RotateCcw size={32}/></button>
               </div>
             )}
           </div>
        </HandwrittenCard>
      </section>
    </div>
  );
};

export default NormalizationSection;