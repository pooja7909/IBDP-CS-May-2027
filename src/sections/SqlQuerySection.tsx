import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Search, Calculator, Table, BarChart, ChevronRight, ShieldAlert, ArrowRight, Layers, LayoutList } from 'lucide-react';

const SqlQuerySection: React.FC = () => {
  const [activeJoin, setActiveJoin] = useState('inner');

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tighter">A3.3.2 Query Masterclass</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Gluing and Calculating Your Data"</p>
      </div>

      <HandwrittenCard title="SQL Joins: The Venn Reality" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden">
        <div className="flex flex-wrap gap-3 mb-8 border-b-2 border-slate-100 pb-4">
          {['inner', 'left', 'right'].map(j => (
            <button key={j} onClick={() => setActiveJoin(j)} className={`px-4 py-2 rounded-full font-black text-[10px] uppercase transition-all ${activeJoin === j ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>{j} JOIN</button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <pre className="p-6 bg-slate-900 text-indigo-300 rounded-3xl font-mono text-xs border-b-8 border-indigo-800 shadow-xl">
{`SELECT Students.Name, Grades.Mark\nFROM Students\n${activeJoin.toUpperCase()} JOIN Grades\nON Students.ID = Grades.SID;`}
            </pre>
            <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
              <p className="text-xs font-bold kalam italic text-slate-700">
                {activeJoin === 'inner' && "Matches only! Shows rows where IDs exist in BOTH tables."}
                {activeJoin === 'left' && "Student focus! Shows all Students, even those with no grades (NULL)."}
                {activeJoin === 'right' && "Grade focus! Shows all Grades, even if the student was deleted (NULL)."}
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 relative">
            <h5 className="absolute -top-3 left-6 bg-slate-900 text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">Expected Output</h5>
            <table className="w-full text-[10px] font-mono bg-white border-2 border-slate-900 rounded-lg overflow-hidden">
              <thead className="bg-slate-100"><tr><th className="p-2 border-r border-slate-300">Name</th><th className="p-2">Mark</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="p-2 border-r border-slate-300">Alice</td><td className="p-2">85</td></tr>
                {activeJoin === 'left' && <tr className="bg-rose-50 text-rose-600"><td className="p-2 border-r border-slate-300">Bob (No Grade)</td><td className="p-2 italic">NULL</td></tr>}
                {activeJoin === 'right' && <tr className="bg-rose-50 text-rose-600"><td className="p-2 border-r border-slate-300 italic">NULL</td><td className="p-2">99 (No Name)</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </HandwrittenCard>

      <section className="space-y-8 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4"><Calculator className="text-purple-600" size={32}/><h2 className="text-4xl font-black handwritten text-slate-900">A3.3.4 Aggregate Functions (HL)</h2></div>
          <div className="bg-purple-900 text-white px-6 py-2 rounded-full font-black text-xs animate-pulse">HL CORE ONLY</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AggBox func="COUNT(*)" desc="Returns number of rows." ex="SELECT COUNT(*) FROM Students;" result="150" />
          <AggBox func="SUM(Price)" desc="Calculates total numeric value." ex="SELECT SUM(Price) FROM Orders;" result="$1,200" />
          <AggBox func="AVG(Age)" desc="Finds the mathematical mean." ex="SELECT AVG(Age) FROM Teachers;" result="42.5" />
          <AggBox func="MAX/MIN" desc="Highest or lowest value." ex="SELECT MAX(Grade) FROM Exams;" result="98" />
        </div>
      </section>
    </div>
  );
};

const AggBox = ({ func, desc, ex, result }: any) => (
  <div className="p-6 bg-white sketch-border shadow-xl group hover:shadow-2xl transition-all border-2 border-slate-900 flex flex-col">
    <div className="text-lg font-black text-purple-700 mb-2 font-mono">{func}</div>
    <p className="text-[10px] kalam font-bold text-slate-500 mb-4">{desc}</p>
    <div className="bg-slate-50 p-2 rounded text-[8px] font-mono text-slate-400 mb-4 flex-grow italic">{ex}</div>
    <div className="mt-auto border-t pt-2 flex justify-between items-center"><span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Output</span><span className="text-xl font-black text-slate-900">{result}</span></div>
  </div>
);

export default SqlQuerySection;