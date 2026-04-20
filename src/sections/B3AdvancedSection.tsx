
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  ShieldAlert, Zap, Cpu, Code, Info, 
  Layers, GitBranch, Shapes, Link, Network, 
  Fingerprint, Compass, Box, Eye,
  Lock, Unlock, Shield, Share2, Target, Search, Workflow, ArrowRight, Settings,
  Puzzle, Activity, Terminal, HelpCircle, AlertTriangle, BookOpen, Layers3,
  ShieldCheck, Split, Combine, Scissors, Heart, User, Building, GraduationCap,
  ArrowDown, Plus, Microscope, Lightbulb, CheckCircle2, XCircle, Wand2
} from 'lucide-react';

const B3AdvancedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patterns');

  const tabs = [
    { id: 'relationships', label: 'B3.2.4 Relationships', icon: Workflow },
    { id: 'metrics', label: 'B3.2.5 Quality Metrics', icon: Activity },
    { id: 'patterns', label: 'B3.2.6 Design Patterns', icon: Compass },
    { id: 'abstraction', label: 'B3.2.3 Abstraction', icon: Eye },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <div className="mb-4 inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-full font-black text-sm shadow-xl animate-pulse uppercase tracking-[0.2em]">
           <ShieldAlert size={16} /> <span>HL Mastery Core (B3.2)</span>
        </div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight text-balance">Advanced OOP Architect</h1>
        <p className="text-2xl kalam text-slate-600 italic max-w-2xl mx-auto">"Scaling simple logic into enterprise-grade system architectures."</p>
      </div>

      {/* HL Sub-Navigation */}
      <div className="flex flex-wrap justify-center gap-3 bg-white/80 backdrop-blur-md p-2 rounded-3xl sketch-border border-slate-200 sticky top-4 z-50 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-xs transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-white hover:text-indigo-600'}`}
          >
            <tab.icon size={16} />
            <span className="handwritten text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-right-4 duration-500" key={activeTab}>
        {activeTab === 'relationships' && <RelationshipsModule />}
        {activeTab === 'metrics' && <MetricsModule />}
        {activeTab === 'patterns' && <DesignPatternsModule />}
        {activeTab === 'abstraction' && <AbstractionModule />}
      </div>
    </div>
  );
};

// --- Sub-Modules ---

