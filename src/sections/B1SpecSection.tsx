
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
// Add missing Cpu icon to the lucide-react import list
import { 
  Box, Target, Play, Info, CheckCircle2, AlertCircle, 
  ClipboardList, Monitor, Database, ShieldAlert, 
  BarChart3, PenTool, Search, MessageSquare,
  Scale, Zap, Globe, FileText, ArrowRight, Lightbulb, Cpu
} from 'lucide-react';

const B1SpecSection: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);

  const specComponents = [
    {
      title: "1. Problem Statement",
      icon: Search,
      color: "text-blue-600",
      bg: "bg-blue-50",
      detail: "The 'Context'. Identifies who has the problem, what the problem is, and the impact of the current inefficiency.",
      points: [
        "Current workflow description",
        "Specific pain points",
        "Economic or time costs"
      ],
      example: "Local pharmacies use paper ledgers for inventory, causing 15% stock wastage due to expiry."
    },
    {
      title: "2. Constraints & Limits",
      icon: ShieldAlert,
      color: "text-amber-600",
      bg: "bg-amber-50",
      detail: "The 'Boundaries'. Restrictions that define what the developer CANNOT do or must stay within.",
      points: [
        "Technical (RAM, CPU, OS)",
        "Economic (Budget, Time)",
        "Social/Legal (GDPR, UX)"
      ],
      example: "System must run on a Raspberry Pi 4 with 2GB RAM; budget limited to $500."
    },
    {
      title: "3. Objectives & Goals",
      icon: Target,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      detail: "The 'Aims'. High-level targets. Goals are broad; Objectives are specific and measurable.",
      points: [
        "Primary Goal (Broad)",
        "Secondary Objectives (Task-based)",
        "User-centered targets"
      ],
      example: "Goal: Modernize stock tracking. Objective: Automated low-stock alerts via SMS."
    },
    {
      title: "4. Input Specifications",
      icon: Database,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      detail: "The 'Ingredients'. Defines exactly what data enters the system and its source.",
      points: [
        "Data types (String, Int)",
        "Source (Barcode, Keyboard)",
        "Validation rules (Format checks)"
      ],
      example: "Input: 13-digit EAN Barcode; Source: Laser Scanner; Type: BigInt."
    },
    {
      title: "5. Output Specifications",
      icon: Monitor,
      color: "text-pink-600",
      bg: "bg-pink-50",
      detail: "The 'Deliverables'. What information comes out and in what form.",
      points: [
        "User Interface display",
        "Printed Reports (PDF/CSV)",
        "System triggers (Alarms)"
      ],
      example: "Output: Daily Expiry Report; Format: PDF; Destination: Manager's Email."
    },
    {
      title: "6. Evaluation Criteria",
      icon: BarChart3,
      color: "text-rose-600",
      bg: "bg-rose-50",
      detail: "The 'Success Metrics'. Measurable tests to prove the objectives were met.",
      points: [
        "Quantitative benchmarks",
        "Qualitative user feedback",
        "Reliability/Uptime targets"
      ],
      example: "Stock accuracy must be >99% in monthly physical audits."
    }
  ];

  const labItems = [
    { id: 'l1', label: 'Scan student ID barcode via camera', group: 'input' },
    { id: 'l2', label: 'Produce a weekly attendance PDF', group: 'output' },
    { id: 'l3', label: 'Reduce admin entry errors by 50%', group: 'eval' },
    { id: 'l4', label: 'Must fit in 256MB of RAM', group: 'constraint' },
    { id: 'l5', label: 'Provide real-time canteen usage stats', group: 'objective' },
    { id: 'l6', label: 'Calculate average weight per crate', group: 'process' },
  ];

  const handleSelect = (id: string, group: string) => {
    setSelections(prev => ({ ...prev, [id]: group }));
    setIsChecked(false);
  };

  const checkSpec = () => {
    setIsChecked(true);
    const correctCount = labItems.filter(item => selections[item.id] === item.group).length;
    if (correctCount === labItems.length) {
      alert("✅ Perfect Specification Architecture!");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">B1.1.1 Problem Specification</h1>
        <p className="text-xl kalam text-slate-600 italic">"Engineering the Blueprint of Success"</p>
      </div>

      {/* Detailed Curriculum Components Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specComponents.map((comp, idx) => (
          <HandwrittenCard key={idx} bgColor={comp.bg} className="h-full flex flex-col hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <comp.icon className={comp.color} size={32} />
              <span className="text-[9px] font-black uppercase bg-white/50 px-2 py-0.5 rounded border border-black/5">A3.2.1 Guide</span>
            </div>
            <h3 className={`text-2xl font-black handwritten mb-2 ${comp.color}`}>{comp.title}</h3>
            <p className="text-xs font-bold kalam text-slate-700 mb-4">{comp.detail}</p>
            
            <div className="mb-6 space-y-1">
              {comp.points.map((p, i) => (
                <div key={i} className="flex items-center text-[10px] font-bold text-slate-500 italic">
                  <ArrowRight size={10} className="mr-1 text-slate-300"/> {p}
                </div>
              ))}
            </div>

            <div className="mt-auto p-3 bg-white/60 border border-white rounded-xl shadow-inner relative group">
               <div className="absolute -top-2 right-2 bg-slate-900 text-white px-2 py-0.5 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">EXAM TIP</div>
               <p className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1 flex items-center">
                 <PenTool size={10} className="mr-1"/> Sample Spec Entry
               </p>
               <p className="text-[11px] italic kalam text-slate-800 leading-tight">"{comp.example}"</p>
            </div>
          </HandwrittenCard>
        ))}
      </div>

      {/* Constraints Deep Dive Infographic */}
      <HandwrittenCard title="Types of Constraints & Limitations" bgColor="bg-slate-50">
        <div className="grid md:grid-cols-4 gap-4">
          <ConstraintBox 
            icon={Cpu} 
            title="Technical" 
            desc="Hardware limits, OS compatibility, connectivity." 
            example="Runs on Android 9.0+"
          />
          <ConstraintBox 
            icon={Scale} 
            title="Ethical/Legal" 
            desc="GDPR compliance, data privacy, accessibility." 
            example="Encrypted storage"
          />
          <ConstraintBox 
            icon={Zap} 
            title="Economic" 
            desc="Development time, total budget, maintenance." 
            example="Finish in 12 weeks"
          />
          <ConstraintBox 
            icon={Globe} 
            title="Social" 
            desc="Cultural context, language, user expertise." 
            example="No-code UI for kids"
          />
        </div>
      </HandwrittenCard>

      {/* Scenario Blueprint Table */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <FileText className="text-indigo-600" size={32} />
          <h2 className="text-3xl font-black handwritten">The Specification Blueprint</h2>
        </div>
        
        <div className="bg-white sketch-border shadow-2xl overflow-hidden">
          <div className="p-4 bg-slate-900 text-white font-black text-sm tracking-widest flex justify-between">
            <span>SCENARIO: SMART GREENHOUSE CONTROLLER</span>
            <span className="text-indigo-400">IA CRITERION A PREVIEW</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold kalam">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase text-[9px] font-black">
                <tr>
                  <th className="p-4 border-r border-slate-200 w-1/4">Section</th>
                  <th className="p-4">Detailed Content</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 border-r border-slate-200 bg-slate-50/30 text-indigo-600 font-black">Problem</td>
                  <td className="p-4 leading-relaxed text-slate-700">Client loses 20% of crops to overnight frost. Manual monitoring is impossible during night shifts.</td>
                </tr>
                <tr>
                  <td className="p-4 border-r border-slate-200 bg-slate-50/30 text-indigo-600 font-black">Inputs</td>
                  <td className="p-4 space-y-1">
                    <p>• Digital sensor data: Temperature (Celsius, range -20 to 50)</p>
                    <p>• Digital sensor data: Soil Moisture (%)</p>
                    <p>• User Setting: Threshold levels via Mobile App</p>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-r border-slate-200 bg-slate-50/30 text-indigo-600 font-black">Constraints</td>
                  <td className="p-4 leading-relaxed text-slate-700">Must function without Wi-Fi (use LoRaWAN). Controller must resist 95% humidity.</td>
                </tr>
                <tr>
                  <td className="p-4 border-r border-slate-200 bg-slate-50/30 text-indigo-600 font-black">Evaluation</td>
                  <td className="p-4 text-emerald-600 italic">"Heater must activate within 2 seconds of temperature dropping below threshold."</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Advanced Sorting Lab */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <ClipboardList className="text-indigo-600" size={32} />
          <h2 className="text-3xl font-black handwritten text-slate-900">Architect's Laboratory</h2>
        </div>
        
        <div className="bg-white p-8 sketch-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12"><Box size={100} /></div>
          <p className="kalam text-sm mb-8 font-bold text-slate-600">
            Categorize these elements for a <b>"Student Finance Manager"</b> to build a complete spec:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {labItems.map(item => {
              const currentSel = selections[item.id];
              const isCorrect = isChecked && currentSel === item.group;
              const isWrong = isChecked && currentSel !== item.group;
              
              return (
                <div 
                  key={item.id} 
                  className={`p-5 border-2 sketch-border transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                    isCorrect ? 'bg-emerald-50 border-emerald-500 scale-105' : 
                    isWrong ? 'bg-rose-50 border-rose-500 animate-shake' : 
                    'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="font-black text-xs leading-tight pr-4">{item.label}</p>
                    {isCorrect && <CheckCircle2 className="text-emerald-500 shrink-0" size={16}/>}
                    {isWrong && <AlertCircle className="text-rose-500 shrink-0" size={16}/>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['input', 'process', 'output', 'constraint', 'objective', 'eval'].map(g => (
                      <button 
                        key={g}
                        onClick={() => handleSelect(item.id, g)}
                        disabled={isChecked && isCorrect}
                        className={`text-[8px] font-black uppercase py-1 px-1 rounded border transition-all ${
                          selections[item.id] === g 
                            ? (isChecked ? (isCorrect ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700') : 'bg-slate-900 text-white border-slate-900 shadow-md') 
                            : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <button 
              onClick={checkSpec}
              className="px-16 py-4 bg-slate-900 text-white rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center"
            >
              <Play size={18} className="mr-2" /> VERIFY SPECIFICATION
            </button>
            {isChecked && (
              <div className="mt-6 flex items-center bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 max-w-lg">
                 <Lightbulb className="text-indigo-600 mr-3 shrink-0" />
                 <p className="text-xs font-bold kalam text-indigo-900 italic">
                   "Remember: Every <b>Objective</b> should have a corresponding <b>Evaluation Criterion</b> to prove it was achieved!"
                 </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Teacher's Summary Note */}
      <div className="bg-yellow-100/50 p-6 rounded-3xl border-2 border-dashed border-yellow-300 flex items-start space-x-6">
        <div className="bg-yellow-400 p-3 rounded-2xl shadow-sm rotate-3">
          <MessageSquare className="text-yellow-900" size={24} />
        </div>
        <div>
          <h4 className="font-black handwritten text-xl text-yellow-900 mb-1">Teacher's Note: Criterion A Mastery</h4>
          <p className="text-sm kalam text-yellow-800 leading-relaxed font-bold">
            "In your IBDP Computer Science IA, Criterion A is about being a 'Bridge' between the user's messy reality and your clean technical logic. If your Input specs are clear, your variables will be easy to name. If your Constraints are solid, your platform choice will be easy to justify!"
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal Sub-components
const ConstraintBox = ({ icon: Icon, title, desc, example }: any) => (
  <div className="p-4 bg-white sketch-border flex flex-col items-center text-center group hover:bg-slate-900 hover:text-white transition-all duration-300">
    <div className="p-2 bg-slate-100 rounded-lg mb-3 group-hover:bg-slate-800">
      <Icon className="text-slate-600 group-hover:text-yellow-400" size={24} />
    </div>
    <h5 className="font-black text-xs uppercase mb-1">{title}</h5>
    <p className="text-[10px] kalam font-bold opacity-70 leading-tight mb-3">{desc}</p>
    <div className="mt-auto pt-2 border-t border-slate-100 w-full text-[9px] font-mono italic text-slate-400">
      e.g. {example}
    </div>
  </div>
);

export default B1SpecSection;
