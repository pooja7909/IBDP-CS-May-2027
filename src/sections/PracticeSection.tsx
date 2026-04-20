import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Trophy, HelpCircle, CheckCircle, XCircle, 
  ArrowRight, MousePointer2, Database, Calculator, 
  Link, Lightbulb, RefreshCcw, PenTool, BookOpenCheck,
  ShieldCheck, Zap, AlertTriangle, Fingerprint, Code, Search
} from 'lucide-react';

const PracticeSection: React.FC = () => {
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [quizScores, setQuizScores] = useState<Record<string, string | null>>({});

  const handleQuiz = (id: string, choice: string) => {
    setQuizScores(prev => ({ ...prev, [id]: choice }));
  };

  const sqlQuestions = [
    {
      id: 'sql1',
      title: "SQL Logic: DDL vs DML",
      q: "Which SQL command is used to add a new column 'DateOfBirth' to an existing table 'Patients'?",
      options: ["INSERT INTO Patients", "ALTER TABLE Patients ADD", "UPDATE Patients SET", "CREATE TABLE Patients"],
      correct: "ALTER TABLE Patients ADD",
      topic: "DDL Structure"
    },
    {
      id: 'sql2',
      title: "SQL Querying: Aggregate Functions",
      q: "What is the correct SQL to find the average grade of students in the 'Grades' table?",
      options: ["SELECT COUNT(Grade) FROM Grades", "SELECT AVG(Grade) FROM Grades", "SELECT SUM(Grade) / 2 FROM Grades", "SELECT MEAN(Grade) FROM Grades"],
      correct: "SELECT AVG(Grade) FROM Grades",
      topic: "HL Aggregate Functions"
    },
    {
      id: 'sql3',
      title: "The Power of Joins",
      q: "To show all records from the 'Students' table even if they don't have a matching record in the 'Results' table, you would use a:",
      options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "CROSS JOIN"],
      correct: "LEFT JOIN",
      topic: "Query Logic"
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">A3 Databases Practice Lab</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Applying Logic to Relational Scenarios"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Q1: Anomalies */}
        <HandwrittenCard title="Scenario 1: The Messy Excel" bgColor="bg-white" className="border-4 border-slate-900">
          <p className="kalam text-sm mb-6 font-bold text-slate-700">A librarian cannot add a new book title to their spreadsheet until someone actually borrows it. This is a classic:</p>
          <div className="space-y-3">
            {['Insert Anomaly', 'Update Anomaly', 'Delete Anomaly'].map(opt => (
              <button 
                key={opt}
                onClick={() => handleQuiz('q1', opt)}
                className={`w-full text-left p-4 rounded-xl border-2 font-black text-xs transition-all flex justify-between items-center ${quizScores.q1 === opt ? (opt === 'Insert Anomaly' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-200 hover:border-slate-900'}`}
              >
                {opt}
                {quizScores.q1 === opt && (opt === 'Insert Anomaly' ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
              </button>
            ))}
          </div>
        </HandwrittenCard>

        {/* Q2: Keys */}
        <HandwrittenCard title="Scenario 2: The Identification" bgColor="bg-white" className="border-4 border-slate-900">
          <p className="kalam text-sm mb-6 font-bold text-slate-700">A table 'Enrollments' uses both <u>StudentID</u> and <u>CourseID</u> together as its Primary Key. This is called a:</p>
          <div className="space-y-3">
            {['Foreign Key', 'Composite Key', 'Candidate Key'].map(opt => (
              <button 
                key={opt}
                onClick={() => handleQuiz('q2', opt)}
                className={`w-full text-left p-4 rounded-xl border-2 font-black text-xs transition-all flex justify-between items-center ${quizScores.q2 === opt ? (opt === 'Composite Key' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-200 hover:border-slate-900'}`}
              >
                {opt}
                {quizScores.q2 === opt && (opt === 'Composite Key' ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
              </button>
            ))}
          </div>
        </HandwrittenCard>

        {/* Q3: Normalization */}
        <HandwrittenCard title="Scenario 3: Normalization" bgColor="bg-white" className="border-4 border-slate-900">
          <p className="kalam text-sm mb-6 font-bold text-slate-700">To achieve 3NF, we must remove all dependencies that exist between:</p>
          <div className="space-y-3">
            {['Partial Key Attributes', 'Transitive Non-Key Attributes', 'Multivalued Attributes'].map(opt => (
              <button 
                key={opt}
                onClick={() => handleQuiz('q3', opt)}
                className={`w-full text-left p-4 rounded-xl border-2 font-black text-xs transition-all flex justify-between items-center ${quizScores.q3 === opt ? (opt === 'Transitive Non-Key Attributes' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-200 hover:border-slate-900'}`}
              >
                {opt}
                {quizScores.q3 === opt && (opt === 'Transitive Non-Key Attributes' ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
              </button>
            ))}
          </div>
        </HandwrittenCard>

        {/* Q4: ACID (HL) */}
        <HandwrittenCard title="Scenario 4: ACID (HL)" bgColor="bg-white" className="border-4 border-slate-900">
          <p className="kalam text-sm mb-6 font-bold text-slate-700">Ensuring a transaction stays saved even if the server loses power is:</p>
          <div className="space-y-3">
            {['Atomicity', 'Consistency', 'Isolation', 'Durability'].map(opt => (
              <button 
                key={opt}
                onClick={() => handleQuiz('q4', opt)}
                className={`w-full text-left p-4 rounded-xl border-2 font-black text-xs transition-all flex justify-between items-center ${quizScores.q4 === opt ? (opt === 'Durability' ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-200 hover:border-slate-900'}`}
              >
                {opt}
                {quizScores.q4 === opt && (opt === 'Durability' ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
              </button>
            ))}
          </div>
        </HandwrittenCard>
      </div>

      {/* SQL Interactive Section */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Code /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">A3.3 Interactive SQL Quiz</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {sqlQuestions.map((sq) => (
             <HandwrittenCard key={sq.id} title={sq.title} bgColor="bg-white" className="border-2 border-slate-200 hover:border-indigo-400 transition-all flex flex-col">
               <span className="text-[9px] font-black uppercase text-indigo-500 mb-2 tracking-widest">{sq.topic}</span>
               <p className="text-sm kalam font-bold text-slate-700 mb-6 leading-tight italic">"{sq.q}"</p>
               <div className="space-y-2 mt-auto">
                 {sq.options.map(opt => (
                   <button 
                    key={opt}
                    onClick={() => handleQuiz(sq.id, opt)}
                    className={`w-full text-left p-3 rounded-xl border-2 font-black text-[10px] transition-all flex justify-between items-center ${quizScores[sq.id] === opt ? (opt === sq.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900') : 'bg-slate-50 border-slate-100 hover:border-slate-900'}`}
                   >
                     {opt}
                     {quizScores[sq.id] === opt && (opt === sq.correct ? <CheckCircle size={12}/> : <XCircle size={12}/>)}
                   </button>
                 ))}
               </div>
               {quizScores[sq.id] === sq.correct && (
                 <div className="mt-4 p-2 bg-emerald-50 rounded-lg text-center animate-in zoom-in duration-300">
                    <p className="text-[10px] font-black text-emerald-700">✓ MASTERED!</p>
                 </div>
               )}
             </HandwrittenCard>
           ))}
        </div>
      </section>

      <div className="text-center pt-12">
        <button 
          onClick={() => setShowMarkScheme(!showMarkScheme)}
          className="px-16 py-5 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-2xl flex items-center mx-auto active:scale-95"
        >
          {showMarkScheme ? <><RefreshCcw className="mr-3" /> CLOSE GUIDE</> : <><BookOpenCheck className="mr-3" /> OPEN TEACHER'S MARK SCHEME</>}
        </button>

        {showMarkScheme && (
          <div className="mt-16 text-left animate-in fade-in slide-in-from-bottom-8 duration-500">
            <HandwrittenCard title="Formal IBDP Mark Scheme: A3" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 shadow-[12px_12px_0px_0px_rgba(30,41,59,1)]">
              <div className="grid lg:grid-cols-2 gap-12 p-4">
                <div className="space-y-8">
                  <div className="border-b-2 border-slate-800 pb-6">
                    <div className="flex items-center space-x-2 text-indigo-400 mb-3">
                       <Zap size={18}/>
                       <h4 className="font-black text-lg handwritten">A3.1 Core Features</h4>
                    </div>
                    <div className="space-y-4">
                      <MSItem marks="2" question="Outline the purpose of a Foreign Key.">
                        A Foreign Key is a primary key from another table [1] that acts as a link between two tables to create a relationship [1].
                      </MSItem>
                      <MSItem marks="3" question="Explain why flat files lead to redundancy.">
                        Data must be repeated for every new record [1], causing data inconsistency if one entry is updated but not others [1], and wasting storage space [1].
                      </MSItem>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-pink-400 mb-3">
                       <ShieldCheck size={18}/>
                       <h4 className="font-black text-lg handwritten">A3.2 Normalization</h4>
                    </div>
                    <div className="space-y-4">
                      <MSItem marks="2" question="Describe the requirement for 1NF.">
                        All attributes must be atomic (one value per cell) [1] and there must be no repeating groups [1].
                      </MSItem>
                      <MSItem marks="4" question="Evaluate the need for Denormalization.">
                        Advan: Faster read queries / fewer Joins [1]. Disadvan: Increased redundancy [1], higher risk of update anomalies [1], more storage required [1].
                      </MSItem>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="border-b-2 border-slate-800 pb-6">
                    <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                       <Database size={18}/>
                       <h4 className="font-black text-lg handwritten">A3.3 SQL Master</h4>
                    </div>
                    <div className="space-y-4">
                      <MSItem marks="3" question="Distinguish between DDL and DML.">
                        DDL defines the structure (e.g. CREATE) [1]. DML manages the data (e.g. SELECT/INSERT) [1]. DDL is used by DBAs, DML by applications [1].
                      </MSItem>
                      <MSItem marks="2" question="Define a Database View.">
                        A virtual table created by a SELECT query [1] that provides security by hiding sensitive columns [1].
                      </MSItem>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h5 className="text-yellow-400 font-black mb-3 flex items-center tracking-tighter uppercase"><Calculator className="mr-2" size={16}/> HL Section: ACID [4 Marks]</h5>
                    <ul className="text-[10px] font-mono text-slate-400 space-y-2 uppercase leading-tight">
                      <li>• <b>Atomicity:</b> Transaction is all or nothing [1].</li>
                      <li>• <b>Consistency:</b> Database rules are always valid [1].</li>
                      <li>• <b>Isolation:</b> Concurrent tasks don't collide [1].</li>
                      <li>• <b>Durability:</b> Data is safe once committed [1].</li>
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
  <div className="bg-white/5 p-4 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors">
     <p className="text-[11px] font-black text-slate-200 mb-1 flex items-center">
        <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded mr-2">[{marks} Marks]</span>
        {question}
     </p>
     <p className="text-[11px] kalam italic text-slate-400 leading-relaxed pl-4 border-l-2 border-slate-700">
        {children}
     </p>
  </div>
);

export default PracticeSection;