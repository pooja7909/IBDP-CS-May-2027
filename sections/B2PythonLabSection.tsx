import React, { useState, useEffect } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Terminal, Play, RefreshCw, CheckCircle2, AlertCircle, 
  Code, Star, Trophy, ArrowRight, Table, Info, 
  Cpu, List, Repeat, Database, Search,
  Plus, Trash2, Lightbulb, Eye, ChevronDown, Binary,
  FunctionSquare, ShieldAlert, Lock, Unlock, Save, FileCode
} from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  topic: string;
  objective: string;
  hint: string;
  initialCode: string;
  logicCheck: (code: string) => boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Variable Mastery",
    topic: "Fundamentals",
    objective: "Create a variable named 'score' and set it to 100. Then print it.",
    hint: "Use score = 100 and print(score)",
    initialCode: "# Mission 1\n",
    logicCheck: (code) => /score\s*=\s*100/.test(code) && /print\(score\)/.test(code)
  },
  {
    id: 2,
    title: "Dynamic Lists",
    topic: "Data Structures",
    objective: "Create a list named 'fruits' with 'apple'. Append 'banana' and print the list.",
    hint: "fruits = ['apple'], fruits.append('banana')",
    initialCode: "fruits = ['apple']\n",
    logicCheck: (code) => /fruits\.append\(.*\)/.test(code) && /print\(fruits\)/.test(code)
  },
  {
    id: 3,
    title: "The For Loop",
    topic: "Control Flow",
    objective: "Use a FOR loop to print numbers from 0 to 4.",
    hint: "for i in range(5): print(i)",
    initialCode: "# Write your loop below\n",
    logicCheck: (code) => /for\s+\w+\s+in\s+range\(5\):/.test(code) && /print\(.*\)/.test(code)
  },
  {
    id: 4,
    title: "Conditional Logic",
    topic: "Selection",
    objective: "Create a variable 'age'. If age is greater than 18, print 'Adult'.",
    hint: "age = 20, if age > 18: print('Adult')",
    initialCode: "age = 20\n",
    logicCheck: (code) => /if\s+age\s*>\s*18:/.test(code) && /print\(['"]Adult['"]\)/.test(code)
  },
  {
    id: 5,
    title: "String Slicing",
    topic: "Strings",
    objective: "Given word = 'Computer', print the first 4 characters using slicing.",
    hint: "print(word[0:4])",
    initialCode: "word = 'Computer'\n",
    logicCheck: (code) => /print\(word\[0:4\]\)/.test(code)
  },
  {
    id: 6,
    title: "Nested Logic",
    topic: "Complex Selection",
    objective: "If x is positive and even, print 'Found'.",
    hint: "if x > 0 and x % 2 == 0: print('Found')",
    initialCode: "x = 10\n",
    logicCheck: (code) => /if.*x\s*>\s*0.*and.*x\s*%\s*2\s*==\s*0/.test(code)
  },
  {
    id: 7,
    title: "List Summation",
    topic: "Iteration",
    objective: "Sum all numbers in 'nums' using a loop and print the total.",
    hint: "total = 0, for n in nums: total += n",
    initialCode: "nums = [1, 2, 3]\n",
    logicCheck: (code) => /total\s*=\s*0/.test(code) && /for.*in\s*nums/.test(code) && /total\s*\+=\s*/.test(code)
  },
  {
    id: 8,
    title: "While Loop Mastery",
    topic: "Conditional Iteration",
    objective: "Create count = 1. While count is less than 5, print it and add 1.",
    hint: "count = 1, while count < 5: print(count), count += 1",
    initialCode: "count = 1\n",
    logicCheck: (code) => /while\s+count\s*<\s*5:/.test(code) && /count\s*\+=\s*1/.test(code)
  },
  {
    id: 9,
    title: "Function Definition",
    topic: "Modularity",
    objective: "Define a function 'greet(name)' that prints 'Hello ' + name.",
    hint: "def greet(name): print('Hello ' + name)",
    initialCode: "# Define function here\n",
    logicCheck: (code) => /def\s+greet\(name\):/.test(code) && /print\(.*\)/.test(code)
  },
  {
    id: 10,
    title: "Exception Handling",
    topic: "Robustness",
    objective: "Use a try/except block to handle a ZeroDivisionError.",
    hint: "try: x = 1/0, except ZeroDivisionError: print('error')",
    initialCode: "# Write try/except block\n",
    logicCheck: (code) => /try:/.test(code) && /except\s+ZeroDivisionError:/.test(code)
  },
  {
    id: 11,
    title: "Mission 11: The Logger",
    topic: "File Handling (Append)",
    objective: "Open 'log.txt' in APPEND mode ('a') and write 'Access Granted'.",
    hint: "with open('log.txt', 'a') as f: f.write('Access Granted')",
    initialCode: "# Log access here\n",
    logicCheck: (code) => /open\(.*['"]log\.txt['"]\s*,\s*['"]a['"]\)/.test(code) && /\.write\(.*\)/.test(code)
  },
  {
    id: 12,
    title: "Mission 12: File Reader",
    topic: "File Handling (Read)",
    objective: "Open 'data.txt' in READ mode and print every line using a loop.",
    hint: "with open('data.txt', 'r') as f: for line in f: print(line)",
    initialCode: "# Read file here\n",
    logicCheck: (code) => /open\(.*['"]data\.txt['"]\s*,\s*['"]r['"]\)/.test(code) && /for\s+.*\s+in\s+.*\s*:/.test(code)
  }
];

interface TraceMission {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'HL';
  code: string;
  vars: string[];
  expected: { iter: string; values: string[] }[];
  explanation: string;
  hint?: string;
}

const TRACE_MISSIONS: TraceMission[] = [
  {
    id: 1,
    title: "Basic Sequence",
    difficulty: "Easy",
    code: "x = 10\ny = x + 5\nx = x * 2",
    vars: ["x", "y"],
    expected: [
      { iter: "1", values: ["20", "15"] }
    ],
    explanation: "Linear execution. x is updated twice. Final x is 20, y remains 15.",
    hint: "Follow the code line by line. Update x twice!"
  },
  {
    id: 2,
    title: "The Simple While",
    difficulty: "Easy",
    code: "a = 1\nwhile a < 4:\n    a = a + 1",
    vars: ["a"],
    expected: [
      { iter: "1", values: ["2"] },
      { iter: "2", values: ["3"] },
      { iter: "3", values: ["4"] }
    ],
    explanation: "The loop runs 3 times until 'a' is no longer less than 4.",
    hint: "The value of 'a' increases by 1 each time. Stop when 'a' is 4."
  },
  {
    id: 3,
    title: "Accumulator Pattern",
    difficulty: "Easy",
    code: "total = 0\ni = 1\nwhile i <= 3:\n    total = total + i\n    i = i + 1",
    vars: ["total", "i"],
    expected: [
      { iter: "1", values: ["1", "2"] },
      { iter: "2", values: ["3", "3"] },
      { iter: "3", values: ["6", "4"] }
    ],
    explanation: "Common pattern for summing numbers. Total becomes 1, then 1+2=3, then 3+3=6.",
    hint: "Track both total and i. Total is the sum of all i values seen so far."
  },
  {
    id: 4,
    title: "Selection in Loop",
    difficulty: "Medium",
    code: "count = 0\nfor i in range(1, 4):\n    if i % 2 == 0:\n        count = count + 10\n    else:\n        count = count + 1",
    vars: ["i", "count"],
    expected: [
      { iter: "1", values: ["1", "1"] },
      { iter: "2", values: ["2", "11"] },
      { iter: "3", values: ["3", "12"] }
    ],
    explanation: "If i is even (2), add 10. Otherwise, add 1. i cycles through 1, 2, 3.",
    hint: "Only index 2 is even. Use different addition logic for even and odd i."
  },
  {
    id: 5,
    title: "The Countdown",
    difficulty: "Easy",
    code: "timer = 5\nwhile timer > 2:\n    timer = timer - 1",
    vars: ["timer"],
    expected: [
      { iter: "1", values: ["4"] },
      { iter: "2", values: ["3"] },
      { iter: "3", values: ["2"] }
    ],
    explanation: "Loop stops exactly when timer becomes 2.",
    hint: "Timer goes down by 1 each time. Stop as soon as timer reaches 2."
  },
  {
    id: 6,
    title: "String Length Check",
    difficulty: "Medium",
    code: "s = 'IB'\nn = 0\nfor char in s:\n    n = n + 1",
    vars: ["char", "n"],
    expected: [
      { iter: "1", values: ["I", "1"] },
      { iter: "2", values: ["B", "2"] }
    ],
    explanation: "Iterating through a string. 'n' counts the characters.",
    hint: "The variable 'char' takes the value of each letter in 'IB' one by one."
  },
  {
    id: 7,
    title: "Boolean Toggle",
    difficulty: "Medium",
    code: "flag = True\ncount = 0\nwhile flag:\n    count = count + 5\n    if count >= 10:\n        flag = False",
    vars: ["count", "flag"],
    expected: [
      { iter: "1", values: ["5", "True"] },
      { iter: "2", values: ["10", "False"] }
    ],
    explanation: "The flag acts as a sentinel. Once count hits 10, the loop condition fails next check.",
    hint: "The loop runs twice. The second time, the flag switches to False."
  },
  {
    id: 8,
    title: "Nested Logic (1)",
    difficulty: "Hard",
    code: "x = 1\ny = 1\nwhile x < 3:\n    y = y * 2\n    x = x + 1",
    vars: ["x", "y"],
    expected: [
      { iter: "1", values: ["2", "2"] },
      { iter: "2", values: ["3", "4"] }
    ],
    explanation: "Simple exponential growth simulation. y doubles each step.",
    hint: "y doubles (1*2=2, 2*2=4) while x increases by 1."
  },
  {
    id: 9,
    title: "Modulo Filter",
    difficulty: "Medium",
    code: "sum = 0\nfor k in [1, 5, 10]:\n    if k % 5 == 0:\n        sum = sum + k",
    vars: ["k", "sum"],
    expected: [
      { iter: "1", values: ["1", "0"] },
      { iter: "2", values: ["5", "5"] },
      { iter: "3", values: ["10", "15"] }
    ],
    explanation: "Only numbers divisible by 5 (5 and 10) are added to the sum.",
    hint: "Check if k is a multiple of 5 before adding to sum."
  },
  {
    id: 10,
    title: "List Indexing Trace",
    difficulty: "Hard",
    code: "data = [10, 20, 30]\nres = 0\nfor i in range(len(data)):\n    res = res + data[i]",
    vars: ["i", "res"],
    expected: [
      { iter: "1", values: ["0", "10"] },
      { iter: "2", values: ["1", "30"] },
      { iter: "3", values: ["2", "60"] }
    ],
    explanation: "Accessing list elements by index. 0+10, 10+20, 30+30.",
    hint: "i is the index (0, 1, 2). data[i] is the value at that index."
  },
  {
    id: 11,
    title: "The Multiplier",
    difficulty: "Medium",
    code: "m = 2\nfor p in range(1, 4):\n    m = m * p",
    vars: ["p", "m"],
    expected: [
      { iter: "1", values: ["1", "2"] },
      { iter: "2", values: ["2", "4"] },
      { iter: "3", values: ["3", "12"] }
    ],
    explanation: "Calculating factorial-like product: 2*1, 2*2, 4*3.",
    hint: "Multiply m by p in each step."
  },
  {
    id: 12,
    title: "Double Accumulator",
    difficulty: "Hard",
    code: "a = 0\nb = 10\nwhile a < b:\n    a = a + 2\n    b = b - 1",
    vars: ["a", "b"],
    expected: [
      { iter: "1", values: ["2", "9"] },
      { iter: "2", values: ["4", "8"] },
      { iter: "3", values: ["6", "7"] },
      { iter: "4", values: ["8", "6"] }
    ],
    explanation: "Two variables moving toward each other. Stop when a (8) >= b (6).",
    hint: "a goes up by 2, b goes down by 1. Keep going as long as a < b."
  },
  {
    id: 13,
    title: "Swapping Logic",
    difficulty: "Hard",
    code: "val1 = 5\nval2 = 10\ntemp = val1\nval1 = val2\nval2 = temp",
    vars: ["val1", "val2", "temp"],
    expected: [
      { iter: "1", values: ["10", "5", "5"] }
    ],
    explanation: "Classical variable swap using a temporary third location.",
    hint: "Track the movement of values through the temporary variable."
  },
  {
    id: 14,
    title: "Flag Finder",
    difficulty: "Medium",
    code: "found = False\nnums = [1, 3, 5]\nfor n in nums:\n    if n == 3:\n        found = True",
    vars: ["n", "found"],
    expected: [
      { iter: "1", values: ["1", "False"] },
      { iter: "2", values: ["3", "True"] },
      { iter: "3", values: ["5", "True"] }
    ],
    explanation: "Once found is True, it stays True for the rest of the loop.",
    hint: "found only changes when n is exactly 3."
  },
  {
    id: 15,
    title: "Power Calculator",
    difficulty: "Medium",
    code: "base = 2\nexp = 3\nres = 1\nfor _ in range(exp):\n    res = res * base",
    vars: ["_", "res"],
    expected: [
      { iter: "1", values: ["0", "2"] },
      { iter: "2", values: ["1", "4"] },
      { iter: "3", values: ["2", "8"] }
    ],
    explanation: "Calculating 2^3 step by step.",
    hint: "Multiply res by 2 three times."
  },
  {
    id: 16,
    title: "HL: Stack Simulation",
    difficulty: "HL",
    code: "stack = [1, 2]\nstack.append(3)\nval = stack.pop()",
    vars: ["stack", "val"],
    expected: [
      { iter: "1", values: ["[1, 2, 3]", "None"] },
      { iter: "2", values: ["[1, 2]", "3"] }
    ],
    explanation: "LIFO logic. 3 is added then immediately removed and stored in val.",
    hint: "Append adds to the end. Pop removes from the end."
  },
  {
    id: 17,
    title: "Modulo Sum",
    difficulty: "Medium",
    code: "s = 0\nfor i in range(5):\n    if i % 2 != 0:\n        s = s + i",
    vars: ["i", "s"],
    expected: [
      { iter: "1", values: ["0", "0"] },
      { iter: "2", values: ["1", "1"] },
      { iter: "3", values: ["2", "1"] },
      { iter: "4", values: ["3", "4"] },
      { iter: "5", values: ["4", "4"] }
    ],
    explanation: "Adds only odd numbers (1, 3) between 0 and 4. Total: 4.",
    hint: "i % 2 != 0 means i is odd (1, 3)."
  },
  {
    id: 18,
    title: "Nested Loop (Grid)",
    difficulty: "Hard",
    code: "count = 0\nfor r in range(2):\n    for c in range(2):\n        count = count + 1",
    vars: ["r", "c", "count"],
    expected: [
      { iter: "1", values: ["0", "0", "1"] },
      { iter: "2", values: ["0", "1", "2"] },
      { iter: "3", values: ["1", "0", "3"] },
      { iter: "4", values: ["1", "1", "4"] }
    ],
    explanation: "Inner loop completes for every outer loop iteration.",
    hint: "The variable 'c' finishes its full cycle (0, 1) before 'r' increments."
  },
  {
    id: 19,
    title: "HL: Simple Recursive Logic",
    difficulty: "HL",
    code: "# Trace return values\n# f(2) where f(n) = n + f(n-1) and f(0) = 0",
    vars: ["n", "call"],
    expected: [
      { iter: "1", values: ["2", "f(1)"] },
      { iter: "2", values: ["1", "f(0)"] },
      { iter: "3", values: ["0", "Base Case"] }
    ],
    explanation: "Tracing depth of recursion calls before unwinding.",
    hint: "Trace the calls down to the base case n=0."
  },
  {
    id: 20,
    title: "Data Type Mix",
    difficulty: "Medium",
    code: "val = 10\nmsg = 'Score: '\nfinal = msg + str(val)",
    vars: ["val", "final"],
    expected: [
      { iter: "1", values: ["10", "Score: 10"] }
    ],
    explanation: "Casting an integer to string for concatenation.",
    hint: "Python cannot add string and int directly, so we cast with str()."
  },
  {
    id: 21,
    title: "Break Point",
    difficulty: "Hard",
    code: "x = 0\nwhile True:\n    x = x + 2\n    if x > 3:\n        break",
    vars: ["x"],
    expected: [
      { iter: "1", values: ["2"] },
      { iter: "2", values: ["4"] }
    ],
    explanation: "Break ends the loop instantly when the condition is met.",
    hint: "The loop would be infinite, but 'break' stops it when x is 4."
  },
  {
    id: 22,
    title: "DB Update Simulation",
    difficulty: "Hard",
    code: "records = [80, 40, 90]\npassed = 0\nfor r in records:\n    if r >= 50:\n        passed += 1",
    vars: ["r", "passed"],
    expected: [
      { iter: "1", values: ["80", "1"] },
      { iter: "2", values: ["40", "1"] },
      { iter: "3", values: ["90", "2"] }
    ],
    explanation: "Iterating through 'rows' to calculate an aggregate (COUNT).",
    hint: "passed only increments if the grade r is 50 or more."
  }
];

const B2PythonLabSection: React.FC = () => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [code, setCode] = useState(MISSIONS[0].initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [completed, setCompleted] = useState<number[]>([]);
  
  const [activeTraceIdx, setActiveTraceIdx] = useState(0);
  const [traceRows, setTraceRows] = useState<{ iteration: string; values: string[] }[]>([]);
  const [traceStatus, setTraceStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  
  const [showCodingHint, setShowCodingHint] = useState(false);
  const [showTraceHint, setShowTraceHint] = useState(false);

  const mission = MISSIONS[currentMissionIdx];
  const traceMission = TRACE_MISSIONS[activeTraceIdx];

  useEffect(() => {
    resetTraceMission();
  }, [activeTraceIdx]);

  useEffect(() => {
    setShowCodingHint(false);
  }, [currentMissionIdx]);

  const resetTraceMission = () => {
    setTraceRows([{ iteration: '1', values: TRACE_MISSIONS[activeTraceIdx].vars.map(() => '') }]);
    setTraceStatus('idle');
    setShowSolution(false);
    setShowTraceHint(false);
  };

  const handleRunCode = () => {
    setOutput(["Cleaning environment...", ">>> Executing Code Snippet:"]);
    const isCorrect = mission.logicCheck(code);
    setTimeout(() => {
      if (isCorrect) {
        setStatus('success');
        setOutput(prev => [...prev, "✓ Test Passed!", "Logic satisfies mission objectives."]);
        if (!completed.includes(mission.id)) setCompleted([...completed, mission.id]);
      } else {
        setStatus('error');
        setOutput(prev => [...prev, "⚠ Logic error: Output or structure incorrect."]);
      }
    }, 600);
  };

  const addTraceRow = () => {
    setTraceRows([...traceRows, { iteration: (traceRows.length + 1).toString(), values: traceMission.vars.map(() => '') }]);
  };

  const removeTraceRow = (idx: number) => {
    if (traceRows.length <= 1) return;
    setTraceRows(traceRows.filter((_, i) => i !== idx).map((r, i) => ({ ...r, iteration: (i + 1).toString() })));
  };

  const updateTraceCell = (rowIdx: number, valIdx: number, val: string) => {
    const newRows = [...traceRows];
    newRows[rowIdx].values[valIdx] = val;
    setTraceRows(newRows);
    setTraceStatus('idle');
  };

  const checkTraceTable = () => {
    if (traceRows.length !== traceMission.expected.length) {
      setTraceStatus('wrong');
      setShowSolution(true);
      return;
    }
    const isCorrect = traceRows.every((row, rIdx) => 
      row.values.every((val, vIdx) => val.trim() === traceMission.expected[rIdx].values[vIdx])
    );
    setTraceStatus(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) setShowSolution(true);
  };

  const revealTraceSolution = () => {
    setTraceRows(traceMission.expected.map(e => ({ iteration: e.iter, values: [...e.values] })));
    setTraceStatus('correct');
    setShowSolution(false);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Python Mission Control</h1>
        <p className="text-xl kalam text-slate-600 italic">"Write, Test, and Trace Real Code"</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <HandwrittenCard title={`Mission ${mission.id}: ${mission.title}`} bgColor="bg-yellow-50">
            <div className="space-y-4">
               <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-sm relative overflow-hidden">
                  <h5 className="text-[10px] font-black uppercase text-indigo-600 mb-2">Topic: {mission.topic}</h5>
                  <p className="text-sm font-bold kalam leading-relaxed text-slate-700">{mission.objective}</p>
               </div>
               <div className="bg-indigo-900 text-white p-4 rounded-xl border-4 border-slate-900 shadow-xl min-h-[100px] flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-mono uppercase text-indigo-300 flex items-center">
                      <Lightbulb size={12} className="mr-1 text-yellow-400"/> Teacher's Hint:
                    </p>
                    <button 
                      onClick={() => setShowCodingHint(!showCodingHint)}
                      className="text-[8px] font-black uppercase bg-indigo-500 hover:bg-indigo-400 px-2 py-1 rounded transition-colors flex items-center"
                    >
                      {showCodingHint ? <Unlock size={8} className="mr-1"/> : <Lock size={8} className="mr-1"/>}
                      {showCodingHint ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  {showCodingHint ? (
                    <p className="text-[11px] kalam italic text-indigo-100 animate-in fade-in zoom-in-95">"{mission.hint}"</p>
                  ) : (
                    <p className="text-[11px] font-mono italic text-indigo-400/50 text-center">Click reveal to see the tip...</p>
                  )}
               </div>
            </div>
          </HandwrittenCard>

          <div className="p-6 bg-slate-900 text-white rounded-[2rem] border-4 border-slate-900 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-black handwritten text-yellow-400 mb-4 flex items-center">
              <Star className="mr-2" size={18} /> Training Log
            </h3>
            <div className="space-y-2 relative z-10 max-h-[400px] overflow-y-auto pr-2">
              {MISSIONS.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => {
                    setCurrentMissionIdx(m.id - 1);
                    setCode(m.initialCode);
                    setStatus('idle');
                    setOutput([]);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border-2 ${mission.id === m.id ? 'bg-white/10 border-indigo-500 scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <span className="text-[10px] font-mono font-black">{m.id}. {m.title}</span>
                  {completed.includes(m.id) ? <CheckCircle2 className="text-emerald-400" size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <HandwrittenCard title="Python Code Editor" bgColor="bg-slate-950" className="text-indigo-300 border-slate-800 border-4 shadow-2xl">
            <div className="relative">
              <Terminal className="absolute top-4 left-4 text-slate-700" size={24} />
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="# Write your Python logic here..."
                className="w-full h-80 bg-transparent border-2 border-slate-800 focus:border-indigo-500 rounded-xl p-8 pl-14 font-mono text-base focus:outline-none transition-all text-indigo-200 leading-relaxed shadow-inner"
                spellCheck={false}
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex space-x-3 w-full sm:w-auto">
                <button onClick={handleRunCode} className="flex-1 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black flex items-center justify-center shadow-xl active:scale-95 border-b-4 border-indigo-800">
                  <Play size={20} className="mr-2" /> EXECUTE SNIPPET
                </button>
                <button onClick={() => {setCode(mission.initialCode); setStatus('idle'); setOutput([])}} className="p-4 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-700 shadow-lg">
                  <RefreshCw size={20} />
                </button>
              </div>
              {status !== 'idle' && (
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-4 shadow-xl ${status === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'}`}>
                  {status === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                  <span className="text-xs font-black uppercase">{status === 'success' ? 'Achieved' : 'Error'}</span>
                </div>
              )}
            </div>
            <div className="mt-6 p-4 bg-black/60 rounded-xl border border-slate-800 font-mono text-[10px] min-h-[100px] shadow-inner">
               {output.map((line, i) => <div key={i} className="mb-1">{line}</div>)}
            </div>
          </HandwrittenCard>
        </div>
      </div>

      <section className="space-y-8 pt-16 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Table /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">Trace Table Workshop</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <HandwrittenCard title="Select Trace Mission" bgColor="bg-white" className="border-4 border-slate-900 shadow-xl">
               <div className="relative group">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-600 transition-colors" size={20} />
                  <select 
                    value={activeTraceIdx}
                    onChange={(e) => setActiveTraceIdx(parseInt(e.target.value))}
                    className="w-full p-4 pr-12 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-xs appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer shadow-inner"
                  >
                    {TRACE_MISSIONS.map((m, idx) => (
                      <option key={m.id} value={idx}>
                        {m.id}. {m.title} ({m.difficulty})
                      </option>
                    ))}
                  </select>
               </div>
               
               <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden border-b-4 border-slate-950">
                  <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Cpu size={60}/></div>
                  <h4 className="text-xl font-black handwritten text-yellow-400 mb-4">Memory Registers</h4>
                  <div className="flex flex-wrap gap-2">
                     {traceMission.vars.map(v => (
                       <div key={v} className="bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono">
                          {v}
                       </div>
                     ))}
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[10px] font-mono uppercase text-indigo-300 flex items-center">
                         <Lightbulb size={12} className="mr-1 text-yellow-400"/> Logic Hint:
                       </p>
                       <button 
                         onClick={() => setShowTraceHint(!showTraceHint)}
                         className="text-[8px] font-black uppercase bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors flex items-center"
                       >
                         {showTraceHint ? 'Hide' : 'Reveal'}
                       </button>
                    </div>
                    {showTraceHint ? (
                      <p className="text-[10px] kalam text-slate-300 italic font-bold animate-in fade-in slide-in-from-top-1">
                        "{traceMission.hint || "Trace variables iteration by iteration."}"
                      </p>
                    ) : (
                      <p className="text-[9px] font-mono italic text-slate-500 text-center">Need help? Reveal the hint.</p>
                    )}
                  </div>
               </div>
            </HandwrittenCard>
          </div>

          <div className="lg:col-span-8 space-y-6">
             <HandwrittenCard title="Algorithm Snippet" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
                <div className="bg-slate-950 p-8 rounded-3xl text-emerald-400 font-mono text-base shadow-inner relative overflow-hidden">
                   <pre>{traceMission.code}</pre>
                </div>
             </HandwrittenCard>

             <HandwrittenCard title="Interactive Trace Table" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-xs font-mono border-collapse">
                      <thead className="bg-slate-900 text-white uppercase text-[9px] tracking-widest">
                         <tr>
                           <th className="p-5 border-r border-slate-700 w-16 text-center">Iter</th>
                           {traceMission.vars.map(v => (
                             <th key={v} className="p-5 border-r border-slate-700">{v}</th>
                           ))}
                           <th className="p-5 w-16"><RefreshCw size={14}/></th>
                         </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                         {traceRows.map((row, rIdx) => (
                           <tr key={rIdx} className="group hover:bg-indigo-50/30 transition-colors">
                              <td className="p-4 text-center font-black bg-slate-50 border-r border-slate-100 text-slate-400">{row.iteration}</td>
                              {row.values.map((v, vIdx) => (
                                <td key={vIdx} className="p-2 border-r border-slate-100">
                                   <input 
                                     type="text" 
                                     value={v}
                                     onChange={(e) => updateTraceCell(rIdx, vIdx, e.target.value)}
                                     placeholder="..."
                                     className="w-full bg-transparent border-2 border-transparent focus:border-indigo-500 rounded-lg p-3 text-center font-black text-slate-900 outline-none transition-all shadow-none hover:bg-white"
                                   />
                                </td>
                              ))}
                              <td className="p-2 text-center">
                                 <button onClick={() => removeTraceRow(rIdx)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="p-8 bg-slate-50 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <button onClick={addTraceRow} className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-slate-900 rounded-full font-black text-[10px] uppercase hover:bg-slate-900 hover:text-white transition-all shadow-md">Add Row</button>
                   <div className="flex items-center space-x-4 w-full sm:w-auto">
                      {showSolution && (
                        <button onClick={revealTraceSolution} className="px-6 py-3 bg-amber-500 text-white rounded-full font-black text-xs shadow-lg flex items-center animate-pulse"><Eye size={16} className="mr-2"/> SHOW TEACHER'S SOLUTION</button>
                      )}
                      <button onClick={checkTraceTable} className="flex-1 px-12 py-4 bg-slate-900 text-white rounded-full font-black text-sm hover:scale-105 active:scale-95 shadow-2xl border-b-4 border-slate-950 transition-all">VERIFY LOGIC</button>
                   </div>
                </div>

                {traceStatus !== 'idle' && (
                   <div className={`p-8 border-t-4 animate-in slide-in-from-bottom-4 ${traceStatus === 'correct' ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                      <div className="flex items-start space-x-6">
                         <div className={`p-4 rounded-full ${traceStatus === 'correct' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {traceStatus === 'correct' ? <CheckCircle2 size={32}/> : <AlertCircle size={32}/>}
                         </div>
                         <div className="flex-1">
                           <h4 className={`text-2xl font-black handwritten mb-2 ${traceStatus === 'correct' ? 'text-emerald-900' : 'text-rose-900'}`}>
                              {traceStatus === 'correct' ? 'Mission Success!' : 'Logical Error Detected'}
                           </h4>
                           <p className="text-sm kalam font-bold text-slate-600">
                              {traceStatus === 'correct' ? 'You have successfully mapped the algorithm to memory states.' : 'The values in your trace table do not match the expected register states. Click Show Solution to learn.'}
                           </p>
                           {traceStatus === 'correct' && (
                             <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-emerald-200">
                                <h5 className="text-[10px] font-black uppercase text-emerald-600 mb-1">Teacher's Insight:</h5>
                                <p className="text-[11px] kalam italic text-emerald-800">"{traceMission.explanation}"</p>
                             </div>
                           )}
                         </div>
                      </div>
                   </div>
                )}
             </HandwrittenCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2PythonLabSection;