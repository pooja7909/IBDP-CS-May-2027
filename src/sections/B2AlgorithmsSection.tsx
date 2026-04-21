import React, { useState, useEffect, useRef } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Activity, Search, SortAsc, TrendingUp, Info, 
  CheckCircle2, AlertCircle, Play, RotateCcw, 
  BarChart, ArrowRight, Zap, Target, MousePointer2,
  LineChart, Sparkles, Filter, Code, Cpu, Repeat,
  ShieldAlert, FastForward, StepForward, List,
  Terminal, ChevronRight, Binary, ArrowDown, Layers,
  Clock, Gauge, Thermometer, ZapOff, Workflow,
  GitBranch, Square, RotateCw
} from 'lucide-react';

const B2AlgorithmsSection: React.FC = () => {
  // --- States ---
  const [array, setArray] = useState<number[]>([45, 12, 89, 3, 22, 67, 34]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [pivotIdx, setPivotIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithm, setAlgorithm] = useState<string>('linear');
  const [stepInfo, setStepInfo] = useState<string>("Ready to start...");
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [traceVars, setTraceVars] = useState<Record<string, any>>({});
  
  const animationRef = useRef<boolean>(false);

  const reset = () => {
    animationRef.current = false;
    setArray([45, 12, 89, 3, 22, 67, 34]);
    setComparing([]);
    setSorted([]);
    setPivotIdx(null);
    setIsAnimating(false);
    setStepInfo("Algorithm reset. Ready.");
    setActiveLine(null);
    setTraceVars({});
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- Logic Implementations (Animated) ---

  const runLinearSearch = async (target: number) => {
    reset();
    setIsAnimating(true);
    animationRef.current = true;
    
    setStepInfo(`Searching for ${target}...`);
    setActiveLine(1); // def linear_search
    await sleep(600);

    for (let i = 0; i < array.length; i++) {
      if (!animationRef.current) return;
      setComparing([i]);
      setTraceVars({ i, current: array[i], target });
      setActiveLine(2); // for i in range
      setStepInfo(`Checking index ${i}: Is ${array[i]} == ${target}?`);
      await sleep(800);
      
      setActiveLine(3); // if arr[i] == target
      if (array[i] === target) {
        setSorted([i]);
        setStepInfo(`Found! ${target} is at index ${i}.`);
        setActiveLine(4); // return i
        setIsAnimating(false);
        return;
      }
    }
    setStepInfo("Target not found in list.");
    setActiveLine(5); // return -1
    setIsAnimating(false);
  };

  const runBinarySearch = async (target: number) => {
    const sortedArr = [...array].sort((a, b) => a - b);
    setArray(sortedArr);
    setIsAnimating(true);
    animationRef.current = true;
    
    let low = 0, high = sortedArr.length - 1;
    setStepInfo("Binary search requires sorted data. Sorting first...");
    await sleep(1000);

    while (low <= high) {
      if (!animationRef.current) return;
      let mid = Math.floor((low + high) / 2);
      setComparing([low, mid, high]);
      setPivotIdx(mid);
      setTraceVars({ low, mid, high, value: sortedArr[mid], target });
      
      setActiveLine(4); 
      setStepInfo(`Window: [${low} to ${high}]. Midpoint is index ${mid}.`);
      await sleep(1200);

      setActiveLine(6); 
      if (sortedArr[mid] === target) {
        setSorted([mid]);
        setStepInfo(`Match found at index ${mid}!`);
        setActiveLine(7);
        setIsAnimating(false);
        return;
      } else if (sortedArr[mid] < target) {
        setStepInfo(`${sortedArr[mid]} < ${target}. Search RIGHT half.`);
        setActiveLine(9);
        low = mid + 1;
      } else {
        setStepInfo(`${sortedArr[mid]} > ${target}. Search LEFT half.`);
        setActiveLine(11);
        high = mid - 1;
      }
      await sleep(800);
    }
    setStepInfo("Target not found.");
    setIsAnimating(false);
  };

  const runBubbleSort = async () => {
    setIsAnimating(true);
    animationRef.current = true;
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!animationRef.current) return;
        setComparing([j, j + 1]);
        setTraceVars({ i, j, left: arr[j], right: arr[j+1] });
        setStepInfo(`Comparing ${arr[j]} and ${arr[j+1]}...`);
        setActiveLine(4);
        await sleep(400);

        if (arr[j] > arr[j + 1]) {
          setStepInfo(`${arr[j]} > ${arr[j+1]}. Swapping!`);
          setActiveLine(6);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(400);
        }
      }
      setSorted(prev => [...prev, n - i - 1]);
    }
    setStepInfo("List is now fully sorted.");
    setIsAnimating(false);
  };

  const runSelectionSort = async () => {
    setIsAnimating(true);
    animationRef.current = true;
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      setPivotIdx(i);
      setStepInfo(`New Pass: Starting with min index ${i}.`);
      setActiveLine(3); 
      await sleep(600);

      for (let j = i + 1; j < n; j++) {
        if (!animationRef.current) return;
        setComparing([j]);
        setTraceVars({ i, j, minIdx, currentMin: arr[minIdx] });
        setStepInfo(`Checking if ${arr[j]} < ${arr[minIdx]}?`);
        setActiveLine(5);
        await sleep(400);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setStepInfo(`New minimum found at index ${j}!`);
          setActiveLine(6);
          await sleep(400);
        }
      }
      setStepInfo(`End of pass: Swapping ${arr[i]} with ${arr[minIdx]}.`);
      setActiveLine(8);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      setSorted(prev => [...prev, i]);
      await sleep(600);
    }
    setPivotIdx(null);
    setStepInfo("Selection Sort Complete.");
    setIsAnimating(false);
  };

  const runInsertionSort = async () => {
    setIsAnimating(true);
    animationRef.current = true;
    let arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setPivotIdx(i);
      setTraceVars({ i, j, key });
      setStepInfo(`Picking up ${key} to insert into sorted portion.`);
      setActiveLine(3);
      await sleep(800);

      while (j >= 0 && arr[j] > key) {
        if (!animationRef.current) return;
        setComparing([j]);
        setStepInfo(`${arr[j]} > ${key}. Shifting ${arr[j]} right.`);
        setActiveLine(6);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j = j - 1;
        setTraceVars({ i, j, key });
        await sleep(600);
      }
      setStepInfo(`Placing ${key} at index ${j + 1}.`);
      setActiveLine(8);
      arr[j + 1] = key;
      setArray([...arr]);
      setSorted(Array.from({length: i + 1}, (_, k) => k));
      await sleep(800);
    }
    setPivotIdx(null);
    setStepInfo("Insertion Sort Complete.");
    setIsAnimating(false);
  };

  const runQuickSortPartitionTrace = async () => {
    setIsAnimating(true);
    animationRef.current = true;
    let arr = [...array];
    const low = 0;
    const high = arr.length - 1;
    const pivotValue = arr[high];
    
    setPivotIdx(high);
    setStepInfo(`HL MISSION: Partition using last element (${pivotValue}) as Pivot.`);
    setActiveLine(5);
    await sleep(1200);

    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (!animationRef.current) return;
      setComparing([j]);
      setTraceVars({ pivot: pivotValue, i, j, current: arr[j] });
      setStepInfo(`Is ${arr[j]} < ${pivotValue}?`);
      setActiveLine(7);
      await sleep(600);

      if (arr[j] < pivotValue) {
        i++;
        setStepInfo(`${arr[j]} is smaller! Increment 'i' and swap with index ${i}.`);
        setActiveLine(9);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(600);
      }
    }
    
    setStepInfo(`Partition Done. Swapping pivot to its correct home at index ${i + 1}.`);
    setActiveLine(12);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setPivotIdx(i + 1);
    setSorted([i + 1]);
    await sleep(1000);
    
    setStepInfo("Quick Sort partitioning complete for this sub-array.");
    setIsAnimating(false);
  };

  const activeAlgoData = ALGO_DATA[algorithm];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B2.4 Algorithm Laboratory</h1>
        <p className="text-2xl font-bold text-slate-600 italic">"The Logic of Searching, Sorting & Big O"</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <AlgoTab active={algorithm === 'linear'} onClick={() => {setAlgorithm('linear'); reset();}} label="Linear Search" color="blue" />
        <AlgoTab active={algorithm === 'binary'} onClick={() => {setAlgorithm('binary'); reset();}} label="Binary Search" color="indigo" />
        <AlgoTab active={algorithm === 'bubble'} onClick={() => {setAlgorithm('bubble'); reset();}} label="Bubble Sort" color="emerald" />
        <AlgoTab active={algorithm === 'selection'} onClick={() => {setAlgorithm('selection'); reset();}} label="Selection Sort" color="amber" />
        <AlgoTab active={algorithm === 'insertion'} onClick={() => {setAlgorithm('insertion'); reset();}} label="Insertion Sort" color="rose" />
        <AlgoTab active={algorithm === 'quick'} onClick={() => {setAlgorithm('quick'); reset();}} label="Quick Sort" color="purple" isHL />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <HandwrittenCard title={`${algorithm.toUpperCase()} Logic Visualizer`} bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl min-h-[550px] relative overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white p-3 rounded-xl mb-8 flex items-center justify-between border-2 border-slate-950 shadow-md">
               <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[11px] font-mono font-bold text-emerald-400">{stepInfo}</p>
               </div>
               <div className="flex space-x-4">
                  {Object.entries(traceVars).map(([k, v]) => (
                    <span key={k} className="text-[9px] font-mono text-slate-400">{k}: <span className="text-white">{v}</span></span>
                  ))}
               </div>
            </div>

            <div className="flex-grow flex items-end justify-center space-x-3 h-64 px-4">
              {array.map((val, idx) => {
                const isComparing = comparing.includes(idx);
                const isSorted = sorted.includes(idx);
                const isPivot = pivotIdx === idx;
                
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 max-w-[60px] transition-all duration-300">
                    <div 
                      style={{ height: `${val * 2.5}px` }}
                      className={`w-full border-2 border-slate-900 rounded-t-lg transition-all duration-300 relative shadow-sm
                        ${isPivot ? 'bg-purple-500 ring-4 ring-purple-200' : 
                          isSorted ? 'bg-emerald-500 translate-y-[-5px]' : 
                          isComparing ? 'bg-amber-400' : 'bg-slate-50'}
                      `}
                    >
                      {isPivot && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase text-purple-600 bg-white px-1.5 py-0.5 border-2 border-purple-500 rounded shadow-sm whitespace-nowrap">Pivot / Mid</span>}
                      {isComparing && <span className="absolute -top-6 left-1/2 -translate-x-1/2"><ArrowDown size={12} className="text-amber-600 animate-bounce" /></span>}
                    </div>
                    <span className={`mt-3 font-mono text-[10px] font-black ${isComparing || isSorted || isPivot ? 'text-slate-900' : 'text-slate-300'}`}>{val}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => {
                    if (algorithm === 'linear') runLinearSearch(34);
                    if (algorithm === 'binary') runBinarySearch(34);
                    if (algorithm === 'bubble') runBubbleSort();
                    if (algorithm === 'selection') runSelectionSort();
                    if (algorithm === 'insertion') runInsertionSort();
                    if (algorithm === 'quick') runQuickSortPartitionTrace();
                  }}
                  disabled={isAnimating}
                  className="px-10 py-4 bg-slate-900 text-white rounded-full font-black text-sm hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center shadow-xl active:scale-95 group"
                >
                  <Play size={18} className="mr-2 group-hover:scale-125 transition-transform" /> 
                  {algorithm.includes('search') ? 'FIND 34' : 'EXECUTE SORT'}
                </button>
                <button onClick={reset} className="p-4 bg-white border-2 border-slate-200 rounded-full hover:border-slate-900 hover:rotate-180 transition-all duration-500 shadow-sm">
                  <RotateCcw size={20} className="text-slate-600"/>
                </button>
              </div>

              <div className="flex space-x-8">
                 <EfficiencyMeter label="Time (Worst)" val={activeAlgoData.worst} color="text-rose-600" />
                 <EfficiencyMeter label="Time (Best)" val={activeAlgoData.best} color="text-emerald-600" />
                 <EfficiencyMeter label="Space" val={activeAlgoData.space} color="text-indigo-600" />
              </div>
            </div>
          </HandwrittenCard>

          <div className="grid md:grid-cols-2 gap-6">
            <HandwrittenCard title="Wait, How does it work?" bgColor="bg-yellow-50" className="border-yellow-200">
               <ul className="space-y-3">
                 {activeAlgoData.steps.map((s: string, i: number) => (
                   <li key={i} className="flex items-start text-xs font-bold text-slate-700">
                     <span className="w-5 h-5 bg-white border border-yellow-300 rounded flex items-center justify-center mr-3 mt-0.5 shrink-0 text-[10px]">{i+1}</span>
                     <span>{s}</span>
                   </li>
                 ))}
               </ul>
            </HandwrittenCard>

            <div className="p-8 bg-indigo-900 text-white rounded-[2.5rem] sketch-border shadow-xl flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12"><Zap size={100}/></div>
               <h4 className="text-xl font-black handwritten text-indigo-200 mb-4 flex items-center"><Target className="mr-2" size={20}/> Paper 2 Strategy</h4>
               <p className="text-sm italic text-indigo-100 leading-relaxed font-medium">
                 "{activeAlgoData.examTip}"
               </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col space-y-6">
          <HandwrittenCard title="Python Code Vault" bgColor="bg-slate-950" className="border-slate-800 border-4 shadow-2xl flex-grow h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
               <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
               </div>
               <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{algorithm}.py</span>
            </div>
            
            <div className="flex-grow overflow-auto">
              <pre className="text-[11px] font-mono leading-6 text-indigo-100/40">
                {activeAlgoData.codeLines.map((line: string, i: number) => (
                  <div 
                    key={i} 
                    className={`flex items-center space-x-4 transition-all ${activeLine === (i + 1) ? 'bg-indigo-600/30 text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="w-5 text-right opacity-30 select-none">{i + 1}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                ))}
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
               <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">Live Trace Execution</p>
            </div>
          </HandwrittenCard>

          {algorithm === 'quick' && (
            <div className="animate-in zoom-in duration-500">
               <div className="bg-purple-900 p-8 rounded-[2rem] border-4 border-purple-600 text-white shadow-2xl relative overflow-hidden">
                  <ShieldAlert className="absolute -bottom-4 -right-4 opacity-10 rotate-12" size={100}/>
                  <h4 className="text-xl font-black handwritten text-yellow-400 mb-4 uppercase tracking-tighter">HL Deep Dive: Pivot Choice</h4>
                  <p className="text-xs kalam leading-relaxed text-purple-100 mb-4 italic">
                    "Quick Sort is recursive. The speed depends on choosing a GOOD pivot. If you always pick the smallest item as a pivot, the time complexity crashes from <b>O(N log N)</b> to <b>O(N²)</b>!"
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* NEW: Expanded Big O Section */}
      <section className="space-y-10 pt-16 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-rose-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><LineChart /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.4.3 The Big O Hierarchy</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <HandwrittenCard title="Visualizing Orders of Growth" bgColor="bg-white" className="border-4 border-slate-900">
             <p className="text-lg font-bold text-slate-700 mb-6 italic">"Big O notation describes how the time taken grows as the input size (N) increases. Some code stays fast, some explodes!"</p>
             
             <div className="relative h-64 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 overflow-hidden mb-6 flex items-end">
                {/* Vertical Axis */}
                <div className="absolute left-4 top-4 bottom-8 w-0.5 bg-slate-300">
                   <span className="absolute -top-4 left-[-15px] text-[8px] font-black text-slate-400 uppercase rotate-[-90deg] origin-right">Time (Operations)</span>
                </div>
                {/* Horizontal Axis */}
                <div className="absolute left-4 right-4 bottom-8 h-0.5 bg-slate-300">
                   <span className="absolute -bottom-4 right-0 text-[8px] font-black text-slate-400 uppercase">Input Size (N)</span>
                </div>

                {/* Growth Lines (Illustrative SVGs) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
                  {/* O(1) - Constant (Bottom Flat) */}
                  <line x1="20" y1="180" x2="380" y2="180" stroke="#10b981" strokeWidth="2" />
                  <text x="340" y="175" className="text-[10px] font-black fill-emerald-600">O(1)</text>

                  {/* O(log N) - Logarithmic (Slight curve) */}
                  <path d="M 20 180 Q 150 160 380 150" fill="none" stroke="#6366f1" strokeWidth="2" />
                  <text x="330" y="145" className="text-[10px] font-black fill-indigo-600">O(log N)</text>

                  {/* O(N) - Linear (Diagonal) */}
                  <line x1="20" y1="180" x2="300" y2="20" stroke="#f59e0b" strokeWidth="2" />
                  <text x="260" y="40" className="text-[10px] font-black fill-amber-600">O(N)</text>

                  {/* O(N log N) - Linearithmic (Slight curve above linear) */}
                  <path d="M 20 180 Q 180 100 300 20" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,3" />
                  <text x="200" y="50" className="text-[10px] font-black fill-purple-600">O(N log N)</text>

                  {/* O(N^2) - Quadratic (Steep Curve) */}
                  <path d="M 20 180 Q 40 180 60 20" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <text x="45" y="40" className="text-[10px] font-black fill-rose-600">O(N²)</text>
                </svg>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <EfficiencyBox type="O(1)" label="Constant" color="text-emerald-600" bg="bg-emerald-50" desc="Fastest. Time doesn't change with N." />
                <EfficiencyBox type="O(log N)" label="Logarithmic" color="text-indigo-600" bg="bg-indigo-50" desc="Great. Halving search area every step." />
                <EfficiencyBox type="O(N)" label="Linear" color="text-amber-600" bg="bg-amber-50" desc="Fair. Checks every item once." />
                <EfficiencyBox type="O(N log N)" label="Linearithmic" color="text-purple-600" bg="bg-purple-50" desc="Standard for efficient sorting (Merge/Quick)." />
                <EfficiencyBox type="O(N²)" label="Quadratic" color="text-rose-600" bg="bg-rose-50" desc="Slow. Loops inside loops!" />
             </div>
          </HandwrittenCard>

          <div className="space-y-6">
            <HandwrittenCard title="The Growth Reality Check" bgColor="bg-slate-900" className="text-white border-4 border-slate-700">
               <p className="text-xs italic text-slate-400 mb-6 leading-relaxed">"Look what happens to the number of operations as N scales up. This is why Binary Search beats Linear Search for large data!"</p>
               
               <div className="overflow-hidden rounded-xl border border-slate-700">
                  <table className="w-full text-left font-mono text-[10px]">
                    <thead className="bg-slate-800 text-slate-400 uppercase text-[9px] tracking-widest border-b border-slate-700">
                       <tr>
                         <th className="p-4">Complexity</th>
                         <th className="p-4">N = 10</th>
                         <th className="p-4">N = 1,000</th>
                         <th className="p-4">N = 1,000,000</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <GrowthRow type="O(1)" n10="1" n1000="1" n1mil="1" />
                      <GrowthRow type="O(log N)" n10="~3" n1000="~10" n1mil="~20" color="text-indigo-400" />
                      <GrowthRow type="O(N)" n10="10" n1000="1,000" n1mil="1,000,000" color="text-amber-400" />
                      <GrowthRow type="O(N log N)" n10="~33" n1000="~10,000" n1mil="~20,000,000" color="text-purple-400" />
                      <GrowthRow type="O(N²)" n10="100" n1000="1,000,000" n1mil="1,000,000,000,000!!" color="text-rose-400 font-black" />
                    </tbody>
                  </table>
               </div>

               <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/10 flex items-start space-x-4">
                  <div className="p-2 bg-yellow-400 rounded-lg shrink-0"><ShieldAlert size={20} className="text-slate-900"/></div>
                  <div>
                    <h5 className="font-black text-xs text-yellow-400 uppercase mb-2">Teacher's Calculation Rules</h5>
                    <ul className="text-[10px] text-slate-400 leading-relaxed italic space-y-1 font-medium">
                      <li>1. Ignore constants: O(2N + 5) simplifies to <b>O(N)</b>.</li>
                      <li>2. Ignore lower-order terms: O(N² + N) becomes <b>O(N²)</b>.</li>
                      <li>3. Focus on the <b>Dominant Term</b> that grows fastest.</li>
                    </ul>
                  </div>
               </div>
            </HandwrittenCard>
          </div>
        </div>
      </section>

      {/* NEW: Complexity Logic Map (Flowchart style symbols) */}
      <section className="space-y-10 pt-16 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Workflow /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">Complexity Logic Map</h2>
        </div>

        <HandwrittenCard title="Flowchart Structures to Big O Symbols" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {/* O(1) Flow */}
            <div className="flex flex-col items-center">
              <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-200 flex flex-col items-center w-full min-h-[300px] shadow-sm">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-xl mb-4">
                   <Code size={24} className="text-emerald-600"/>
                </div>
                <h5 className="font-black text-sm text-emerald-900 mb-2">Sequential Steps</h5>
                <div className="flex flex-col items-center space-y-2 opacity-60">
                   <div className="w-20 h-6 bg-white border border-slate-400 rounded"></div>
                   <ArrowDown size={12} className="text-slate-400"/>
                   <div className="w-20 h-6 bg-white border border-slate-400 rounded"></div>
                </div>
                <div className="mt-auto pt-6 text-center">
                  <div className="text-3xl font-black font-mono text-emerald-600 mb-1">O(1)</div>
                  <p className="text-[10px] kalam font-bold text-slate-500">No input-dependent repetition.</p>
                </div>
              </div>
            </div>

            {/* O(log N) Flow */}
            <div className="flex flex-col items-center">
              <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-200 flex flex-col items-center w-full min-h-[300px] shadow-sm">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-xl mb-4">
                   <Binary size={24} className="text-indigo-600"/>
                </div>
                <h5 className="font-black text-sm text-indigo-900 mb-2">Recursive Split</h5>
                <div className="flex flex-col items-center relative opacity-60">
                   <div className="p-4 border border-slate-400 rotate-45 w-8 h-8"></div>
                   <div className="flex space-x-8 mt-2">
                      <ArrowDown size={12} className="text-slate-400 -rotate-45"/>
                      <ArrowDown size={12} className="text-slate-400 rotate-45"/>
                   </div>
                </div>
                <div className="mt-auto pt-6 text-center">
                  <div className="text-3xl font-black font-mono text-indigo-600 mb-1">O(log N)</div>
                  <p className="text-[10px] kalam font-bold text-slate-500">Problem size halves every step.</p>
                </div>
              </div>
            </div>

            {/* O(N) Flow */}
            <div className="flex flex-col items-center">
              <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col items-center w-full min-h-[300px] shadow-sm">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-xl mb-4">
                   <RotateCw size={24} className="text-amber-600"/>
                </div>
                <h5 className="font-black text-sm text-amber-900 mb-2">Simple Loop</h5>
                <div className="flex flex-col items-center opacity-60">
                   <div className="w-16 h-12 bg-white border border-slate-400 rounded-lg relative overflow-hidden flex items-center justify-center">
                      <Repeat size={16} className="text-slate-300"/>
                   </div>
                   <div className="h-4 w-1 bg-slate-300"></div>
                   <ArrowDown size={12} className="text-slate-400"/>
                </div>
                <div className="mt-auto pt-6 text-center">
                  <div className="text-3xl font-black font-mono text-amber-600 mb-1">O(N)</div>
                  <p className="text-[10px] kalam font-bold text-slate-500">One visit per input element.</p>
                </div>
              </div>
            </div>

            {/* O(N^2) Flow */}
            <div className="flex flex-col items-center">
              <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200 flex flex-col items-center w-full min-h-[300px] shadow-sm">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-xl mb-4">
                   <Layers size={24} className="text-rose-600"/>
                </div>
                <h5 className="font-black text-sm text-rose-900 mb-2">Nested Loops</h5>
                <div className="flex flex-col items-center opacity-60">
                   <div className="w-20 h-16 bg-white border-2 border-slate-300 rounded-xl p-1">
                      <div className="w-full h-full border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Repeat size={12} className="text-slate-200"/>
                      </div>
                   </div>
                </div>
                <div className="mt-auto pt-6 text-center">
                  <div className="text-3xl font-black font-mono text-rose-600 mb-1">O(N²)</div>
                  <p className="text-[10px] kalam font-bold text-slate-500">Loop inside a loop (N x N).</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-900 rounded-3xl border-4 border-slate-950 flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
             <div className="flex-1 mb-4 md:mb-0">
               <h6 className="text-yellow-400 font-black handwritten text-lg mb-1">Big O Checklist</h6>
               <p className="text-[10px] kalam text-slate-400 italic">"Identify the symbol by looking at the structure of your code or flowchart!"</p>
             </div>
             <div className="flex space-x-2">
               <SymbolBadge symbol="O(1)" label="No Loops" color="emerald" />
               <SymbolBadge symbol="O(log N)" label="Splitting" color="indigo" />
               <SymbolBadge symbol="O(N)" label="1 Loop" color="amber" />
               <SymbolBadge symbol="O(N²)" label="2 Loops" color="rose" />
             </div>
          </div>
        </HandwrittenCard>
      </section>

      <HandwrittenCard title="The Master Complexity Grid (Memory Map)" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 shadow-2xl">
         <div className="overflow-x-auto rounded-2xl border border-slate-700">
            <table className="w-full text-left font-mono text-xs">
               <thead className="bg-slate-800 text-slate-400 uppercase text-[9px] tracking-widest border-b border-slate-700">
                  <tr>
                    <th className="p-6">Algorithm Class</th>
                    <th className="p-6">Best Case</th>
                    <th className="p-6">Average Case</th>
                    <th className="p-6">Worst Case</th>
                    <th className="p-6">Space (Aux)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800 font-bold">
                  <ComplexRow name="Linear Search" best="O(1)" avg="O(N)" worst="O(N)" space="O(1)" color="text-blue-400" />
                  <ComplexRow name="Binary Search" best="O(1)" avg="O(log N)" worst="O(log N)" space="O(1)" color="text-indigo-400" />
                  <ComplexRow name="Bubble Sort" best="O(N)" avg="O(N²)" worst="O(N²)" space="O(1)" color="text-emerald-400" />
                  <ComplexRow name="Selection Sort" best="O(N²)" avg="O(N²)" worst="O(N²)" space="O(1)" color="text-amber-400" />
                  <ComplexRow name="Insertion Sort" best="O(N)" avg="O(N²)" worst="O(N²)" space="O(1)" color="text-rose-400" />
                  <ComplexRow name="Quick Sort (HL)" best="O(N log N)" avg="O(N log N)" worst="O(N²)" space="O(log N)" color="text-purple-400" />
               </tbody>
            </table>
         </div>
      </HandwrittenCard>
    </div>
  );
};

const SymbolBadge = ({ symbol, label, color }: any) => {
  const colors: any = {
    emerald: 'bg-emerald-600 text-emerald-50 border-emerald-500',
    indigo: 'bg-indigo-600 text-indigo-50 border-indigo-500',
    amber: 'bg-amber-600 text-amber-50 border-amber-500',
    rose: 'bg-rose-600 text-rose-50 border-rose-500',
  };
  return (
    <div className={`p-2 rounded-xl border-2 flex flex-col items-center ${colors[color]} min-w-[70px] shadow-sm`}>
       <span className="text-xs font-black font-mono leading-none">{symbol}</span>
       <span className="text-[8px] font-bold uppercase mt-1 opacity-80">{label}</span>
    </div>
  );
};

const AlgoTab = ({ active, onClick, label, color, isHL }: any) => {
  const colors: any = {
    blue: active ? 'bg-blue-600 border-blue-700 text-white shadow-lg' : 'bg-white text-blue-600 border-blue-100 hover:border-blue-400',
    indigo: active ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg' : 'bg-white text-indigo-600 border-indigo-100 hover:border-indigo-400',
    emerald: active ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg' : 'bg-white text-emerald-600 border-emerald-100 hover:border-emerald-400',
    amber: active ? 'bg-amber-600 border-amber-700 text-white shadow-lg' : 'bg-white text-amber-600 border-amber-100 hover:border-amber-400',
    rose: active ? 'bg-rose-600 border-rose-700 text-white shadow-lg' : 'bg-white text-rose-600 border-rose-100 hover:border-rose-400',
    purple: active ? 'bg-purple-600 border-purple-700 text-white shadow-lg' : 'bg-white text-purple-600 border-purple-100 hover:border-purple-400',
  };

  return (
    <button onClick={onClick} className={`px-5 py-2.5 rounded-full font-black text-[11px] md:text-xs border-2 transition-all flex items-center space-x-2 ${colors[color]}`}>
      <span>{label}</span>
      {isHL && <span className="bg-purple-900/20 text-[8px] px-1 rounded font-black">HL ONLY</span>}
    </button>
  );
};

const EfficiencyMeter = ({ label, val, color }: any) => (
  <div className="flex flex-col items-center">
    <span className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-tighter">{label}</span>
    <span className={`text-lg font-mono font-black ${color}`}>{val}</span>
  </div>
);

const EfficiencyBox = ({ type, label, color, bg, desc }: any) => (
  <div className={`${bg} p-4 rounded-2xl border border-slate-100 flex flex-col group hover:shadow-md transition-all`}>
    <span className={`text-lg font-black font-mono ${color}`}>{type}</span>
    <span className="text-[9px] font-black uppercase text-slate-500 mb-2">{label}</span>
    <p className="text-[10px] font-bold text-slate-600 leading-tight italic">{desc}</p>
  </div>
);

const GrowthRow = ({ type, n10, n1000, n1mil, color = "text-emerald-400" }: any) => (
  <tr className="hover:bg-white/5 transition-colors">
     <td className={`p-4 border-r border-slate-800 font-bold ${color}`}>{type}</td>
     <td className="p-4">{n10}</td>
     <td className="p-4">{n1000}</td>
     <td className="p-4">{n1mil}</td>
  </tr>
);

const ComplexRow = ({ name, best, avg, worst, space, color }: any) => (
  <tr className="hover:bg-white/5 transition-colors">
    <td className={`p-6 border-r border-slate-800 ${color}`}>{name}</td>
    <td className="p-6 text-emerald-400">{best}</td>
    <td className="p-6 text-slate-300">{avg}</td>
    <td className="p-6 text-rose-400">{worst}</td>
    <td className="p-6 text-indigo-300">{space}</td>
  </tr>
);

const ALGO_DATA: any = {
  linear: {
    worst: "O(N)",
    best: "O(1)",
    space: "O(1)",
    steps: [
      "Start at index 0.",
      "Compare with target.",
      "If found, return index.",
      "If not, move to next and repeat."
    ],
    examTip: "The only option for unsorted lists.",
    codeLines: [
      "def linear_search(arr, target):",
      "    for i in range(len(arr)):",
      "        if arr[i] == target:",
      "            return i",
      "    return -1"
    ]
  },
  binary: {
    worst: "O(log N)",
    best: "O(1)",
    space: "O(1)",
    steps: [
      "Data must be SORTED.",
      "Check the middle element.",
      "If target is smaller, search left half.",
      "If target is larger, search right half.",
      "Repeat until found or range empty."
    ],
    examTip: "Halving search space is O(log N).",
    codeLines: [
      "def binary_search(arr, target):",
      "    low, high = 0, len(arr) - 1",
      "    while low <= high:",
      "        mid = (low + high) // 2",
      "        if arr[mid] == target:",
      "            return mid",
      "        elif arr[mid] < target:",
      "            low = mid + 1",
      "        else:",
      "            high = mid - 1",
      "    return -1"
    ]
  },
  bubble: {
    worst: "O(N²)",
    best: "O(N)",
    space: "O(1)",
    steps: [
      "Compare adjacent pairs.",
      "Swap if they are in wrong order.",
      "Repeat for all elements.",
      "Largest 'bubbles' to the end."
    ],
    examTip: "Use a flag for Best Case O(N).",
    codeLines: [
      "def bubble_sort(arr):",
      "    n = len(arr)",
      "    for i in range(n):",
      "        for j in range(0, n - i - 1):",
      "            if arr[j] > arr[j + 1]:",
      "                arr[j], arr[j+1] = arr[j+1], arr[j]"
    ]
  },
  selection: {
    worst: "O(N²)",
    best: "O(N²)",
    space: "O(1)",
    steps: [
      "Find the smallest element in unsorted part.",
      "Swap it with first unsorted element.",
      "Move sorted boundary.",
      "Repeat until fully sorted."
    ],
    examTip: "Minimum swaps: only O(N) swaps total.",
    codeLines: [
      "def selection_sort(arr):",
      "    n = len(arr)",
      "    for i in range(n):",
      "        min_idx = i",
      "        for j in range(i + 1, n):",
      "            if arr[j] < arr[min_idx]:",
      "                min_idx = j",
      "        arr[i], arr[min_idx] = arr[min_idx], arr[i]"
    ]
  },
  insertion: {
    worst: "O(N²)",
    best: "O(N)",
    space: "O(1)",
    steps: [
      "Take an item from unsorted part.",
      "Find correct spot in sorted part.",
      "Shift items to make space.",
      "Insert and repeat."
    ],
    examTip: "Fastest O(N²) sort for nearly sorted data.",
    codeLines: [
      "def insertion_sort(arr):",
      "    for i in range(1, len(arr)):",
      "        key = arr[i]",
      "        j = i - 1",
      "        while j >= 0 and arr[j] > key:",
      "            arr[j + 1] = arr[j]",
      "            j -= 1",
      "        arr[j + 1] = key"
    ]
  },
  quick: {
    worst: "O(N²)",
    best: "O(N log N)",
    space: "O(log N)",
    steps: [
      "HL CORE: Pick a Pivot.",
      "Partition array around pivot.",
      "Recursively sort left and right halves.",
      "Divide and conquer logic."
    ],
    examTip: "Partition efficiency is key.",
    codeLines: [
      "def partition(arr, low, high):",
      "    pivot = arr[high]",
      "    i = low - 1",
      "    for j in range(low, high):",
      "        if arr[j] < pivot:",
      "            i += 1",
      "            arr[i], arr[j] = arr[j], arr[i]",
      "    arr[i+1], arr[high] = arr[high], arr[i+1]",
      "    return i + 1"
    ]
  }
};

export default B2AlgorithmsSection;