const RelationshipsModule = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl"><Workflow /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B3.2.4 Dependency Hierarchy</h2>
    </div>

    {/* Composition Deep Dive */}
    <HandwrittenCard title="1. Composition: The Strong Relationship" bgColor="bg-white" className="border-4 border-rose-600 shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-3 mb-2">
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Ownership: ◆ Filled Diamond</span>
             </div>
             <p className="kalam text-lg font-bold text-slate-600 leading-relaxed italic">
                "In composition, the child object is <b>instantiated inside</b> the parent. If you delete the parent, the child is destroyed instantly."
             </p>
             <div className="p-5 bg-rose-50 rounded-2xl border-l-4 border-rose-500">
                <h6 className="font-black text-xs text-rose-900 uppercase mb-2">Architect's Reason:</h6>
                <p className="text-[11px] kalam font-bold text-rose-800">Use when the part cannot exist without the whole. A <b>Building</b> has <b>Rooms</b>. A room alone in a field is just a box; it requires the context of the building to be a 'Room'.</p>
             </div>
          </div>
          <div className="space-y-6">
             <div className="bg-slate-900 p-6 rounded-3xl border-b-8 border-rose-700 shadow-inner">
                <h6 className="text-[9px] font-mono text-slate-500 uppercase mb-4 tracking-widest">Strong_Link.py</h6>
                <pre className="text-[11px] font-mono text-indigo-300 leading-relaxed">
{`class RAM:
    def power(self): pass

class Motherboard:
    def __init__(self):
        # [!] Part is OWNED by parent
        self.memory = RAM() 
    
    # If board is deleted, 
    # memory is automatically cleared.`}
                </pre>
             </div>
             <div className="flex flex-col items-center py-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <div className="px-6 py-2 bg-slate-800 text-white rounded font-black text-xs">BOARD</div>
                <div className="h-6 w-0.5 bg-rose-400 relative">
                   <div className="absolute right-2 top-0 text-rose-600 font-black">◆</div>
                </div>
                <div className="px-6 py-2 bg-white border-2 border-rose-600 rounded font-black text-rose-600 text-xs shadow-sm">RAM</div>
             </div>
          </div>
       </div>
    </HandwrittenCard>

    {/* Aggregation Deep Dive */}
    <HandwrittenCard title="2. Aggregation: The Weak Relationship" bgColor="bg-white" className="border-4 border-emerald-600 shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-3 mb-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Association: ◇ Hollow Diamond</span>
             </div>
             <p className="kalam text-lg font-bold text-slate-600 leading-relaxed italic">
                "Aggregation is a <b>collection of references</b>. The child exists independently. Deleting the parent does NOT destroy the child."
             </p>
             <div className="p-5 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500">
                <h6 className="font-black text-xs text-emerald-900 uppercase mb-2">Architect's Reason:</h6>
                <p className="text-[11px] kalam font-bold text-emerald-800">Use when objects are shared. A <b>Library</b> aggregates <b>Books</b>. If the library closes down, the books still exist in a box or another library.</p>
             </div>
          </div>
          <div className="space-y-6">
             <div className="bg-slate-900 p-6 rounded-3xl border-b-8 border-emerald-700 shadow-inner">
                <h6 className="text-[9px] font-mono text-slate-500 uppercase mb-4 tracking-widest">Weak_Link.py</h6>
                <pre className="text-[11px] font-mono text-indigo-300 leading-relaxed">
{`class Player:
    def play(self): pass

class Team:
    def __init__(self):
        self.roster = [] 
    
    def sign_player(self, p_ref):
        # [!] Part is SHARED from outside
        self.roster.append(p_ref)
    
    # If Team is deleted, 
    # Player survives elsewhere.`}
                </pre>
             </div>
             <div className="flex flex-col items-center py-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <div className="px-6 py-2 bg-slate-800 text-white rounded font-black text-xs">TEAM</div>
                <div className="h-6 w-0.5 bg-emerald-400 relative">
                   <div className="absolute right-2 top-0 text-emerald-600 font-black">◇</div>
                </div>
                <div className="px-6 py-2 bg-white border-2 border-emerald-600 rounded font-black text-emerald-600 text-xs shadow-sm">PLAYER</div>
             </div>
          </div>
       </div>
    </HandwrittenCard>
  </div>
);

