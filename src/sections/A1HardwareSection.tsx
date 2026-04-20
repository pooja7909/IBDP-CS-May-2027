
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Cpu, Settings, Zap, Info, ArrowRight, Activity, 
  Layers, HardDrive, Terminal, ShieldAlert,
  Search, Clock, HelpCircle, CheckCircle2
} from 'lucide-react';

const A1HardwareSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cpu' | 'os'>('cpu');

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">A1 Computer Fundamentals</h1>
        <p className="text-2xl kalam text-slate-600 italic">"The Ghost in the Machine: Architecture & Control"</p>
        
        <div className="flex justify-center mt-10 space-x-4">
           <button onClick={() => setActiveTab('cpu')} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'cpu' ? 'bg-blue-600 text-white border-blue-900 shadow-xl scale-105' : 'bg-white text-slate-500 border-slate-200'}`}>A1.1 Hardware</button>
           <button onClick={() => setActiveTab('os')} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'os' ? 'bg-indigo-600 text-white border-indigo-900 shadow-xl scale-105' : 'bg-white text-slate-50 border-slate-200'}`}>A1.3 The Operating System</button>
        </div>
      </div>

      {activeTab === 'cpu' ? <CPUContent /> : <OSContent />}

      {/* Quick Check Quiz */}
      <section className="pt-10 border-t-4 border-dashed border-slate-200">
         <HandwrittenCard title="Quick Mastery Check" bgColor="bg-yellow-50">
            <div className="grid md:grid-cols-2 gap-8">
               <QuizItem 
                  q="Which register holds the memory address of the next instruction to be fetched?" 
                  ans="Program Counter (PC)" 
               />
               <QuizItem 
                  q="Explain why the OS uses Scheduling." 
                  ans="To maximize CPU utilization by deciding which process runs next [1] and ensuring fair access to resources [1]." 
               />
            </div>
         </HandwrittenCard>
      </section>
    </div>
  );
};

const CPUContent = () => (
  <div className="space-y-12 animate-in slide-in-from-left-4">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Cpu /></div>
      <h2 className="text-4xl font-black handwritten text-slate-900">A1.1 Von Neumann Architecture</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-10">
      <HandwrittenCard title="Annotated CPU Diagram" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl relative overflow-hidden">
         <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Cpu size={200} /></div>
         <div className="flex flex-col items-center py-8">
            <div className="w-full max-w-sm space-y-6">
               <div className="p-4 bg-slate-900 text-white rounded-xl text-center font-black relative group">
                  CONTROL UNIT (CU)
                  <Annotation text="The Manager: Decodes instructions and sends signals." position="left" />
               </div>
               <div className="flex space-x-4">
                  <div className="flex-1 p-4 border-4 border-slate-900 rounded-xl text-center font-black relative group">
                     ALU
                     <Annotation text="The Calculator: Does + - * / and Logic (AND/OR)." position="bottom" />
                  </div>
                  <div className="flex-1 p-4 bg-blue-100 border-4 border-slate-900 rounded-xl text-center font-black relative group">
                     Registers
                     <Annotation text="Tiny, super-fast storage for IR, PC, ACC, MAR, MDR." position="bottom" />
                  </div>
               </div>
               <div className="p-6 bg-slate-100 border-4 border-dashed border-slate-300 rounded-3xl text-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">System Bus</span>
                  <div className="h-2 w-full bg-slate-400 my-2 rounded-full relative">
                     <ArrowRight className="absolute -right-2 -top-1.5 text-slate-400" size={20}/>
                  </div>
               </div>
               <div className="p-4 bg-white border-4 border-slate-900 rounded-xl text-center font-black relative group">
                  RAM (Primary Memory)
                  <Annotation text="The Desk: Holds programs currently in use." position="right" />
               </div>
            </div>
         </div>
      </HandwrittenCard>

      <div className="space-y-6">
         <div className="p-8 bg-slate-900 text-white rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
            <h4 className="text-2xl font-black handwritten text-yellow-400 mb-6 flex items-center underline decoration-slate-700 underline-offset-8">
              <Clock className="mr-3" /> Fetch-Execute Cycle
            </h4>
            <div className="space-y-4">
               <CycleStep num="1" title="FETCH" desc="CPU takes the memory address from the Program Counter (PC) and fetches data from RAM into the MDR." />
               <CycleStep num="2" title="DECODE" desc="The Control Unit (CU) translates the binary code into specific operation signals." />
               <CycleStep num="3" title="EXECUTE" desc="The ALU performs the work and stores the result in the Accumulator (ACC)." />
            </div>
         </div>
         
         <HandwrittenCard title="Teacher's Exam Tip" bgColor="bg-yellow-50">
            <p className="kalam text-sm font-bold italic leading-relaxed text-slate-700">
               "IB 2027 expects you to know the difference between <b>MAR</b> (Memory Address Register) and <b>MDR</b> (Memory Data Register). Think: MAR is the GPS coordinate, MDR is the actual package delivered there!"
            </p>
         </HandwrittenCard>
      </div>
    </div>
  </div>
);

