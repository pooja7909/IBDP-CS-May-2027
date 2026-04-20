import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { HelpCircle, Trophy, CheckCircle, XCircle, Lightbulb, Lock, Unlock, GitBranch, Binary } from 'lucide-react';

const B1PracticeSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [showMS, setShowMS] = useState(false);

  const questions = [
    {
      id: 1,
      q: "A developer is writing a banking app and decides to hide the complex encryption math behind a 'Send Money' button. Which CT concept is this?",
      options: ["Decomposition", "Abstraction", "Pattern Recognition", "Algorithmic Thinking"],
      correct: 1,
      explanation: "Abstraction hides complex backend details (the math) to provide a simple interface (the button)."
    },
    {
      id: 2,
      q: "Which flowchart symbol is used for the instruction: 'INPUT Radius'?",
      options: ["Rectangle", "Diamond", "Parallelogram", "Oval"],
      correct: 2,
      explanation: "Input and Output operations always use a Parallelogram shape."
    },
    {
      id: 3,
      q: "Dividing a recipe for lasagna into: 'Making the Sauce', 'Boiling the Pasta', and 'Assembling the layers' is an example of:",
      options: ["Decomposition", "Abstraction", "Pattern Recognition", "Algorithmic Thinking"],
      correct: 0,
      explanation: "Decomposition breaks a large task into smaller sub-tasks."
    },
    {
      id: 4,
      q: "In a flowchart, what does a diamond shape with two exit arrows labeled 'Yes' and 'No' represent?",
      options: ["A loop termination", "A process step", "A decision point", "A terminal point"],
      correct: 2,
      explanation: "The diamond is the selection symbol used for decisions."
    },
    {
      id: 5,
      q: "Which of the following describes 'Decomposition'?",
      options: [
        "Finding trends in data",
        "Removing details for clarity",
        "Breaking a problem into sub-problems",
        "Writing code in Python"
      ],
      correct: 2,
      explanation: "Decomposition is specifically the act of breaking things down into smaller pieces."
    }
  ];

  const handleAnswer = (qIdx: number, oIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">B1 Practice Lab</h1>
        <p className="text-xl kalam text-slate-600 italic">"Final Logic Mastery Review"</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {questions.map((q, qIdx) => (
          <HandwrittenCard key={qIdx} title={`Question ${qIdx + 1}`} bgColor="bg-white">
            <p className="kalam text-sm font-bold mb-6">{q.q}</p>
            <div className="space-y-3">
              {q.options.map((opt, oIdx) => (
                <button 
                  key={oIdx}
                  onClick={() => handleAnswer(qIdx, oIdx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-black text-xs flex justify-between items-center ${
                    answers[qIdx] === oIdx 
                      ? (oIdx === q.correct ? 'bg-green-100 border-green-600 text-green-900' : 'bg-red-100 border-red-600 text-red-900')
                      : 'bg-slate-50 border-slate-200 hover:border-slate-900'
                  }`}
                >
                  {opt}
                  {answers[qIdx] === oIdx && (oIdx === q.correct ? <CheckCircle size={16}/> : <XCircle size={16}/>)}
                </button>
              ))}
            </div>
            {answers[qIdx] !== undefined && (
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-[10px] kalam italic border border-indigo-100 animate-in slide-in-from-top-2">
                 <Lightbulb size={12} className="inline mr-1 text-yellow-500" /> {q.explanation}
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
          {showMS ? <><Unlock size={20} className="mr-2"/> HIDE MARK SCHEME</> : <><Lock size={20} className="mr-2"/> VIEW FORMAL MARK SCHEME</>}
        </button>

        {showMS && (
          <div className="mt-12 text-left animate-in fade-in slide-in-from-bottom-4">
            <HandwrittenCard title="B1 Formal Mark Scheme" bgColor="bg-slate-50" className="border-4 border-slate-900">
               <div className="space-y-8">
                  <div className="border-b border-slate-200 pb-4">
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Q1. Define Abstraction [2 Marks]</p>
                    <p className="text-[11px] font-bold text-slate-700 italic">
                      - The process of focusing on essential details [1]<br/>
                      - By removing/ignoring irrelevant information [1]
                    </p>
                  </div>
                  <div className="border-b border-slate-200 pb-4">
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Q2. Explain why Decomposition is used [3 Marks]</p>
                    <ul className="text-[11px] font-bold text-slate-700 italic list-disc pl-5">
                      <li>Makes complex problems more manageable [1]</li>
                      <li>Allows different parts of a project to be developed in parallel [1]</li>
                      <li>Improves readability and testing of the final code [1]</li>
                    </ul>
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Q3. Identify Flowchart Standards [3 Marks]</p>
                    <p className="text-[11px] font-bold text-slate-700 italic leading-relaxed">
                      - Parallelogram: Input/Output [1]<br/>
                      - Diamond: Decision/Selection [1]<br/>
                      - Rectangle: Process/Assignment [1]
                    </p>
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-black uppercase text-slate-400 mb-2">Q4. Differentiate Output vs Constraint [4 Marks]</p>
                    <p className="text-[11px] font-bold text-slate-700 italic leading-relaxed">
                      Output is the result or data produced by a system (e.g. a report) [1]. 
                      A constraint is a limitation or restriction on the system's design (e.g. must run on 4GB RAM) [1].
                      (Award 2 additional marks for clear examples of each).
                    </p>
                  </div>
               </div>
               <div className="mt-10 flex flex-col items-center py-6 bg-slate-900 rounded-3xl text-white">
                  <Trophy size={48} className="text-yellow-400 mb-2"/>
                  <h5 className="text-xl font-black handwritten">B1 Mastered!</h5>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Computational Thinking & Logic Review Complete.</p>
               </div>
            </HandwrittenCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default B1PracticeSection;