import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  AlertTriangle, Database, Info, Layers, Link2, Key, 
  Fingerprint, Shield, Zap, XCircle, Users, 
  Trash2, PlusCircle, Edit3, ShieldAlert, Scale, 
  Server, CheckSquare 
} from 'lucide-react';

const IntroSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 drop-shadow-sm">A3.1 Database Fundamentals</h1>
        <p className="text-2xl font-bold text-slate-600 italic">"The War Against Redundancy"</p>
      </div>

      {/* A3.1.1: Features Infographic */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-700"><Database /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">A3.1.1 Relational Architecture</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           <FeatureBox icon={Fingerprint} title="Primary Key (PK)" desc="A unique identifier for every record. It must be unique and NOT null." color="text-indigo-600" />
           <FeatureBox icon={Link2} title="Foreign Key (FK)" desc="A PK from another table used to link data and maintain relationships." color="text-emerald-600" />
           <FeatureBox icon={Key} title="Composite Key" desc="A PK made by combining 2 or more columns that together are unique." color="text-rose-600" />
           <FeatureBox icon={Layers} title="Entities" desc="The 'Objects' in our system (Students, Courses, Teachers)." color="text-amber-600" />
           <FeatureBox icon={Scale} title="Cardinality" desc="The nature of the link: 1:1, 1:Many, or Many:Many (Illegal!)." color="text-purple-600" />
           <FeatureBox icon={Shield} title="Data Integrity" desc="Rules that ensure data is accurate, consistent, and safe." color="text-blue-600" />
        </div>
      </section>

      {/* Anomalies Infographic */}
      <section className="space-y-8 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-rose-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><ShieldAlert /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">The Flat File Disaster</h2>
        </div>

        <HandwrittenCard bgColor="bg-rose-50" className="border-4 border-rose-900 shadow-2xl">
          <p className="text-xl mb-10 font-bold text-slate-800 text-center leading-relaxed">
            "Flat files (CSVs/Excel) store everything in one big mess. <br/> This causes <span className="text-rose-600 underline">three fatal anomalies</span>:"
          </p>
          
          <div className="grid md:grid-cols-3 gap-10">
            <AnomalyVisual 
              icon={PlusCircle} 
              title="Insert Anomaly" 
              desc="You can't add data for a new ENTITY until you have related data." 
              scenario="Can't add a 'Physics' course until a student signs up for it!" 
              color="border-rose-300 bg-white"
            />
            <AnomalyVisual 
              icon={Edit3} 
              title="Update Anomaly" 
              desc="Changing one piece of data requires thousands of manual edits." 
              scenario="Change a Student's address, and you must find every row they appear in!" 
              color="border-amber-300 bg-white"
            />
            <AnomalyVisual 
              icon={Trash2} 
              title="Delete Anomaly" 
              desc="Deleting one record accidentally wipes out essential related info." 
              scenario="Delete the last student in 'French', and the French Dept data vanishes too!" 
              color="border-indigo-300 bg-white"
            />
          </div>
        </HandwrittenCard>
      </section>

      {/* Benefits & Limitations */}
      <div className="grid lg:grid-cols-2 gap-10">
        <HandwrittenCard title="Benefits of Relational DBs" bgColor="bg-emerald-50" className="border-4 border-emerald-900">
           <ul className="space-y-4 pt-4">
              <li className="flex items-center space-x-3 text-sm kalam font-bold text-slate-700">
                 <Zap className="text-yellow-500 shrink-0" size={18}/> <span><b>Reduced Redundancy:</b> Data is stored only once.</span>
              </li>
              <li className="flex items-center space-x-3 text-sm kalam font-bold text-slate-700">
                 <Zap className="text-yellow-500 shrink-0" size={18}/> <span><b>Flexibility:</b> Easy to add new tables without breaking old ones.</span>
              </li>
              <li className="flex items-center space-x-3 text-sm kalam font-bold text-slate-700">
                 <Zap className="text-yellow-500 shrink-0" size={18}/> <span><b>Security:</b> Control access to specific tables (DCL).</span>
              </li>
           </ul>
        </HandwrittenCard>

        <HandwrittenCard title="Limitations & Realities" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 shadow-2xl">
           <p className="text-xs italic text-slate-400 mb-6 leading-relaxed">
             "Relational databases aren't perfect. As data grows to billions of rows, 'Joins' become extremely computationally expensive."
           </p>
           <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-4">
              <AlertTriangle className="text-yellow-400 shrink-0" size={24}/>
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                Limit: High initial design complexity. Requires a skilled Architect!
              </p>
           </div>
        </HandwrittenCard>
      </div>
    </div>
  );
};

const FeatureBox = ({ icon: Icon, title, desc, color }: any) => (
  <div className="p-6 bg-white sketch-border shadow-xl hover:-translate-y-2 transition-all group">
    <div className={`p-3 rounded-xl bg-slate-50 ${color} mb-4 inline-block group-hover:scale-110 transition-transform`}>
      <Icon size={24}/>
    </div>
    <h4 className="font-black handwritten text-xl mb-2 text-slate-900">{title}</h4>
    <p className="text-xs font-bold text-slate-500 leading-relaxed italic">"{desc}"</p>
  </div>
);

const AnomalyVisual = ({ icon: Icon, title, desc, scenario, color }: any) => (
  <div className={`p-6 border-4 rounded-[2.5rem] sketch-border shadow-lg ${color} flex flex-col`}>
    <Icon className="text-rose-600 mb-4" size={32} />
    <h5 className="font-black text-lg handwritten text-slate-900 mb-2 uppercase">{title}</h5>
    <p className="text-[11px] font-bold text-slate-600 mb-4 leading-tight">{desc}</p>
    <div className="mt-auto pt-4 border-t border-slate-100">
       <span className="text-[9px] font-black uppercase text-rose-400 block mb-1">Scenario:</span>
       <p className="text-[10px] italic text-slate-400">{scenario}</p>
    </div>
  </div>
);

export default IntroSection;