const MetricsModule = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-xl"><Activity /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B3.2.5 Quality & Integrity</h2>
    </div>

    {/* Cohesion Detailed */}
    <HandwrittenCard title="Metric 1: Cohesion (Internal Logic)" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12 p-4">
          <div className="space-y-6">
             <div className="flex items-center space-x-3 text-yellow-400">
                <Layers3 size={24} />
                <h4 className="text-2xl font-black handwritten uppercase">High Cohesion</h4>
             </div>
             <p className="text-sm kalam italic text-slate-400 leading-relaxed font-bold">
                "We want <b>High Cohesion</b>. Every method in a class should relate directly to a single, well-defined purpose. Break 'God Classes' into focused tools."
             </p>
             <div className="space-y-4">
                <div className="p-4 bg-rose-950/40 border-2 border-rose-800 rounded-2xl relative">
                   <span className="absolute -top-3 right-4 bg-rose-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">Low Cohesion (Bad)</span>
                   <h6 className="text-[10px] font-mono text-rose-300 font-bold mb-2">Class: AppCore</h6>
                   <ul className="text-[9px] font-mono text-slate-500 space-y-1 italic pl-4 border-l border-rose-900/50">
                      <li>• login_user()</li>
                      <li>• render_ui()</li>
                      <li>• calculate_tax()</li>
                   </ul>
                </div>
                <div className="flex justify-center"><ArrowDown className="text-slate-700 animate-bounce" size={24}/></div>
                <div className="p-4 bg-emerald-950/40 border-2 border-emerald-800 rounded-2xl relative">
                   <span className="absolute -top-3 right-4 bg-emerald-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">High Cohesion (Good)</span>
                   <h6 className="text-[10px] font-mono text-emerald-300 font-bold mb-2">Class: TaxEngine</h6>
                   <ul className="text-[9px] font-mono text-slate-300 space-y-1 italic pl-4 border-l border-emerald-900/50">
                      <li>• get_vat()</li>
                      <li>• calc_income_tax()</li>
                   </ul>
                </div>
             </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col justify-center">
             <h6 className="text-yellow-400 font-black text-xs uppercase mb-4 tracking-widest">Why it matters:</h6>
             <ul className="space-y-4 text-xs kalam font-bold text-slate-300 italic">
                <li className="flex items-start"><CheckCircle2 className="text-emerald-500 mr-2 mt-0.5 shrink-0" size={14}/> <b>Testability:</b> Focused logic has fewer edge cases to debug.</li>
                <li className="flex items-start"><CheckCircle2 className="text-emerald-500 mr-2 mt-0.5 shrink-0" size={14}/> <b>Reusability:</b> Move the TaxEngine to a new project without taking the UI logic with it.</li>
             </ul>
          </div>
       </div>
    </HandwrittenCard>

    {/* Coupling Detailed */}
    <HandwrittenCard title="Metric 2: Coupling (External Linkage)" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12 p-4">
          <div className="space-y-6">
             <div className="flex items-center space-x-3 text-pink-600">
                <Link size={24} />
                <h4 className="text-2xl font-black handwritten uppercase">Low Coupling</h4>
             </div>
             <p className="text-sm kalam italic text-slate-600 leading-relaxed font-bold">
                "We want <b>Loose Coupling</b>. Classes should interact through simple, public interfaces, never reaching directly into another class's internal state."
             </p>
             <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                <h6 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Tight Coupling Scenario:</h6>
                <div className="flex items-center justify-center space-x-6 mb-4">
                   <div className="w-14 h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md">UI</div>
                   <div className="flex flex-col items-center">
                      <div className="h-0.5 w-12 bg-rose-500"></div>
                      <span className="text-[8px] mt-1 text-rose-500 font-black tracking-widest">Direct Link</span>
                   </div>
                   <div className="w-14 h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md">DB</div>
                </div>
                <p className="text-[10px] kalam font-bold text-slate-500 text-center leading-tight">"If the DB changes a variable name, the UI breaks instantly. This 'Ripple Effect' makes maintenance impossible."</p>
             </div>
          </div>
          <div className="space-y-6">
             <div className="p-6 bg-indigo-50 border-4 border-indigo-200 rounded-[2.5rem]">
                <h6 className="text-[10px] font-black uppercase text-indigo-900 mb-4 tracking-widest">Decoupling Strategy:</h6>
                <div className="space-y-3">
                   <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-indigo-100">
                      <div className="p-1 bg-indigo-600 text-white rounded shadow-sm"><Zap size={12}/></div>
                      <p className="text-[10px] font-bold kalam text-indigo-900 leading-tight">Use <b>Encapsulation</b> to hide attributes.</p>
                   </div>
                   <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-indigo-100">
                      <div className="p-1 bg-indigo-600 text-white rounded shadow-sm"><Zap size={12}/></div>
                      <p className="text-[10px] font-bold kalam text-indigo-900 leading-tight">Interact via <b>Abstract Classes</b> (Interfaces).</p>
                   </div>
                   <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-indigo-100">
                      <div className="p-1 bg-indigo-600 text-white rounded shadow-sm"><Zap size={12}/></div>
                      <p className="text-[10px] font-bold kalam text-indigo-900 leading-tight">Pass <b>Parameters</b> rather than global data.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </HandwrittenCard>
  </div>
);

