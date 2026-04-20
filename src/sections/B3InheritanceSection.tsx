
import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { GitBranch, Shapes, Zap, ArrowDown, Layers, ArrowRight, ShieldAlert, Code, Repeat, Network, Lock, Unlock, Search, Target, Binary, ShieldCheck } from 'lucide-react';

const B3InheritanceSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <div className="mb-4 inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-full font-black text-xs shadow-xl uppercase tracking-widest animate-pulse"><ShieldAlert size={14} /><span>Higher Level mastery (B3.2)</span></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">🧬 Hierarchies & Forms</h1>
        <p className="text-2xl kalam text-slate-600 italic">"B3.2.1 - B3.2.2 Multiple Classes Logic"</p>
      </div>

      {/* B3.2.1 Inheritance & Modifiers */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><GitBranch /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B3.2.1 Promoting Reusability</h2>
        </div>

        <HandwrittenCard title="Hierarchical Relationships" bgColor="bg-white" className="border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
           <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="kalam text-lg font-bold text-slate-700 leading-relaxed italic">
                   "Inheritance models the <b>'is-a'</b> relationship. It allows child classes to inherit code from a parent, promoting <b>reusability</b> while adding unique functionalities."
                </p>
                <div className="space-y-4">
                   <div className="p-5 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl group hover:bg-white transition-all">
                      <h6 className="font-black text-xs uppercase text-indigo-900 mb-1">Impact on Access Modifiers</h6>
                      <p className="text-[10px] kalam font-bold text-slate-600 italic">"Private members remain hidden! Even a child class cannot see the parent's private variables directly."</p>
                   </div>
                </div>
                <div className="flex justify-center space-x-3 py-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <ModifierTag label="Public" access="Full Access" color="text-emerald-600" />
                    <ModifierTag label="Protected" access="Child Only" color="text-amber-600" />
                    <ModifierTag label="Private" access="Zero Access" color="text-rose-600" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-8">
                 <div className="w-48 p-4 bg-slate-900 text-white rounded-xl text-center font-black text-xs tracking-widest shadow-xl uppercase">Parent: Vehicle</div>
                 <div className="text-3xl text-slate-300 font-bold py-3 animate-bounce">△<br/>│</div>
                 <div className="flex space-x-6">
                    <div className="w-32 p-3 bg-indigo-100 border-2 border-indigo-600 rounded-xl text-center font-black text-[9px] text-indigo-900 shadow-lg">Child: Car</div>
                    <div className="w-32 p-3 bg-indigo-100 border-2 border-indigo-600 rounded-xl text-center font-black text-[9px] text-indigo-900 shadow-lg">Child: Truck</div>
                 </div>
                 <p className="text-[10px] font-mono text-slate-400 mt-8 uppercase tracking-widest">Code Reused 100% | Specific Logic Added</p>
              </div>
           </div>
        </HandwrittenCard>
      </section>

      {/* B3.2.2 Polymorphism */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Shapes /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B3.2.2 Dynamic vs Static Polymorphism</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           <HandwrittenCard title="Static (Overloading)" bgColor="bg-slate-900" className="text-white border-4 border-slate-700">
              <div className="flex items-center space-x-3 text-amber-400 mb-4"><Code /><h5 className="font-black text-xl handwritten">Compiled Logic</h5></div>
              <p className="text-xs kalam font-bold text-slate-400 italic mb-6 leading-relaxed">"Multiple methods with the <b>same name</b> but <b>different parameters</b>. Maximizes efficiency by choosing the correct call at compile-time."</p>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-[10px] text-indigo-300">
                 def calc(x): return x * x<br/>
                 def calc(x, y): return x * y<br/>
                 <span className="text-slate-500 italic"># Python simulates this with defaults</span>
              </div>
           </HandwrittenCard>

           <HandwrittenCard title="Dynamic (Overriding)" bgColor="bg-white" className="border-4 border-amber-900 shadow-[8px_8px_0px_0px_rgba(217,119,6,1)]">
              <div className="flex items-center space-x-3 text-emerald-600 mb-4"><Repeat /><h5 className="font-black text-xl handwritten">Runtime Logic</h5></div>
              <p className="text-xs kalam font-bold text-slate-600 italic mb-6 leading-relaxed">"A subclass provides a <b>specific version</b> of a method already in the parent. The correct code is linked at Runtime based on the object type."</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[10px] text-emerald-700">
                 class Dog(Animal):<br/>
                 &nbsp;&nbsp;def speak(self): print("Woof!")
              </div>
           </HandwrittenCard>
        </div>

        <div className="bg-indigo-900 text-white p-10 rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12"><Zap size={140}/></div>
           <div className="relative z-10 max-w-3xl">
              <h4 className="text-2xl font-black handwritten text-yellow-400 mb-4 flex items-center tracking-tighter uppercase"><Search className="mr-2" size={24}/> The Flexibility Principle</h4>
              <p className="text-md kalam leading-relaxed italic text-indigo-100 font-bold">
                 "Polymorphism allows for <b>modular code</b>. You can write a single 'render_all(list)' function that calls '.draw()' on a mixture of shapes. As new shapes are added to the system, the render function <b>never needs to change</b>. That is true code flexibility!"
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center"><span className="text-xs font-black uppercase text-indigo-300">Flexible</span></div>
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center"><span className="text-xs font-black uppercase text-indigo-300">Reusable</span></div>
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center"><span className="text-xs font-black uppercase text-indigo-300">Scalable</span></div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const ModifierTag = ({ label, access, color }: any) => (
  <div className="flex flex-col items-center px-4">
     <span className={`font-black text-[10px] uppercase ${color} mb-1`}>{label}</span>
     <span className="text-[8px] font-mono text-slate-400 font-bold">{access}</span>
  </div>
);

export default B3InheritanceSection;
