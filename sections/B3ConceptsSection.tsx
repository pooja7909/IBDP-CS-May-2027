
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Layers, Shield, Eye, Shapes, Zap, Info, Target, Search, PlusCircle, MinusCircle, Lock, Unlock, ShieldCheck, Heart, ArrowDown, Cpu, Box, User, Scale, AlertCircle } from 'lucide-react';

const B3ConceptsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'B3.1.1' | 'B3.1.5'>('B3.1.1');

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B3.1 Single Class Fundamentals</h1>
        <p className="text-2xl kalam text-slate-600 italic">"The Anatomy of an Independent Software Entity"</p>
      </div>

      {/* Syllabus Navigation Tabs */}
      <div className="flex justify-center space-x-4 sticky top-4 z-50 bg-stone-50/80 backdrop-blur-md p-2 rounded-full shadow-sm max-w-fit mx-auto border-2 border-slate-200">
        <TabButton active={activeTab === 'B3.1.1'} onClick={() => setActiveTab('B3.1.1')} label="B3.1.1 Evaluate & Model" />
        <TabButton active={activeTab === 'B3.1.5'} onClick={() => setActiveTab('B3.1.5')} label="B3.1.5 Encapsulation" />
      </div>

      {activeTab === 'B3.1.1' && (
        <section className="space-y-12 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl border-2 border-slate-700"><Shapes /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">B3.1.1 Evaluate & Model Entities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Modeling Infographic */}
            <HandwrittenCard title="Modeling Real-World Entities" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
               <p className="kalam text-lg font-bold text-slate-700 italic mb-6">"How do we translate a physical 'Drone' into code?"</p>
               <div className="flex flex-col items-center space-y-6 bg-slate-50 p-8 rounded-[3rem] border-2 border-dashed border-slate-200 relative overflow-hidden">
                  <Cpu className="absolute top-4 right-4 text-slate-300 opacity-20" size={80} />
                  <div className="w-full space-y-4">
                     <ModelItem label="Entity (Class)" value="SmartDrone" icon={Zap} color="text-indigo-600" />
                     <ModelItem label="State (Attributes)" value="altitude, battery, model_id" icon={Info} color="text-rose-600" />
                     <ModelItem label="Behavior (Methods)" value="take_off(), land(), snap_photo()" icon={Target} color="text-emerald-600" />
                  </div>
               </div>
            </HandwrittenCard>

            {/* Evaluation Table */}
            <HandwrittenCard title="Evaluating OOP Paradigm" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 shadow-2xl">
               <h5 className="text-yellow-400 font-black text-xs uppercase mb-6 tracking-widest flex items-center">
                 <AlertCircle size={14} className="mr-2"/> Performance vs modularity
               </h5>
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
                        <span className="text-emerald-400 font-black text-[10px] uppercase">Advantages</span>
                        <ul className="text-[11px] kalam font-bold text-slate-300 mt-2 space-y-2">
                           <li>• High Reusability</li>
                           <li>• Ease of Maintenance</li>
                           <li>• Enhanced Security</li>
                        </ul>
                     </div>
                     <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-2xl">
                        <span className="text-rose-400 font-black text-[10px] uppercase">Disadvantages</span>
                        <ul className="text-[11px] kalam font-bold text-slate-300 mt-2 space-y-2">
                           <li>• Higher RAM Usage</li>
                           <li>• Slower Execution</li>
                           <li>• Design Complexity</li>
                        </ul>
                     </div>
                  </div>
                  <p className="text-[10px] kalam text-slate-500 italic border-t border-white/5 pt-4">
                    "OOP is ideal for large, complex systems where team collaboration and long-term maintenance are priority over raw CPU speed."
                  </p>
               </div>
            </HandwrittenCard>
          </div>
        </section>
      )}

      {activeTab === 'B3.1.5' && (
        <section className="space-y-12 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><ShieldCheck /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">B3.1.5 Encapsulation & Hiding</h2>
          </div>

          <HandwrittenCard bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden relative">
            <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Lock size={200} /></div>
            <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <p className="kalam text-xl font-bold text-slate-800 leading-relaxed">
                  "Encapsulation restricts direct access to an object's components. It acts as a <b>Safety Shield</b> for your data."
                </p>
                
                <div className="space-y-4">
                  <ModifierBox type="Public (+)" icon={Unlock} color="bg-emerald-100 text-emerald-700" desc="Used for behaviors (Methods). Anyone can call them." />
                  <ModifierBox type="Private (-)" icon={Lock} color="bg-rose-100 text-rose-700" desc="Used for data (Attributes). Hidden to prevent corruption." />
                </div>

                <div className="p-6 bg-indigo-50 border-l-8 border-indigo-600 rounded-r-xl shadow-inner">
                   <h6 className="font-black text-xs text-indigo-900 uppercase mb-2">Integrity Principle:</h6>
                   <p className="text-[11px] kalam font-bold text-indigo-700 italic leading-relaxed">
                     "By using Getters and Setters, we control <b>HOW</b> data changes. We can validate that a 'Speed' attribute never becomes negative before we save it!"
                   </p>
                </div>
              </div>

              <div className="bg-slate-950 p-8 rounded-3xl text-indigo-300 font-mono text-xs border-b-8 border-slate-900 shadow-xl overflow-hidden relative">
                 <div className="absolute top-2 right-4 text-[8px] uppercase tracking-widest text-slate-600">Access_Control.py</div>
                 <pre className="leading-relaxed">
{`class Vault:
    def __init__(self, code):
        # [!] PRIVATE: Uses double underscore
        self.__secret_code = code 

    # [!] PUBLIC: Safe interface
    def set_code(self, new_code):
        if len(new_code) > 4:
            self.__secret_code = new_code
            print("Code Updated.")
        else:
            print("Error: Too short!")

# Client logic
v = Vault("12345")
# v.__secret_code = "0"  # CRASH: Illegal access
v.set_code("987654")    # SUCCESS: Validated`}
                 </pre>
              </div>
            </div>
          </HandwrittenCard>
        </section>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${active ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
  >
    {label}
  </button>
);

const ModelItem = ({ label, value, color, icon: Icon }: any) => (
  <div className="flex items-center space-x-4 p-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
    <div className={`p-2 rounded-lg bg-slate-50 ${color}`}><Icon size={18} /></div>
    <div className="flex-1">
       <span className={`text-[9px] font-black uppercase ${color} block mb-1`}>{label}</span>
       <code className="text-xs font-mono font-black text-slate-900">{value}</code>
    </div>
  </div>
);

const ModifierBox = ({ type, icon: Icon, color, desc }: any) => (
  <div className="flex items-center space-x-4 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-slate-900 group">
    <div className={`p-3 rounded-xl ${color} shadow-sm group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <div>
      <h6 className="font-black text-xs uppercase text-slate-900">{type} Access</h6>
      <p className="text-[10px] kalam font-bold text-slate-500 italic">{desc}</p>
    </div>
  </div>
);

export default B3ConceptsSection;