const OSContent = () => (
  <div className="space-y-12 animate-in slide-in-from-right-4">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Settings /></div>
      <h2 className="text-4xl font-black handwritten text-slate-900">A1.3 Roles of the OS</h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
       <RoleCard 
          icon={Activity} 
          title="Memory Management" 
          desc="Allocating RAM to different apps. Ensures apps don't crash by 'stepping' on each other's memory space." 
          color="indigo" 
       />
       <RoleCard 
          icon={Zap} 
          title="Scheduling" 
          desc="Deciding which process gets the CPU next. Uses algorithms like 'Round Robin' to ensure multitasking feels smooth." 
          color="blue" 
       />
       <RoleCard 
          icon={ShieldAlert} 
          title="Security & Permissions" 
          desc="Managing user accounts and file access. The gatekeeper between the user and the raw hardware." 
          color="rose" 
       />
    </div>

    <HandwrittenCard title="Special Concepts: Interrupts & Paging" bgColor="bg-white" className="border-4 border-slate-900">
       <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
             <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <Info size={20}/>
                <h5 className="font-black text-xl handwritten">Virtual Memory / Paging</h5>
             </div>
             <p className="text-sm kalam font-bold text-slate-600 italic">
                "When RAM is full, the OS moves inactive data to the Hard Drive (Secondary Storage). This is called <b>Paging</b>. It allows us to run more apps than we have actual RAM for!"
             </p>
             <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-rose-500">Warning:</span>
                <p className="text-[10px] font-mono mt-1 italic">Disk Thrashing: When the OS spends more time moving pages than actually running code. System slows down heavily!</p>
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                <Zap size={20}/>
                <h5 className="font-black text-xl handwritten">Interrupt Signals</h5>
             </div>
             <p className="text-sm kalam font-bold text-slate-600 italic">
                "A hardware or software signal telling the CPU to STOP current work and handle an urgent task (e.g. Keyboard press, Printer error)."
             </p>
             <ul className="text-[11px] space-y-1 font-mono text-slate-400 uppercase tracking-widest">
                <li>• Higher Priority Signal</li>
                <li>• ISR (Interrupt Service Routine)</li>
                <li>• Return to main task</li>
             </ul>
          </div>
       </div>
    </HandwrittenCard>
  </div>
);

const Annotation = ({ text, position }: any) => {
  const styles: any = {
    left: 'right-full mr-4 top-1/2 -translate-y-1/2',
    right: 'left-full ml-4 top-1/2 -translate-y-1/2',
    bottom: 'top-full mt-4 left-1/2 -translate-x-1/2',
  };
  return (
    <div className={`absolute ${styles[position]} hidden lg:block w-32 animate-in fade-in zoom-in-95`}>
       <p className="text-[9px] kalam font-black text-indigo-400 leading-tight border-l-2 border-indigo-200 pl-2">
         {text}
       </p>
    </div>
  );
};

const CycleStep = ({ num, title, desc }: any) => (
  <div className="flex items-start space-x-4 group">
    <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">
       {num}
    </div>
    <div>
       <h5 className="font-black text-xs uppercase text-indigo-300 tracking-[0.2em]">{title}</h5>
       <p className="text-[11px] kalam text-slate-400 italic mt-1 leading-relaxed">"{desc}"</p>
    </div>
  </div>
);

const RoleCard = ({ icon: Icon, title, desc, color }: any) => {
  const colors: any = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    rose: 'bg-rose-50 border-rose-200 text-rose-600',
  };
  return (
    <div className={`p-6 sketch-border ${colors[color]} hover:-translate-y-2 transition-all group`}>
       <div className="p-3 bg-white rounded-xl mb-4 inline-block shadow-sm group-hover:rotate-12 transition-transform">
          <Icon size={24}/>
       </div>
       <h4 className="font-black handwritten text-xl mb-2 text-slate-900">{title}</h4>
       <p className="text-[11px] font-bold kalam opacity-70 leading-relaxed italic">"{desc}"</p>
    </div>
  );
};

const QuizItem = ({ q, ans }: any) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
       <p className="font-black text-sm text-slate-800 mb-4 flex items-start">
          <HelpCircle size={16} className="mr-2 mt-1 text-slate-400 shrink-0"/>
          {q}
       </p>
       <button 
          onClick={() => setRevealed(!revealed)}
          className="text-[10px] font-black uppercase text-indigo-600 underline underline-offset-4 hover:text-indigo-800 transition-colors"
       >
          {revealed ? 'Hide Answer' : 'Show Answer'}
       </button>
       {revealed && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in slide-in-from-top-2">
             <p className="text-xs kalam font-bold text-emerald-800 italic leading-relaxed">{ans}</p>
          </div>
       )}
    </div>
  );
};

export default A1HardwareSection;