const DesignPatternsModule = () => (
  <div className="space-y-16">
    <div className="flex items-center space-x-4 mb-6">
       <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl"><Compass /></div>
       <h2 className="text-4xl font-black handwritten text-slate-900">B3.2.6 Deep Annotated Design Patterns</h2>
    </div>

    {/* Creational: Singleton */}
    <HandwrittenCard title="Pattern 1: The Singleton (Creational)" bgColor="bg-amber-50" className="border-4 border-amber-600 shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-2 text-amber-700">
                <Fingerprint size={24}/>
                <span className="text-[10px] font-black uppercase tracking-widest bg-amber-200 px-3 py-1 rounded-full">Single Access Point</span>
             </div>
             <p className="kalam text-lg font-bold text-slate-700 leading-relaxed italic">
                "Ensures a class has only <b>one instance</b> globally. Used for shared resources like a Database connection or a Settings file to avoid data collision."
             </p>
             <div className="p-6 bg-white rounded-3xl border border-amber-200 shadow-sm space-y-4">
                <h6 className="font-black text-[10px] text-amber-900 uppercase">Logic Breakdown:</h6>
                <ul className="text-[10px] kalam font-bold text-slate-500 space-y-2">
                   <li><span className="text-amber-600 font-black">[1]</span> Use a private static attribute <code>_instance</code> to store the object.</li>
                   <li><span className="text-amber-600 font-black">[2]</span> Intercept <code>__new__</code> (the allocator) to prevent duplicate creation.</li>
                   <li><span className="text-amber-600 font-black">[3]</span> Logic: 'If it exists, return it. If not, make it then return it.'</li>
                </ul>
             </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-3xl text-indigo-300 font-mono text-[10px] shadow-2xl relative border-b-8 border-amber-700">
             <div className="absolute top-2 right-8 text-slate-700 font-black uppercase">Annotated_Singleton.py</div>
             <pre className="leading-relaxed">
{`class Database:
    _instance = None # [1] Internal Static Store

    def __new__(cls):
        # [2] Pre-allocation check
        if cls._instance is None:
            # [3] The first and only creation
            cls._instance = super().__new__(cls)
            print("Connected to Global DB.")
        
        # [4] Every caller gets same memory address
        return cls._instance

# usage
db1 = Database()
db2 = Database()
# result: db1 is db2 -> True`}
             </pre>
          </div>
       </div>
    </HandwrittenCard>

    {/* Creational: Factory (RESTORED & DEEP ANNOTATED) */}
    <HandwrittenCard title="Pattern 2: The Factory (Creational)" bgColor="bg-blue-50" className="border-4 border-blue-600 shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-2 text-blue-700">
                <Wand2 size={24}/>
                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-200 px-3 py-1 rounded-full">Creation Hiding</span>
             </div>
             <p className="kalam text-lg font-bold text-slate-700 leading-relaxed italic">
                "The 'Object Spawner'. It hides the messy details of choosing a subclass from the main program. This is the ultimate tool for <b>Loose Coupling</b>."
             </p>
             <div className="p-6 bg-white rounded-3xl border border-blue-200 shadow-sm space-y-4">
                <h6 className="font-black text-[10px] text-blue-900 uppercase">Logic Breakdown:</h6>
                <ul className="text-[10px] kalam font-bold text-slate-500 space-y-2">
                   <li><span className="text-blue-600 font-black">[1]</span> Use an <b>Interface/Abstract Class</b> so the factory can return a generic type.</li>
                   <li><span className="text-blue-600 font-black">[2]</span> Client asks for a 'Type', and the Factory handles the <code>new MyClass()</code> logic internally.</li>
                   <li><span className="text-blue-600 font-black">[3]</span> Benefit: If you add a new subclass, you only change the Factory, not the whole app.</li>
                </ul>
             </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-3xl text-indigo-300 font-mono text-[10px] shadow-2xl relative border-b-8 border-blue-700">
             <div className="absolute top-2 right-8 text-slate-700 font-black uppercase">Factory_Logic.py</div>
             <pre className="leading-relaxed">
{`# 1. THE GENERIC BASE
class Enemy: pass

# 2. THE CONCRETE SUBCLASSES
class Orc(Enemy): pass
class Goblin(Enemy): pass

# 3. THE FACTORY (THE 'CREATOR')
class EnemyFactory:
    @staticmethod
    def spawn(type):
        # [!] Decision logic hidden here
        if type == "hard":
            return Orc()
        return Goblin()

# 4. USAGE: Main code stays CLEAN
# We don't care 'HOW' or 'WHICH' class is made.
mob = EnemyFactory.spawn("hard")`}
             </pre>
             <div className="mt-4 flex items-start space-x-2 text-emerald-400 opacity-80">
                <Lightbulb size={12} className="shrink-0 mt-0.5" />
                <p className="text-[9px]">Note: The client code doesn't need to import 'Orc' or 'Goblin'. It only imports the Factory!</p>
             </div>
          </div>
       </div>
    </HandwrittenCard>

    {/* Behavioral: Observer */}
    <HandwrittenCard title="Pattern 3: The Observer (Behavioral)" bgColor="bg-indigo-50" className="border-4 border-indigo-600 shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-2 text-indigo-700">
                <Network size={24}/>
                <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-200 px-3 py-1 rounded-full">Broadcast Notification</span>
             </div>
             <p className="kalam text-lg font-bold text-slate-700 leading-relaxed italic">
                "Defines a <b>One-to-Many</b> dependency. When the source (Subject) changes, all its dependents (Observers) are notified automatically. Basis for social media alerts!"
             </p>
             <div className="p-6 bg-white rounded-3xl border border-indigo-200 shadow-sm space-y-4">
                <h6 className="font-black text-[10px] text-indigo-900 uppercase">Logic Breakdown:</h6>
                <ul className="text-[10px] kalam font-bold text-slate-500 space-y-2">
                   <li><span className="text-indigo-600 font-black">[1]</span> The Subject keeps a <b>list</b> of references to its observers (Aggregation!).</li>
                   <li><span className="text-indigo-600 font-black">[2]</span> Subjects have <code>attach()</code> and <code>notify()</code> methods.</li>
                   <li><span className="text-indigo-600 font-black">[3]</span> Notification is a simple loop calling a standard method on every observer.</li>
                </ul>
             </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-3xl text-indigo-300 font-mono text-[10px] shadow-2xl relative border-b-8 border-indigo-700">
             <pre className="leading-relaxed">
{`class Channel:
    def __init__(self):
        self.subs = [] # [1] The Observer List

    def subscribe(self, user):
        self.subs.append(user)

    def upload(self, video):
        # [2] The Broadcaster
        for user in self.subs:
            # [3] Standardized interface call
            user.notify(video)

class User:
    def notify(self, vid):
        print(f"Ping! New Video: {vid}")`}
             </pre>
          </div>
       </div>
    </HandwrittenCard>

    {/* Architect's Matrix */}
    <div className="bg-slate-900 p-12 rounded-[4rem] sketch-border shadow-2xl relative overflow-hidden border-4 border-indigo-500">
       <div className="absolute top-0 right-0 p-10 opacity-5"><Lightbulb size={160} className="text-yellow-400"/></div>
       <h3 className="text-4xl font-black handwritten text-center text-yellow-400 mb-12 uppercase tracking-tight">The Architect's Selection Matrix</h3>
       <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <MatrixOption 
            icon={Fingerprint} 
            q="Need ONLY ONE resource?" 
            use="Singleton" 
            color="amber"
            scenario="Single log file or printer controller."
          />
          <MatrixOption 
            icon={Wand2} 
            q="Need to spawn many types?" 
            use="Factory" 
            color="blue"
            scenario="Game enemies, UI buttons, or payment processors."
          />
          <MatrixOption 
            icon={Network} 
            q="Need to sync 50+ objects?" 
            use="Observer" 
            color="indigo"
            scenario="Stock price tickers or notification systems."
          />
       </div>
    </div>
  </div>
);

