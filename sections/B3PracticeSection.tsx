
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Trophy, CheckCircle, XCircle, ShieldCheck, Zap, 
  Lock, Unlock, Code, PenTool, BookOpenCheck, 
  AlertCircle, Shapes, GitBranch, Target, HelpCircle
} from 'lucide-react';

const B3PracticeSection: React.FC = () => {
  const [showMS, setShowMS] = useState(false);
  const [activeTab, setActiveTab] = useState<'mcq' | 'written'>('mcq');
  const [quiz, setQuiz] = useState<Record<number, number | null>>({});

  const mcqs = [
    {
      id: 1,
      topic: "Encapsulation",
      q: "Which access modifier ensures that an attribute is hidden from the main program and can only be accessed via methods?",
      options: ["Public", "Protected", "Private", "Global"],
      correct: 2,
      feedback: "Private attributes are the cornerstone of encapsulation and information hiding."
    },
    {
      id: 2,
      topic: "Inheritance",
      q: "In an 'is-a' relationship, if 'ElectricCar' inherits from 'Vehicle', which statement is true?",
      options: [
        "Vehicle is the subclass",
        "ElectricCar inherits all private attributes of Vehicle",
        "ElectricCar is the specialized subclass",
        "Vehicle cannot have any other subclasses"
      ],
      correct: 2,
      feedback: "ElectricCar is a specialized version of the general Vehicle class."
    },
    {
      id: 3,
      topic: "Class Design",
      q: "What is the primary role of a constructor method in a class?",
      options: [
        "To destroy an object when finished",
        "To initialize the starting state of an object",
        "To hide the class attributes from the user",
        "To define the static methods of the class"
      ],
      correct: 1,
      feedback: "Constructors (like __init__ in Python) set the initial values for attributes."
    },
    {
      id: 4,
      topic: "Polymorphism",
      q: "Calling a method '.move()' on a list of different objects (Bird, Fish, Car) and having each act differently is an example of:",
      options: ["Static Overloading", "Dynamic Overriding", "Encapsulation", "Decomposition"],
      correct: 1,
      feedback: "This is runtime polymorphism, where the specific object's overridden method is executed."
    },
    {
      id: 5,
      topic: "Static Variables",
      q: "A variable defined within a class but outside any methods, shared by all instances, is a:",
      options: ["Instance Variable", "Global Constant", "Static/Class Variable", "Private Attribute"],
      correct: 2,
      feedback: "Static variables are shared across the entire class, not unique to one object."
    }
  ];

  const writtenQuestions = [
    {
      id: "Q6",
      title: "Encapsulation Logic",
      marks: 3,
      q: "Explain how encapsulation helps maintain the integrity of a 'BankAccount' object's balance attribute."
    },
    {
      id: "Q7",
      title: "Inheritance & Code Reuse",
      marks: 4,
      q: "Define inheritance and explain two advantages it provides to software developers in large projects."
    },
    {
      id: "Q8",
      title: "UML Design Task",
      marks: 6,
      q: "Construct a design for a 'SmartDevice' class. Include two private attributes, a constructor, and one public method. Use UML notation standards."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">Topic B3 Practice Lab</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Object-Oriented Logic & Design Mastery"</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 sticky top-4 z-40">
        <button 
          onClick={() => setActiveTab('mcq')}
          className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'mcq' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-200'}`}
        >
          SECTION A: MCQs
        </button>
        <button 
          onClick={() => setActiveTab('written')}
          className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'written' ? 'bg-indigo-600 text-white border-indigo-800 shadow-xl' : 'bg-white text-slate-500 border-slate-200'}`}
        >
          SECTION B: WRITTEN
        </button>
      </div>

      {activeTab === 'mcq' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-4">
          {mcqs.map((q, idx) => (
            <HandwrittenCard key={idx} title={`Question ${q.id}`} bgColor="bg-white" className="flex flex-col border-2 border-slate-100 hover:border-slate-300 transition-all">
               <span className="text-[10px] font-black uppercase text-indigo-500 mb-2 tracking-widest">{q.topic}</span>
               <p className="kalam text-sm font-bold mb-6 text-slate-700 leading-tight italic">"{q.q}"</p>
               <div className="space-y-2 mt-auto">
                  {q.options.map((opt, oIdx) => (
                    <button 
                      key={oIdx}
                      onClick={() => setQuiz({...quiz, [idx]: oIdx})}
                      className={`w-full text-left p-3 rounded-xl border-2 font-black text-[10px] transition-all flex justify-between items-center ${quiz[idx] === oIdx ? (oIdx === q.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                    >
                      {opt}
                      {quiz[idx] === oIdx && (oIdx === q.correct ? <CheckCircle size={12}/> : <XCircle size={12}/>)}
                    </button>
                  ))}
               </div>
               {quiz[idx] !== undefined && (
                 <div className="mt-4 p-2 bg-indigo-50 rounded-lg text-[9px] font-bold kalam text-indigo-700 animate-in zoom-in-95">
                    {q.feedback}
                 </div>
               )}
            </HandwrittenCard>
          ))}
          <div className="flex items-center justify-center p-8 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] opacity-50">
             <div className="text-center">
                <HelpCircle size={48} className="mx-auto text-slate-300 mb-2" />
                <p className="kalam text-xs font-bold text-slate-400 italic">"More challenges coming in DP2 Review!"</p>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'written' && (
        <div className="space-y-8 animate-in slide-in-from-right-4">
          {writtenQuestions.map((q) => (
            <HandwrittenCard key={q.id} title={q.title} bgColor="bg-white" className="border-4 border-slate-900 shadow-xl relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1 rounded font-black text-xs">
                 {q.marks} Marks
               </div>
               <p className="kalam text-xl font-bold text-slate-800 leading-relaxed italic mb-8">
                 {q.id}. "{q.q}"
               </p>
               <div className="h-32 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center">
                    <PenTool size={14} className="mr-2"/> Plan your response here...
                  </p>
               </div>
            </HandwrittenCard>
          ))}
        </div>
      )}

      {/* Mark Scheme Section */}
      <div className="text-center pt-12">
        <button 
          onClick={() => setShowMS(!showMS)}
          className="px-16 py-5 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-2xl flex items-center mx-auto active:scale-95"
        >
          {showMS ? <><Unlock className="mr-3" /> HIDE SOLUTIONS</> : <><BookOpenCheck className="mr-3" /> OPEN MASTER MARK SCHEME</>}
        </button>

        {showMS && (
          <div className="mt-16 text-left animate-in fade-in slide-in-from-bottom-8 duration-500">
            <HandwrittenCard title="Formal IBDP Mark Scheme: Topic B3" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 shadow-[15px_15px_0px_0px_rgba(30,41,59,1)]">
              <div className="grid lg:grid-cols-2 gap-12 p-4">
                <div className="space-y-10">
                  <div className="border-b-2 border-slate-800 pb-6">
                    <div className="flex items-center space-x-2 text-rose-400 mb-4">
                       <Lock size={20}/>
                       <h4 className="font-black text-xl handwritten uppercase tracking-tighter">B3.1.5 Encapsulation</h4>
                    </div>
                    <MSItem marks="3" question="Q6. Explain how encapsulation helps maintain integrity.">
                      Encapsulation hides the balance attribute (making it private) [1]. Access is only possible through public methods like deposit() or withdraw() [1]. These methods can include validation logic to prevent invalid states, such as negative balances [1].
                    </MSItem>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-indigo-400 mb-4">
                       <GitBranch size={20}/>
                       <h4 className="font-black text-xl handwritten uppercase tracking-tighter">B3.2.1 Inheritance</h4>
                    </div>
                    <MSItem marks="4" question="Q7. Define inheritance and its advantages.">
                      Definition: The mechanism where a subclass acquires attributes and methods from a superclass [1]. <br/>
                      Advantages:<br/>
                      1. <b>Code Reusability [1]:</b> Common code is written once in the parent class and shared.<br/>
                      2. <b>Scalability [1]:</b> Easy to add new specific types without changing existing code.<br/>
                      3. <b>Maintenance [1]:</b> Changes in the parent class automatically propagate to all child classes.
                    </MSItem>
                  </div>
                </div>

                <div className="space-y-10">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-400 mb-4">
                       <Shapes size={20}/>
                       <h4 className="font-black text-xl handwritten uppercase tracking-tighter">B3.1.2 Class Design</h4>
                    </div>
                    <MSItem marks="6" question="Q8. Construct a SmartDevice UML design.">
                      - Rectangular box with 3 sections [1].<br/>
                      - Top section: SmartDevice name [1].<br/>
                      - Mid section: Two private attributes (e.g., -id: String, -battery: int) [2].<br/>
                      - Bottom section: Constructor (e.g., +__init__(id)) [1].<br/>
                      - Bottom section: One public method (e.g., +turnOn(): void) [1].
                    </MSItem>
                  </div>

                  <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 relative overflow-hidden">
                    <Trophy size={80} className="absolute -right-4 -bottom-4 text-yellow-400 opacity-10 rotate-12" />
                    <h5 className="text-yellow-400 font-black text-xs uppercase mb-4 tracking-widest flex items-center">
                      <Target size={14} className="mr-2"/> Mastery Checklist:
                    </h5>
                    <ul className="text-[10px] font-mono text-slate-400 space-y-3 uppercase leading-tight">
                      <li className="flex items-start"><CheckCircle size={10} className="mr-2 mt-0.5 text-emerald-500 shrink-0"/> Distinguish static/instance variables</li>
                      <li className="flex items-start"><CheckCircle size={10} className="mr-2 mt-0.5 text-emerald-500 shrink-0"/> Use getters and setters correctly</li>
                      <li className="flex items-start"><CheckCircle size={10} className="mr-2 mt-0.5 text-emerald-500 shrink-0"/> Understand is-a vs has-a relationships</li>
                      <li className="flex items-start"><CheckCircle size={10} className="mr-2 mt-0.5 text-emerald-500 shrink-0"/> Model real-world entities into OOP</li>
                    </ul>
                  </div>
                </div>
              </div>
            </HandwrittenCard>
          </div>
        )}
      </div>
    </div>
  );
};

const MSItem = ({ marks, question, children }: any) => (
  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors mb-6">
     <p className="text-[11px] font-black text-slate-200 mb-2 flex items-start">
        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded mr-3 shrink-0">[{marks} Marks]</span>
        <span className="leading-relaxed">{question}</span>
     </p>
     <div className="text-[11px] kalam italic text-slate-400 leading-relaxed pl-6 border-l-2 border-slate-700 ml-3">
        {children}
     </div>
  </div>
);

export default B3PracticeSection;
