
import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Shapes, Code, Cpu, ArrowRight, Info, Zap, Layout, Hash, 
  Braces, Settings, Target, FileCode, Search, Smartphone, 
  UserCircle, Globe, PenTool, BookOpen, Clock, Users, Database
} from 'lucide-react';

const B3ClassDesignSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B3.1 Class Architecture</h1>
        <p className="text-2xl kalam text-slate-600 italic">"The Blueprint of Individual Objects"</p>
      </div>

      {/* B3.1.2 Design & UML */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Layout /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B3.1.2 Designing Classes & UML</h2>
        </div>

        <HandwrittenCard title="Constructing the Blueprint" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="kalam text-lg font-bold text-slate-700 italic">
                "UML diagrams act as the 'Architecture Draft'. They show <b>WHAT</b> a class holds and <b>HOW</b> it behaves based on application requirements."
              </p>
              <div className="bg-indigo-50 p-6 rounded-3xl border-l-8 border-indigo-600">
                 <h6 className="font-black text-xs uppercase text-indigo-900 mb-2">Effective Design Flow:</h6>
                 <ul className="text-[11px] font-bold kalam text-slate-600 space-y-2">
                    <li className="flex items-start"><ArrowRight size={12} className="mr-2 mt-0.5 text-indigo-400"/> Map user needs to specific <b>attributes</b>.</li>
                    <li className="flex items-start"><ArrowRight size={12} className="mr-2 mt-0.5 text-indigo-400"/> Map system actions to specific <b>methods</b>.</li>
                    <li className="flex items-start"><ArrowRight size={12} className="mr-2 mt-0.5 text-indigo-400"/> Standardize the interface for external teams.</li>
                 </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-8 bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-300 group">
               <div className="w-full max-w-[280px] bg-white border-4 border-slate-900 rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="bg-slate-900 text-white p-3 text-center font-black text-lg tracking-[0.2em] uppercase">AtmCard</div>
                  <div className="p-4 border-b-2 border-slate-900 space-y-1">
                     <p className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Attributes</p>
                     <div className="text-[10px] font-mono font-black">- card_id: String</div>
                     <div className="text-[10px] font-mono font-black">- daily_limit: float</div>
                  </div>
                  <div className="p-4 space-y-1 bg-slate-50">
                     <p className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">Methods</p>
                     <div className="text-[10px] font-mono font-black">+ withdraw(amt): bool</div>
                     <div className="text-[10px] font-mono font-black">+ change_pin(): void</div>
                  </div>
               </div>
            </div>
          </div>
        </HandwrittenCard>
      </section>

      {/* B3.1.3 Static vs Non-Static */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Hash /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B3.1.3 Shared vs Unique Scope</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <HandwrittenCard title="Understanding the Boundary" bgColor="bg-slate-50" className="border-4 border-slate-900 shadow-2xl">
             <div className="space-y-6">
                <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
                   <h5 className="font-black text-xs text-indigo-600 uppercase mb-3 flex items-center tracking-widest">
                      <Users size={16} className="mr-2"/> Non-Static (Instance)
                   </h5>
                   <p className="text-[11px] kalam font-bold text-slate-500 italic mb-4">"Scoped to the specific object. If Object A's speed changes, Object B is unaffected."</p>
                   <code className="text-[10px] font-mono bg-indigo-50 text-indigo-800 p-1 rounded">self.attribute = x</code>
                </div>

                <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl">
                   <h5 className="font-black text-xs text-amber-600 uppercase mb-3 flex items-center tracking-widest">
                      <Globe size={16} className="mr-2"/> Static (Class)
                   </h5>
                   <p className="text-[11px] kalam font-bold text-slate-500 italic mb-4">"Shared globally across every instance of the class. Perfect for counters or constants."</p>
                   <code className="text-[10px] font-mono bg-amber-50 text-amber-800 p-1 rounded">ClassName.attribute = x</code>
                </div>
             </div>
          </HandwrittenCard>

          <div className="bg-slate-950 p-8 rounded-[3rem] text-indigo-300 font-mono text-xs border-b-8 border-slate-900 shadow-xl relative overflow-hidden">
             <div className="absolute top-2 right-8 text-slate-700 font-black text-[9px] uppercase">Memory_Logic.py</div>
             <pre className="leading-relaxed">
{`class Employee:
    # 1. CLASS (STATIC) DATA
    # Every employee shares this
    base_salary = 2000

    def __init__(self, name):
        # 2. INSTANCE (NON-STATIC) DATA
        # Unique to THIS specific human
        self.name = name

# Execution
e1 = Employee("Alice")
e2 = Employee("Bob")

Employee.base_salary = 2500 # Changes for BOTH
print(e1.name) # Alice
print(e2.name) # Bob`}
             </pre>
          </div>
        </div>
      </section>

      {/* B3.1.4 Definition & Instantiation */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Code /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B3.1.4 Constructors & Creation</h2>
        </div>

        <HandwrittenCard bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl relative overflow-hidden">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <h4 className="text-2xl font-black handwritten text-emerald-600 mb-4 underline decoration-emerald-200 decoration-4 underline-offset-8 uppercase tracking-tighter">The __init__ Engine</h4>
                 <p className="kalam text-lg font-bold text-slate-800 leading-relaxed italic">
                    "A constructor is a special method called automatically at the birth of an object. It <b>initializes the state</b> (sets the starting values)."
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                       <span className="text-[9px] font-black text-emerald-700 uppercase block mb-1">Instantiation</span>
                       <p className="text-[10px] kalam font-bold text-slate-500">The process of allocating memory and creating a live instance.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                       <span className="text-[9px] font-black text-blue-700 uppercase block mb-1">State Setup</span>
                       <p className="text-[10px] kalam font-bold text-slate-500">Giving the object its unique characteristics immediately.</p>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl relative">
                  <div className="absolute top-2 right-8 text-[8px] font-mono text-emerald-500">CONSTRUCTOR_ANATOMY.PY</div>
                  <pre className="text-xs font-mono text-indigo-200 leading-relaxed">
{`class Car:
    def __init__(self, color):
        # 1. State is set here
        self.color = color 
        print("Broom! Car created.")

# 2. INSTANTIATION
# Python calls __init__ now
my_ride = Car("Red")`}
                  </pre>
                  <div className="mt-8 flex items-center justify-center space-x-4">
                     <div className="p-3 bg-white border-2 border-slate-800 rounded shadow-lg text-[9px] font-black">BLUEPRINT</div>
                     <ArrowRight size={14} className="text-slate-600 animate-pulse" />
                     <div className="p-3 bg-indigo-600 text-white rounded-full shadow-lg text-[9px] font-black uppercase">OBJECT</div>
                  </div>
              </div>
           </div>
        </HandwrittenCard>
      </section>
    </div>
  );
};

export default B3ClassDesignSection;