const AbstractionModule = () => (
  <div className="space-y-10">
    <HandwrittenCard title="B3.2.3 Abstract Classes: The Software Contract" bgColor="bg-purple-50" className="border-4 border-purple-900 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
           <p className="kalam text-xl font-bold text-purple-900 italic leading-relaxed">
             "Abstraction hides complexity. An Abstract Class is a blueprint that cannot be used directly—it exists purely to be <b>inherited</b>."
           </p>
           
           <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-sm">
                 <h5 className="font-black text-[10px] uppercase text-purple-600 mb-2 flex items-center"><Terminal size={14} className="mr-1"/> Definition</h5>
                 <p className="text-[11px] font-bold kalam text-slate-700 italic">"A class containing at least one <b>Abstract Method</b> (a method without code) which children MUST implement."</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-sm">
                 <h5 className="font-black text-[10px] uppercase text-purple-600 mb-2 flex items-center"><Target size={14} className="mr-1"/> Purpose</h5>
                 <p className="text-[11px] font-bold kalam text-slate-700 italic">"Ensures consistency across child classes. Every 'Payment' MUST have a 'pay()' method, regardless of how it works."</p>
              </div>
           </div>

           <div className="bg-indigo-900 p-6 rounded-[2.5rem] text-white relative overflow-hidden">
              <ShieldCheck className="absolute -right-4 -bottom-4 opacity-10 rotate-12" size={100} />
              <h5 className="font-black text-xs uppercase text-indigo-300 mb-3">Impact on Maintenance:</h5>
              <ul className="space-y-3 text-[11px] font-bold kalam text-indigo-100">
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-0.5 text-yellow-400 shrink-0"/> Creates a standardized interface for multi-developer teams.</li>
                <li className="flex items-start"><ArrowRight size={14} className="mr-2 mt-0.5 text-yellow-400 shrink-0"/> Reduces redundancy by centralizing common logic in the base class.</li>
              </ul>
           </div>
        </div>
        
        <div className="flex-1 w-full space-y-6">
          <div className="bg-slate-950 p-8 rounded-3xl text-indigo-300 font-mono text-[11px] shadow-2xl border-b-8 border-purple-700 relative overflow-hidden">
             <div className="absolute top-2 right-4 text-slate-700 font-black uppercase text-[8px]">Base_Contract.py</div>
             <pre className="leading-relaxed">
{`from abc import ABC, abstractmethod

# THE CONTRACT (Abstract)
class Shape(ABC):
    @abstractmethod
    def get_area(self):
        pass # Force implementation

# THE IMPLEMENTATION (Concrete)
class Circle(Shape):
    def __init__(self, r): self.r = r
    def get_area(self):
        return 3.14 * self.r * self.r

# Error: s = Shape() # Illegal!`}
             </pre>
          </div>
          <div className="p-4 bg-yellow-100 sketch-border border-2 border-yellow-300 flex items-center space-x-3">
             <AlertTriangle className="text-yellow-600" size={24}/>
             <p className="text-[10px] kalam font-black text-yellow-900 leading-tight"><b>Exam Alert:</b> Abstract classes allow for <b>Polymorphism</b>. You can create a list of 'Shapes' and call 'get_area()' on all of them without knowing their specific subclass!</p>
          </div>
        </div>
      </div>
    </HandwrittenCard>
  </div>
);

const MatrixOption = ({ icon: Icon, q, use, color, scenario }: any) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center flex flex-col items-center hover:bg-white/10 transition-colors">
     <Icon size={48} className={`text-${color}-400 mb-4`} />
     <h6 className="text-white font-black text-xs uppercase mb-2">{q}</h6>
     <div className={`mt-2 px-4 py-2 bg-${color}-600 text-white rounded-full font-black text-[9px] uppercase tracking-widest`}>USE {use}</div>
     <p className="mt-4 text-[9px] kalam text-slate-400 italic">"{scenario}"</p>
  </div>
);

export default B3AdvancedSection;
