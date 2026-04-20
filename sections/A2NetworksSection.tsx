
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Network, Globe, ShieldCheck, Lock, Unlock, ArrowRight,
  RefreshCw, Info, Layers, Zap, Search, Activity,
  Server, Smartphone, Monitor, Database
} from 'lucide-react';

const A2NetworksSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">A2 Networking Mastery</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Connecting the World: One Packet at a Time"</p>
      </div>

      {/* A2.1 Basics & Packet Switching */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Network /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">A2.1 Data Transmission</h2>
        </div>

        <HandwrittenCard title="Annotated: Packet Switching" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <p className="kalam text-lg font-bold text-slate-700 leading-relaxed italic">
                    "Data is too big to send at once. We break it into <b>Packets</b>. Each packet takes the fastest available route through a mesh of routers."
                 </p>
                 <div className="bg-indigo-50 p-6 rounded-3xl border-l-8 border-indigo-600 shadow-inner">
                    <h6 className="font-black text-xs text-indigo-900 uppercase mb-4 tracking-widest">Packet Anatomy:</h6>
                    <div className="grid grid-cols-1 gap-2">
                       <PacketField label="Header" desc="Source/Dest IP, Packet Number." color="indigo" />
                       <PacketField label="Payload" desc="Actual data (bits of your photo/email)." color="blue" />
                       <PacketField label="Trailer" desc="Checksum for error detection." color="emerald" />
                    </div>
                 </div>
              </div>

              <div className="relative p-10 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 overflow-hidden">
                 <div className="absolute top-2 right-4 text-[8px] font-black uppercase text-slate-300">Logical Network View</div>
                 <div className="flex justify-between items-center mb-20 relative">
                    <Node label="Source" icon={Monitor} active />
                    <div className="flex-1 flex justify-around">
                       <div className="flex flex-col space-y-10">
                          <Router label="R1" delay />
                          <Router label="R2" />
                       </div>
                    </div>
                    <Node label="Dest" icon={Server} active />
                    
                    {/* Animated Packets */}
                    <div className="absolute top-1/2 left-0 w-full flex items-center pointer-events-none">
                       <div className="w-3 h-3 bg-indigo-500 rounded-sm animate-[ping_2s_infinite] ml-12" />
                       <div className="w-3 h-3 bg-indigo-400 rounded-sm animate-[ping_3s_infinite] ml-24" />
                       <div className="w-3 h-3 bg-indigo-300 rounded-sm animate-[ping_2.5s_infinite] ml-6" />
                    </div>
                 </div>
                 <p className="text-[10px] text-center kalam text-slate-400 italic">"Notice: Packets arrive in <b>wrong order</b> and are re-assembled by the receiver!"</p>
              </div>
           </div>
        </HandwrittenCard>
      </section>

      {/* OSI Stack Infographic */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-pink-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Layers /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">A2.2 The Stack Architecture</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-5">
              <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
                 <h4 className="text-2xl font-black handwritten text-yellow-400 mb-8">The OSI 7-Layer Model</h4>
                 <div className="space-y-2">
                    <OSILayer level="7" name="Application" desc="HTTP, SMTP, FTP (User interface)" color="bg-rose-500" />
                    <OSILayer level="6" name="Presentation" desc="Encryption & Data formatting" color="bg-rose-400" />
                    <OSILayer level="5" name="Session" desc="Managing connections" color="bg-rose-300" />
                    <OSILayer level="4" name="Transport" desc="TCP/UDP (Error correction)" color="bg-indigo-500" />
                    <OSILayer level="3" name="Network" desc="IP (Routing addresses)" color="bg-indigo-400" />
                    <OSILayer level="2" name="Data Link" desc="MAC addresses (Ethernet)" color="bg-emerald-500" />
                    <OSILayer level="1" name="Physical" desc="Wires, Radio waves, Bits" color="bg-emerald-400" />
                 </div>
                 <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[9px] font-mono text-slate-400 tracking-tighter">
                       MNEMONIC: <b>A</b>ll <b>P</b>eople <b>S</b>eem <b>T</b>o <b>N</b>eed <b>D</b>ata <b>P</b>rocessing
                    </p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <HandwrittenCard title="Teacher's Analysis: TCP/IP vs OSI" bgColor="bg-white" className="border-4 border-slate-900 shadow-xl">
                 <p className="kalam text-lg font-bold text-slate-700 italic mb-6">"Why two models? OSI is <b>theoretical</b> (the ideal), while TCP/IP is <b>practical</b> (the real internet)."</p>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
                       <h6 className="text-xs font-black uppercase text-indigo-900 mb-2">OSI (7 Layers)</h6>
                       <p className="text-[10px] kalam font-bold text-slate-500 italic">Very strict distinction between layers. Used for teaching and vendor standardisation.</p>
                    </div>
                    <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                       <h6 className="text-xs font-black uppercase text-emerald-900 mb-2">TCP/IP (4 Layers)</h6>
                       <p className="text-[10px] kalam font-bold text-slate-500 italic">Combines top layers into 'Application'. Efficient and simpler for real-world implementation.</p>
                    </div>
                 </div>
              </HandwrittenCard>

              <div className="p-8 bg-yellow-100 rounded-[3rem] sketch-border shadow-lg relative overflow-hidden">
                 <h5 className="text-xl font-black handwritten text-yellow-900 mb-4 uppercase tracking-tighter flex items-center">
                    <Info size={20} className="mr-2"/> Essential Concept: Protocols
                 </h5>
                 <p className="text-sm kalam text-slate-800 font-bold italic leading-relaxed">
                    "A protocol is a <b>set of rules</b> for data communication. Without them, your iPhone couldn't talk to a Windows server. They define data format, error handling, and speed."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* A2.3 Network Security */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><ShieldCheck /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">A2.3 Shielding the Data</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           <HandwrittenCard title="Security Protocols: SSL/TLS" bgColor="bg-slate-900" className="text-white">
              <div className="space-y-6">
                 <div className="flex items-center space-x-3 text-emerald-400">
                    <Lock size={20}/>
                    <h5 className="font-black text-xl handwritten">Encryption Mastery</h5>
                 </div>
                 <p className="text-xs kalam font-bold text-slate-400 italic leading-relaxed">
                    "SSL/TLS ensures that even if a packet is 'sniffed' by a hacker, it remains unreadable. It creates a <b>Secure Tunnel</b> between the browser and server."
                 </p>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <h6 className="text-[10px] font-black uppercase text-yellow-400 mb-2">Authentication Check:</h6>
                    <p className="text-[9px] font-mono text-slate-500 leading-tight">Digital Certificates verify that 'google.com' is actually Google, preventing Man-in-the-Middle (MitM) attacks.</p>
                 </div>
              </div>
           </HandwrittenCard>

           <HandwrittenCard title="The Firewall Sentry" bgColor="bg-white" className="border-4 border-emerald-900 shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]">
              <div className="space-y-6">
                 <p className="kalam text-lg font-bold text-slate-700 italic">
                    "A firewall is the <b>First Line of Defense</b>. It inspects every incoming packet and compares it against security rules."
                 </p>
                 <div className="flex items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] font-black uppercase text-slate-400 mb-2">Untrusted Net</span>
                       <Monitor className="text-slate-300" size={32} />
                    </div>
                    <ArrowRight className="text-rose-400 mx-4" />
                    <div className="w-1.5 h-20 bg-rose-600 rounded-full shadow-lg relative group">
                       <div className="absolute -top-4 -left-4 bg-white p-1 rounded-full border-2 border-rose-600 text-rose-600">
                          <Unlock size={12} className="animate-pulse" />
                       </div>
                       <div className="absolute -bottom-10 -left-6 text-[8px] font-black text-rose-600 uppercase">FIREWALL</div>
                    </div>
                    <ArrowRight className="text-emerald-400 mx-4" />
                    <div className="flex flex-col items-center">
                       <span className="text-[8px] font-black uppercase text-slate-400 mb-2">Private Intranet</span>
                       <Server className="text-emerald-500" size={32} />
                    </div>
                 </div>
              </div>
           </HandwrittenCard>
        </div>
      </section>
    </div>
  );
};

