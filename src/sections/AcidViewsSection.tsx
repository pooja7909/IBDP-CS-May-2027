import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Shield, Eye, Lock, Zap, ShieldAlert, Server, CheckCircle2, AlertTriangle } from 'lucide-react';

const AcidViewsSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <div className="mb-4 inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-full font-black text-xs shadow-xl uppercase tracking-widest animate-pulse"><ShieldAlert size={14} /><span>Higher Level Depth</span></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tighter">ACID & Database Views</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Engineering Resilience at Scale"</p>
      </div>

      <HandwrittenCard title="A3.3.5 Database Views (Virtual Tables)" bgColor="bg-white" className="border-4 border-purple-900 shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="kalam text-lg text-slate-800 leading-relaxed font-bold">"A <b>View</b> is a virtual lens. It looks like a table but doesn't store data. It recalculates every time you query it!"</p>
            <div className="space-y-4">
              <ViewBenefit icon={Lock} title="Security" desc="Hide sensitive columns like 'Salary' from simple users." />
              <ViewBenefit icon={Zap} title="Simplicity" desc="Save complex Join logic so users don't have to write it again." />
            </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl text-indigo-300 font-mono text-sm border-b-8 border-purple-700 shadow-xl relative">
            <div className="absolute top-2 right-4 text-[8px] uppercase tracking-widest text-slate-500">Virtual Logic</div>
<pre>{`CREATE VIEW PublicList AS\nSELECT Name, Grade\nFROM Students\nWHERE IsActive = True;`}</pre>
          </div>
        </div>
      </HandwrittenCard>

      <section className="bg-slate-900 text-white p-12 rounded-[40px] sketch-border shadow-2xl relative overflow-hidden border-4 border-purple-600">
        <h2 className="text-4xl font-black handwritten text-center mb-12 text-yellow-400">A3.3.6 Reliable Transactions: ACID (HL)</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AcidCard letter="A" title="Atomicity" desc="'All or Nothing'. If one part fails, the whole thing undoes (Rollback)." />
          <AcidCard letter="C" title="Consistency" desc="Ensures the DB stays valid according to rules (Types, FKs)." />
          <AcidCard letter="I" title="Isolation" desc="Transactions don't collide. They feel like they're the only ones running." />
          <AcidCard letter="D" title="Durability" desc="Once committed, data stays saved even if power goes out!" />
        </div>
      </section>
    </div>
  );
};

const ViewBenefit = ({ icon: Icon, title, desc }: any) => (
  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-2xl border border-purple-100"><Icon className="text-purple-600 shrink-0" size={20}/><div className="flex flex-col"><span className="font-black text-xs uppercase text-purple-900">{title}</span><p className="text-[10px] kalam text-slate-600 font-bold leading-tight">{desc}</p></div></div>
);

const AcidCard = ({ letter, title, desc }: any) => (
  <div className="p-6 border-2 border-slate-700 rounded-3xl hover:bg-white/5 transition-all group">
    <div className="text-5xl font-black text-purple-500 mb-4 group-hover:scale-110 transition-transform origin-left">{letter}</div>
    <h4 className="font-black text-sm mb-2 text-white uppercase">{title}</h4>
    <p className="text-[10px] kalam text-slate-400 leading-relaxed italic">"{desc}"</p>
  </div>
);

export default AcidViewsSection;