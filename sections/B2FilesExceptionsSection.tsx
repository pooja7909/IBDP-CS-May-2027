import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  FileCode, AlertCircle, Save, Info, ArrowRight, 
  Trash2, Play, Search, Code, CheckCircle2, Scissors,
  Lock, Unlock, FileText, PlusCircle, AlertTriangle,
  FileSearch, PenTool, BookOpen, Terminal, RefreshCw,
  Database, HardDrive, HardDriveDownload, FileUp, List,
  // Added missing Lightbulb import
  Lightbulb
} from 'lucide-react';

interface FileState {
  [filename: string]: string;
}

const INITIAL_FILES: FileState = {
  'hello.txt': 'Hello World!\nThis is a sample file.',
  'grades.txt': 'Math: 85\nCS: 92\nEnglish: 78'
};

const B2FilesExceptionsSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'r' | 'w' | 'a'>('r');
  
  // Lab State
  const [code, setCode] = useState<string>(
`# Mission: Create a new log file
with open('log.txt', 'w') as f:
    f.write('System initiated\\n')
    f.write('Access granted')`
  );
  const [disk, setDisk] = useState<FileState>({ ...INITIAL_FILES });
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fileModes = {
    r: {
      title: "Read Mode ('r')",
      color: "bg-blue-50 text-blue-900 border-blue-200",
      icon: Search,
      behavior: "Opens a file for reading only. Pointer starts at the beginning.",
      danger: "Crashes with FileNotFoundError if the file doesn't exist!",
      example: "with open('notes.txt', 'r') as f:\n    data = f.read()"
    },
    w: {
      title: "Write Mode ('w')",
      color: "bg-rose-50 text-rose-900 border-rose-200",
      icon: Trash2,
      behavior: "The 'Danger Mode'. Overwrites existing content entirely.",
      danger: "DELETES everything in the file as soon as you open it!",
      example: "with open('notes.txt', 'w') as f:\n    f.write('Fresh start!')"
    },
    a: {
      title: "Append Mode ('a')",
      color: "bg-emerald-50 text-emerald-900 border-emerald-200",
      icon: PlusCircle,
      behavior: "Adds data to the END of the file. Keeps existing data.",
      danger: "Pointer starts at the end, so you cannot read from here.",
      example: "with open('log.txt', 'a') as f:\n    f.write('\\nNew log entry')"
    }
  };

  const handleRun = () => {
    const lines = code.split('\n');
    let newOutput: string[] = [">>> Starting Execution..."];
    let tempDisk = { ...disk };
    let hasError = false;
    let handledError = false;

    try {
      // Very basic regex-based Python simulation for educational purposes
      const openMatch = code.match(/with\s+open\(['"](.+?)['"]\s*,\s*['"](.+?)['"]\)\s*as\s+(\w+):/);
      const tryBlock = code.includes('try:');
      const exceptBlock = code.includes('except FileNotFoundError:');

      if (openMatch) {
        const filename = openMatch[1];
        const mode = openMatch[2];
        const varName = openMatch[3];

        if (mode === 'r') {
          if (!tempDisk[filename]) {
            if (tryBlock && exceptBlock) {
              newOutput.push(`Exception handled: FileNotFoundError for '${filename}'`);
              handledError = true;
            } else {
              throw new Error(`FileNotFoundError: [Errno 2] No such file or directory: '${filename}'`);
            }
          } else {
            newOutput.push(`READ content from '${filename}':`);
            newOutput.push(`"${tempDisk[filename]}"`);
          }
        } else if (mode === 'w') {
          tempDisk[filename] = ""; // Clear existing or create new
          const writeMatches = code.match(new RegExp(`${varName}\\.write\\(['"](.+?)['"]\\)`, 'g'));
          if (writeMatches) {
            writeMatches.forEach(m => {
              const content = m.match(/\(['"](.+?)['"]\)/)?.[1]?.replace(/\\n/g, '\n') || "";
              tempDisk[filename] += content;
            });
            newOutput.push(`SUCCESS: Created/Overwritten '${filename}' with ${writeMatches.length} write operations.`);
          }
        } else if (mode === 'a') {
          if (!tempDisk[filename]) tempDisk[filename] = "";
          const writeMatches = code.match(new RegExp(`${varName}\\.write\\(['"](.+?)['"]\\)`, 'g'));
          if (writeMatches) {
            writeMatches.forEach(m => {
              const content = m.match(/\(['"](.+?)['"]\)/)?.[1]?.replace(/\\n/g, '\n') || "";
              tempDisk[filename] += content;
            });
            newOutput.push(`SUCCESS: Appended to '${filename}'.`);
          }
        }
      } else if (!code.trim().startsWith('#') && code.trim().length > 0) {
        newOutput.push("Syntax Error: Use the 'with open(...) as f:' pattern.");
        hasError = true;
      }

      if (!hasError) {
        setDisk(tempDisk);
        setConsoleOutput(newOutput);
        setStatus(handledError ? 'idle' : 'success');
      } else {
        setConsoleOutput(newOutput);
        setStatus('error');
      }

    } catch (e: any) {
      newOutput.push(e.message);
      setConsoleOutput(newOutput);
      setStatus('error');
    }
  };

  const resetLab = () => {
    setDisk({ ...INITIAL_FILES });
    setConsoleOutput([]);
    setStatus('idle');
    setCode("# Mission: Create a new log file\nwith open('log.txt', 'w') as f:\n    f.write('System initiated\\n')\n    f.write('Access granted')");
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B2.5 File Handling Mastery</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Persistence is Key: Storing Data Beyond the Run"</p>
      </div>

      {/* Mode Deep Dive */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><FileCode /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">The 3 Pillars of File Modes</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            {(['r', 'w', 'a'] as const).map((m) => {
              const ModeIcon = fileModes[m].icon;
              return (
                <button
                  key={m}
                  onClick={() => setActiveMode(m)}
                  className={`w-full p-6 sketch-border text-left transition-all relative overflow-hidden group ${activeMode === m ? 'ring-4 ring-slate-900 shadow-2xl scale-105 bg-white' : 'opacity-60 bg-slate-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${fileModes[m].color.split(' ')[0]}`}>
                        <ModeIcon size={20} />
                      </div>
                      <span className="font-black handwritten text-xl">{fileModes[m].title}</span>
                    </div>
                    {activeMode === m && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
             <HandwrittenCard bgColor="bg-white" className="border-4 border-slate-900 min-h-[400px] flex flex-col">
                <div className="animate-in fade-in slide-in-from-right-4 duration-500" key={activeMode}>
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black handwritten underline decoration-indigo-500 underline-offset-8">
                      Focus: Mode "{activeMode}"
                    </h3>
                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border-2 ${fileModes[activeMode].color}`}>
                      {activeMode === 'r' ? 'Safe' : activeMode === 'w' ? 'Destructive' : 'Additive'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                       <h5 className="font-black text-xs uppercase text-slate-400 tracking-widest flex items-center"><Info size={14} className="mr-2"/> Behavior</h5>
                       <p className="text-sm kalam font-bold text-slate-700 leading-relaxed italic">"{fileModes[activeMode].behavior}"</p>
                       <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl">
                          <h6 className="text-[10px] font-black text-rose-800 uppercase flex items-center mb-1">
                            <AlertTriangle size={12} className="mr-1"/> The Risk
                          </h6>
                          <p className="text-[10px] kalam text-rose-700 leading-tight">{fileModes[activeMode].danger}</p>
                       </div>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-6 shadow-inner border-b-8 border-slate-950">
                       <h5 className="text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest flex items-center"><Code size={12} className="mr-2"/> Python Snippet</h5>
                       <pre className="text-xs font-mono text-indigo-300 leading-relaxed whitespace-pre-wrap">
{fileModes[activeMode].example}
                       </pre>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] relative overflow-hidden">
                     <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12"><BookOpen size={100} /></div>
                     <h4 className="font-black text-xs text-indigo-900 uppercase mb-3 flex items-center"><PenTool size={14} className="mr-2"/> The "Visual Content" Change</h4>
                     <div className="flex items-center space-x-4">
                        <div className="flex-1 p-3 bg-white border-2 border-slate-200 rounded-xl text-center">
                           <span className="text-[8px] font-black text-slate-400 uppercase">File Before</span>
                           <p className="text-[10px] font-mono mt-1">Hello World</p>
                        </div>
                        <ArrowRight className="text-slate-300" />
                        <div className="flex-1 p-3 bg-white border-2 border-slate-900 rounded-xl text-center shadow-lg">
                           <span className="text-[8px] font-black text-indigo-500 uppercase">File After</span>
                           <p className="text-[10px] font-mono mt-1">
                              {activeMode === 'r' && 'Hello World (Unchanged)'}
                              {activeMode === 'w' && 'Fresh start! (Old gone!)'}
                              {activeMode === 'a' && 'Hello World\\nNew log entry'}
                           </p>
                        </div>
                     </div>
                  </div>
                </div>
             </HandwrittenCard>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FILE HANDLING LAB */}
      <section className="space-y-10 pt-10 border-t-4 border-dashed border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Terminal /></div>
            <h2 className="text-4xl font-black handwritten text-slate-900">B2.1.3 File Handling Laboratory</h2>
          </div>
          <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Interactive Lab</div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Virtual Drive View */}
          <div className="lg:col-span-4 space-y-6">
            <HandwrittenCard title="Virtual Disk: inspector" bgColor="bg-slate-900" className="text-white border-4 border-slate-700 h-full min-h-[500px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] font-black uppercase text-slate-500">Filename</span>
                  <span className="text-[10px] font-black uppercase text-slate-500">Size / Content</span>
                </div>
                {Object.entries(disk).map(([name, content]) => (
                  <div key={name} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <FileText size={14} className="text-indigo-400" />
                        <span className="text-xs font-mono font-bold text-emerald-400">{name}</span>
                      </div>
                      {/* Fix: Added explicit type assertion to 'content' to fix 'unknown' type errors */}
                      <span className="text-[9px] font-mono text-slate-500">{(content as string).length} chars</span>
                    </div>
                    {/* Fix: Added explicit type assertion to 'content' to fix 'unknown' type errors */}
                    <p className="text-[9px] font-mono text-slate-400 line-clamp-2 truncate border-t border-white/5 pt-1 mt-1 opacity-60 italic">
                      {(content as string).substring(0, 40)}{(content as string).length > 40 ? '...' : ''}
                    </p>
                  </div>
                ))}
                {Object.keys(disk).length === 0 && (
                  <div className="p-8 text-center text-slate-600 italic kalam">Disk is empty...</div>
                )}
              </div>
              <div className="mt-auto pt-8 border-t border-white/10">
                <h5 className="text-[10px] font-black uppercase text-indigo-400 mb-3 flex items-center"><HardDrive size={14} className="mr-2"/> Hardware Status</h5>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                   <div className="bg-indigo-500 h-full w-[25%] animate-pulse" />
                </div>
                <p className="text-[8px] text-slate-500 mt-2 font-mono">Simulated Filesystem V1.0 - Ready.</p>
              </div>
            </HandwrittenCard>
          </div>

          {/* Script Editor and Console */}
          <div className="lg:col-span-8 space-y-6">
            <HandwrittenCard title="Python Script Editor" bgColor="bg-slate-950" className="text-indigo-300 border-slate-800 border-4 shadow-2xl">
              <div className="relative mb-6">
                 <div className="absolute top-4 left-4 text-slate-700 pointer-events-none"><Code size={20}/></div>
                 <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-48 bg-black/40 border-2 border-slate-800 rounded-2xl p-6 pl-12 font-mono text-sm text-emerald-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                  spellCheck={false}
                 />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex space-x-3 w-full sm:w-auto">
                   <button onClick={handleRun} className="flex-1 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black flex items-center justify-center shadow-xl active:scale-95 border-b-4 border-indigo-900 transition-all">
                      <Play size={18} className="mr-2" /> EXECUTE LOGIC
                   </button>
                   <button onClick={resetLab} className="p-4 bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors" title="Reset Files">
                      <RefreshCw size={18} />
                   </button>
                </div>
                
                <div className="flex gap-2">
                   <button onClick={() => setCode("with open('missing.txt', 'r') as f:\n    print(f.read())")} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black uppercase text-rose-400 hover:bg-rose-900/20 transition-all">Test Error</button>
                   <button onClick={() => setCode("try:\n    with open('secret.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('Safe backup engaged!')")} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black uppercase text-emerald-400 hover:bg-emerald-900/20 transition-all">Test Try/Except</button>
                </div>
              </div>

              <div className="mt-8 border-t-2 border-slate-900 pt-6">
                 <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Execution Console</span>
                 </div>
                 <div className={`p-4 rounded-xl border-2 font-mono text-[11px] min-h-[120px] shadow-inner ${status === 'error' ? 'bg-rose-950/20 border-rose-900/50 text-rose-300' : status === 'success' ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300' : 'bg-black/50 border-slate-800 text-slate-400'}`}>
                    {consoleOutput.length > 0 ? (
                      consoleOutput.map((line, i) => <div key={i} className="mb-1 leading-relaxed">{line}</div>)
                    ) : (
                      <span className="opacity-20 italic">Waiting for execution...</span>
                    )}
                 </div>
              </div>
            </HandwrittenCard>

            <div className="p-6 bg-yellow-50 rounded-3xl border-2 border-yellow-200 sketch-border shadow-lg">
               <h4 className="text-sm font-black text-yellow-900 flex items-center mb-2"><Lightbulb size={16} className="mr-2 text-yellow-500" /> Teacher's Lab Notes</h4>
               <p className="text-[11px] kalam text-slate-700 leading-relaxed font-bold">
                 "Try opening <code className="bg-white px-1 rounded">hello.txt</code> in <b>'r'</b> mode to see its content. Then try <b>'a'</b> mode to add a new line without deleting the old ones. If you use <b>'w'</b>, notice how the previous text vanishes instantly!"
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exception Handling Deep Dive */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-rose-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><AlertCircle /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.1.3 Handling Errors</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <HandwrittenCard title="The Try/Except Safety Net" bgColor="bg-white" className="border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(225,29,72,1)]">
             <p className="kalam text-lg font-bold mb-6 italic">"Don't let your code crash! Use a safety net for unpredictable users or missing files."</p>
             <div className="space-y-4">
               <div className="p-4 bg-slate-900 rounded-2xl">
                 <pre className="font-mono text-xs text-indigo-300 whitespace-pre-wrap">
{`try:
    with open("scores.txt", "r") as f:
        data = f.read()
except FileNotFoundError:
    print("Wait! The file doesn't exist yet.")
except Exception as e:
    print(f"Random Error: {e}")
finally:
    print("Execution Finished.")`}
                 </pre>
               </div>
             </div>
          </HandwrittenCard>

          <div className="flex flex-col justify-center">
             <div className="p-8 bg-amber-50 rounded-[3rem] border-4 border-amber-900 sketch-border shadow-2xl">
                <h4 className="text-xl font-black handwritten text-amber-900 mb-6 flex items-center"><Search className="mr-2" size={20}/> Quick Check: Which Mode?</h4>
                <div className="space-y-4">
                   <QuizQuestion 
                    scenario="1. You are building a log for a server that records events every minute." 
                    ans="Append ('a')" 
                   />
                   <QuizQuestion 
                    scenario="2. You need to reset a high-score list back to zero every Monday." 
                    ans="Write ('w')" 
                   />
                   <QuizQuestion 
                    scenario="3. You are displaying a user's profile settings on their dashboard." 
                    ans="Read ('r')" 
                   />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const QuizQuestion = ({ scenario, ans }: { scenario: string, ans: string }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 shadow-sm">
      <p className="text-[11px] font-bold text-slate-600 mb-2">{scenario}</p>
      <div className="flex items-center justify-between">
         <button 
          onClick={() => setRevealed(!revealed)}
          className="text-[9px] font-black uppercase text-amber-600 underline underline-offset-2"
         >
           {revealed ? 'Hide Answer' : 'Show Answer'}
         </button>
         {revealed && (
           <span className="text-[10px] font-mono font-black text-emerald-600 animate-in fade-in slide-in-from-left-2">{ans}</span>
         )}
      </div>
    </div>
  );
};

export default B2FilesExceptionsSection;