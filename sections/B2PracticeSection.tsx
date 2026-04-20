import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Terminal, Trophy, HelpCircle, CheckCircle, XCircle, 
  RotateCcw, ArrowRight, Play, Info, PenTool, Lock, Unlock
} from 'lucide-react';

const B2PracticeSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [showMS, setShowMS] = useState(false);

  const questions = [
    {
      id: 1,
      q: "Which data type would you use to store a student's final percentage (e.g., 85.5)?",
      options: ["Integer", "String", "Float/Decimal", "Boolean"],
      correct: "Float/Decimal",
      explanation: "Percentages contain decimal points, requiring the Float/Decimal data type."
    },
    {
      id: 2,
      q: "If text = 'PYTHON', what does text[1:4] return?",
      options: ["PYTH", "YTH", "YTHO", "PYT"],
      correct: "YTH",
      explanation: "Slicing starts at index 1 ('Y') and stops BEFORE index 4 ('O'), so: index 1, 2, 3 (Y, T, H)."
    },
    {
      id: 3,
      q: "What is the Big O efficiency of Binary Search?",
      options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
      correct: "O(log N)",
      explanation: "Binary search halves the search space every step, resulting in logarithmic complexity."
    },
    {
      id: 4,
      q: "Which keyword in Python handles the code that runs when an error occurs in a 'try' block?",
      options: ["catch", "error", "except", "handle"],
      correct: "except",
      explanation: "Python uses 'try...except' syntax (unlike Java/JS which use try...catch)."
    }
  ];

  const handleAnswer = (qIdx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">B2 Python Practice Lab</h1>
        <p className="text-xl kalam text-slate-600 italic">"Testing your Programming Logic"</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {questions.map((q, qIdx) => (
          <HandwrittenCard key={qIdx} title={`Question ${qIdx + 1}`} bgColor="bg-white">
            <p className="kalam text-sm font-bold mb-6">{q.q}</p>
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button 
                  key={opt}
                  onClick={() => handleAnswer(qIdx, opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-black text-xs flex justify-between items-center ${
                    answers[qIdx] === opt 
                      ? (opt === q.correct ? 'bg-green-100 border-green-600 text-green-900' : 'bg-red-100 border-red-600 text-red-900')
                      : 'bg-slate-50 border-slate-200 hover:border-slate-900'
                  }`}
                >
                  {opt}
                  {answers[qIdx] === opt && (opt === q.correct ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
                </button>
              ))}
            </div>
            {answers[qIdx] && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-in slide-in-from-top-2">
                 <p className="text-[10px] kalam italic text-slate-600">
                   <Info size={12} className="inline mr-1 text-indigo-500"/> {q.explanation}
                 </p>
              </div>
            )}
          </HandwrittenCard>
        ))}
      </div>

      <div className="text-center pt-8">
         <button 
          onClick={() => setShowMS(!showMS)}
          className="px-12 py-4 bg-slate-900 text-white rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center mx-auto"
        >
          {showMS ? <><Unlock size={20} className="mr-2"/> HIDE SOLUTIONS</> : <><Lock size={20} className="mr-2"/> VIEW MARK SCHEME</>}
        </button>

        {showMS && (
          <div className="mt-12 text-left animate-in fade-in slide-in-from-bottom-4">
             <HandwrittenCard title="B2 Formal Mark Scheme" bgColor="bg-slate-50" className="border-4 border-slate-900 shadow-2xl">
                <div className="space-y-8">
                   <div className="border-b border-slate-200 pb-4">
                      <p className="text-xs font-black uppercase text-indigo-600 mb-2">B2.1.3: Explain Exception Handling [3 Marks]</p>
                      <ul className="text-[11px] font-bold text-slate-700 italic list-disc pl-5">
                         <li>Ensures program continuity in case of user or runtime error [1]</li>
                         <li>Prevents the software from crashing unexpectedly [1]</li>
                         <li>Allows for specific recovery actions (like closing files) using finally [1]</li>
                      </ul>
                   </div>
                   <div className="border-b border-slate-200 pb-4">
                      <p className="text-xs font-black uppercase text-rose-600 mb-2">B2.4.1: Compare Linear vs Binary Search [4 Marks]</p>
                      <p className="text-[11px] font-bold text-slate-700 italic leading-relaxed">
                         Linear search checks every item [O(N)] while binary search halves data [O(log N)] [1]. 
                         Linear search works on unsorted lists [1] whereas binary search requires pre-sorted data [1]. 
                         Binary search is significantly faster for very large datasets [1].
                      </p>
                   </div>
                   <div className="pb-4">
                      <p className="text-xs font-black uppercase text-purple-600 mb-2">B2.4.4: HL ONLY - Define Base Case [2 Marks]</p>
                      <p className="text-[11px] font-bold text-slate-700 italic leading-relaxed">
                         A condition that stops the recursion from continuing [1]. 
                         Without it, the function calls itself infinitely, leading to a stack overflow error [1].
                      </p>
                   </div>
                </div>
                
                <div className="mt-10 flex flex-col items-center py-10 bg-slate-900 rounded-[3rem] text-white">
                   <Trophy size={64} className="text-yellow-400 mb-4 animate-bounce"/>
                   <h5 className="text-3xl font-black handwritten">Python Module Mastery</h5>
                   <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">B2 Review Completed Successfully.</p>
                </div>
             </HandwrittenCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default B2PracticeSection;