// UI Components
const PacketField = ({ label, desc, color }: any) => {
  const colors: any = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
  };
  return (
    <div className="flex items-start space-x-3 p-2 bg-white rounded-lg border border-slate-100 group hover:shadow-md transition-all">
       <div className={`mt-1 font-black text-[10px] uppercase tracking-widest ${colors[color]}`}>{label}:</div>
       <div className="text-[10px] font-bold kalam text-slate-500">{desc}</div>
    </div>
  );
};

const Node = ({ label, icon: Icon, active }: any) => (
  <div className="flex flex-col items-center">
     <div className={`p-4 rounded-2xl border-4 border-slate-900 ${active ? 'bg-white shadow-xl' : 'bg-slate-200 opacity-50'}`}>
        <Icon className={active ? 'text-indigo-600' : 'text-slate-400'} size={24} />
     </div>
     <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

const Router = ({ label, delay }: any) => (
  <div className={`p-3 rounded-full border-2 border-slate-900 bg-white font-black text-[10px] shadow-md ${delay ? 'animate-pulse' : ''}`}>
     {label}
  </div>
);

const OSILayer = ({ level, name, desc, color }: any) => (
  <div className="flex items-center space-x-4 group">
     <div className="w-8 h-8 rounded-lg bg-slate-800 text-[10px] font-black text-slate-500 flex items-center justify-center shrink-0 border border-slate-700">L{level}</div>
     <div className={`flex-1 p-3 rounded-xl ${color} text-white shadow-lg border-2 border-black/10 transition-transform group-hover:scale-[1.02] cursor-default`}>
        <div className="flex justify-between items-center mb-0.5">
           <h6 className="font-black text-[11px] uppercase tracking-widest">{name}</h6>
           <span className="text-[7px] font-black bg-white/20 px-1.5 py-0.5 rounded uppercase">Verified</span>
        </div>
        <p className="text-[9px] font-bold kalam opacity-90">{desc}</p>
     </div>
  </div>
);

export default A2NetworksSection;
