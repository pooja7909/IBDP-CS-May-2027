import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  ZoomIn, Layout, Database, GitBranch, Info, CheckCircle2, 
  HelpCircle, Sparkles, BookOpenCheck,
  RefreshCcw, MessageSquare, Book,
  Wand2, AlertCircle, PlusCircle, ArrowRight, Table, Fingerprint, Calendar,
  Users, UserCheck, ShoppingBag, PenTool, XCircle
} from 'lucide-react';

const SchemaSection: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [showResolution, setShowResolution] = useState(false);
  
  // ERD Lab States
  const [labAnswers, setLabAnswers] = useState<Record<number, string | null>>({});
  const [revealedLab, setRevealedLab] = useState<number | null>(null);

  const schemaLevels = [
    {
      id: 'conceptual',
      title: 'Conceptual Schema',
      icon: ZoomIn,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      focus: 'High-level business rules & entities.',
      detail: 'Defines WHAT data will be stored without technical jargon. Focuses on entity types and relationships.',
      example: 'A Hospital system needs to store data about PATIENTS, DOCTORS, and APPOINTMENTS.'
    },
    {
      id: 'logical',
      title: 'Logical Schema',
      icon: Layout,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      focus: 'Database structures & relationships.',
      detail: 'Defines Tables, Columns, Primary Keys (PK), and Foreign Keys (FK). Language-specific but hardware-independent.',
      example: 'Patient(PID PK, Name, DOB, DoctorID FK)'
    },
    {
      id: 'physical',
      title: 'Physical Schema',
      icon: Database,
      color: 'text-green-600',
      bg: 'bg-green-50',
      focus: 'Data storage & performance.',
      detail: 'The lowest level. Defines how data is physically stored on disk, indexing, and block sizes.',
      example: 'PID INT(11), Name VARCHAR(50), Storage Engine: InnoDB'
    }
  ];

  const erdScenarios = [
    {
      id: 1,
      title: "Citizen and Passport",
      desc: "One citizen has exactly one passport, and one passport belongs to exactly one citizen.",
      correct: "1:1",
      icon: UserCheck,
      explanation: "A classic 1:1 relationship. Neither entity can logically have more than one of the other."
    },
    {
      id: 2,
      title: "Department and Employee",
      desc: "A department can employ many people, but an employee only works in one department.",
      correct: "1:M",
      icon: Users,
      explanation: "A standard 1:M relationship. The 'Many' side (Employee) holds the Foreign Key of the Department."
    },
    {
      id: 3,
      title: "Authors and Books",
      desc: "An author can write multiple books, and a book can have multiple contributing authors.",
      correct: "M:M",
      icon: Book,
      explanation: "Many-to-Many! This is illegal in a Relational DB and MUST be resolved using a Link Table (like 'Authorship')."
    },
    {
      id: 4,
      title: "Customer and Orders",
      desc: "A customer places many orders over time, but each specific order belongs to only one customer.",
      correct: "1:M",
      icon: ShoppingBag,
      explanation: "1:M. The Orders table will contain a 'CustomerID' as a Foreign Key to link back to the specific buyer."
    }
  ];

  const handleLabSelection = (id: number, val: string) => {
    setLabAnswers(prev => ({ ...prev, [id]: val }));
    setRevealedLab(id);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">A3.2 Database Schema</h1>
        <p className="text-xl kalam text-slate-600 italic">"Architecting the Three Levels of Data Reality"</p>
      </div>

      {/* A3.2.1: 3-Level Architecture Infographic */}
      <div className="grid lg:grid-cols-3 gap-6">
        {schemaLevels.map((lvl, idx) => (
          <button 
            key={lvl.id}
            onClick={() => setActiveLevel(idx)}
            className={`p-6 sketch-border text-left transition-all ${lvl.bg} ${activeLevel === idx ? 'ring-4 ring-slate-900 shadow-2xl scale-105' : 'opacity-60 hover:opacity-100'}`}
          >
            <lvl.icon className={lvl.color} size={32} />
            <h3 className="font-black text-xl handwritten mt-4">{lvl.title}</h3>
            <p className="text-[10px] font-black uppercase text-slate-400 mt-1">Level {idx + 1}</p>
          </button>
        ))}
      </div>

      <HandwrittenCard bgColor="bg-white" className="border-4 border-slate-900 shadow-xl">
        <div className="animate-in fade-in slide-in-from-right-4 duration-500" key={activeLevel}>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className={`text-4xl font-black handwritten ${schemaLevels[activeLevel].color}`}>
                {schemaLevels[activeLevel].title}
              </h2>
              <p className="kalam text-lg font-bold leading-relaxed italic">
                "{schemaLevels[activeLevel].focus}"
              </p>
              <p className="text-sm kalam text-slate-700">
                {schemaLevels[activeLevel].detail}
              </p>
              <div className="p-4 bg-slate-900 text-white rounded-2xl sketch-border">
                <h5 className="text-[10px] font-black uppercase text-slate-400 mb-2">Architect's Example:</h5>
                <p className="font-mono text-xs text-yellow-400">{schemaLevels[activeLevel].example}</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8">
               {activeLevel === 0 && <ConceptualVisual />}
               {activeLevel === 1 && <LogicalVisual />}
               {activeLevel === 2 && <PhysicalVisual />}
            </div>
          </div>
        </div>
      </HandwrittenCard>

      {/* A3.2.2: ERD CONSTRUCTION LAB */}
      <section className="space-y-8 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><GitBranch /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">A3.2.2 ERD Construction Lab</h2>
          </div>
          <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Practice Zone</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {erdScenarios.map((scenario) => (
            <HandwrittenCard key={scenario.id} title={scenario.title} bgColor="bg-white" className="border-2 border-slate-200 hover:border-indigo-400 transition-all">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-slate-100 rounded-xl">
                  <scenario.icon className="text-slate-600" size={24} />
                </div>
                <p className="kalam text-sm font-bold text-slate-700 leading-relaxed italic">
                  "{scenario.desc}"
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Select Relationship Type:</p>
                <div className="grid grid-cols-3 gap-2">
                  {['1:1', '1:M', 'M:M'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleLabSelection(scenario.id, type)}
                      className={`py-2 px-3 rounded-xl border-2 font-black text-xs transition-all ${
                        labAnswers[scenario.id] === type
                          ? (type === scenario.correct ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900')
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {labAnswers[scenario.id] && (
                  <div className={`mt-4 p-4 rounded-2xl border-2 animate-in slide-in-from-top-2 ${labAnswers[scenario.id] === scenario.correct ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {labAnswers[scenario.id] === scenario.correct ? (
                        <CheckCircle2 className="text-emerald-600" size={16} />
                      ) : (
                        <XCircle className="text-rose-600" size={16} />
                      )}
                      <span className={`font-black text-[10px] uppercase ${labAnswers[scenario.id] === scenario.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {labAnswers[scenario.id] === scenario.correct ? 'Brilliant Architect!' : 'Try Again!'}
                      </span>
                    </div>
                    <p className="text-[11px] kalam italic text-slate-600 leading-relaxed">
                      {scenario.explanation}
                    </p>
                  </div>
                )}
              </div>
            </HandwrittenCard>
          ))}
        </div>
      </section>

      {/* A3.2.3: Data Types Infographic */}
      <HandwrittenCard title="A3.2.3: Relational Data Types" bgColor="bg-yellow-50" className="border-4 border-yellow-200 shadow-xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white sketch-border flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4"><Fingerprint /></div>
            <h4 className="font-black handwritten text-xl mb-2">String / Text</h4>
            <p className="text-xs font-mono text-slate-500 mb-4">CHAR, VARCHAR, TEXT</p>
            <p className="text-[11px] kalam italic">Used for names, IDs, and any non-calculatable alphanumeric data.</p>
          </div>
          <div className="p-6 bg-white sketch-border flex flex-col items-center text-center">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4"><PlusCircle /></div>
            <h4 className="font-black handwritten text-xl mb-2">Numeric</h4>
            <p className="text-xs font-mono text-slate-500 mb-4">INT, FLOAT, DECIMAL</p>
            <p className="text-[11px] kalam italic">Used for quantities, prices, and IDs that may be auto-incremented.</p>
          </div>
          <div className="p-6 bg-white sketch-border flex flex-col items-center text-center">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl mb-4"><Calendar /></div>
            <h4 className="font-black handwritten text-xl mb-2">Date / Time</h4>
            <p className="text-xs font-mono text-slate-500 mb-4">DATE, TIMESTAMP</p>
            <p className="text-[11px] kalam italic">Critical for logs, expiry dates, and transaction history tracking.</p>
          </div>
        </div>
      </HandwrittenCard>

      {/* A3.2.2: ERD & Table Construction */}
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg"><GitBranch /></div>
          <h2 className="text-3xl font-black handwritten text-slate-900">Many-to-Many Deep Dive</h2>
        </div>

        <HandwrittenCard title="Resolving Many-to-Many (M:M)" bgColor="bg-purple-50" className="border-4 border-purple-900">
           <p className="kalam text-lg mb-8">Relational databases CANNOT handle direct Many-to-Many links. We must resolve them with a <b>Link Table</b>.</p>
           
           <div className="flex flex-col md:flex-row items-center justify-around gap-12 bg-white p-10 sketch-border shadow-xl">
              <div className="text-center">
                 <div className="w-28 h-20 border-4 border-slate-900 bg-slate-100 flex items-center justify-center font-black rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">AUTHOR</div>
                 <p className="text-[10px] font-mono mt-2">PK: AuthID</p>
              </div>

              {!showResolution ? (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-red-500 uppercase mb-2 animate-pulse">Illegal M:M Link</span>
                  <div className="w-48 h-1 bg-red-400 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex"><CrowFoot /></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180 flex"><CrowFoot /></div>
                  </div>
                  <button onClick={() => setShowResolution(true)} className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full font-black text-xs hover:scale-105 transition-all shadow-lg">RESOLVE RELATIONSHIP</button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-4 animate-in zoom-in duration-500">
                  <div className="w-20 h-1 bg-indigo-500 flex items-center justify-end"><CrowFoot /></div>
                  <div className="w-32 h-24 border-4 border-indigo-600 bg-indigo-50 flex flex-col items-center justify-center rounded-xl p-2 text-center rotate-2">
                    <h4 className="text-[10px] font-black text-indigo-900">AUTHORSHIP</h4>
                    <p className="text-[8px] font-mono text-slate-500 mt-1">AuthID FK<br/>BookID FK</p>
                  </div>
                  <div className="w-20 h-1 bg-indigo-500 flex items-center justify-end rotate-180"><CrowFoot /></div>
                </div>
              )}

              <div className="text-center">
                 <div className="w-28 h-20 border-4 border-slate-900 bg-slate-100 flex items-center justify-center font-black rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">BOOK</div>
                 <p className="text-[10px] font-mono mt-2">PK: BookID</p>
              </div>
           </div>
           {showResolution && (
             <p className="mt-8 text-center kalam text-emerald-600 font-bold">Successfully resolved into two 1:M relationships!</p>
           )}
        </HandwrittenCard>
      </div>
    </div>
  );
};

// Visual Helpers
const ConceptualVisual = () => (
  <div className="flex items-center space-x-6">
    <div className="p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded font-black text-xs">CUSTOMER</div>
    <div className="w-12 h-0.5 bg-slate-400"></div>
    <div className="p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded font-black text-xs">ORDER</div>
  </div>
);

const LogicalVisual = () => (
  <div className="space-y-4">
    <div className="p-3 bg-white border-2 border-indigo-200 rounded-lg">
      <h5 className="text-[10px] font-black text-indigo-700 underline mb-2">Orders Table</h5>
      <div className="text-[10px] font-mono space-y-1">
        <div>OrderID (PK)</div>
        <div>CustID (FK)</div>
        <div>OrderDate</div>
      </div>
    </div>
  </div>
);

const PhysicalVisual = () => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-24 h-12 bg-slate-900 rounded-t-xl border-t-4 border-emerald-500"></div>
    <div className="w-24 h-12 bg-slate-800 border-t-2 border-slate-700"></div>
    <div className="w-24 h-12 bg-slate-800 rounded-b-xl border-t-2 border-slate-700"></div>
  </div>
);

const CrowFoot = () => (
  <div className="relative h-6 w-4">
    <div className="absolute top-1/2 left-0 h-1 w-4 bg-indigo-500 rotate-[35deg] origin-left rounded-full"></div>
    <div className="absolute top-1/2 left-0 h-1 w-4 bg-indigo-500 -rotate-[35deg] origin-left rounded-full"></div>
    <div className="absolute top-1/2 left-0 h-6 w-1 bg-indigo-500 -translate-y-1/2"></div>
  </div>
);

export default SchemaSection;