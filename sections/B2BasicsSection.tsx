import React from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Braces, Variable, ListOrdered, Scissors, Info, 
  Terminal, Lightbulb, ArrowRight, Zap, Code, 
  Calculator, Sparkles, MessageSquare, ShieldCheck,
  Type, MoveRight, FileCode
} from 'lucide-react';

const B2BasicsSection: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">B2.1 Programming Fundamentals</h1>
        <p className="text-2xl kalam text-slate-600 italic">"The Grammar of Logic in Python"</p>
      </div>

      {/* Intro: The Big 3 */}
      <div className="grid md:grid-cols-3 gap-6">
        <MiniCard title="Input" icon={MessageSquare} color="text-blue-500" desc="Getting data from users using input()" />
        <MiniCard title="Process" icon={Zap} color="text-yellow-500" desc="Doing math or logic with variables" />
        <MiniCard title="Output" icon={Terminal} color="text-green-500" desc="Showing results using print()" />
      </div>

      {/* B2.1.1: Variables and Types */}
      <section className="space-y-10">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Variable /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">Variables & The 'Storage Box' Analogy</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <HandwrittenCard title="Types of Boxes" bgColor="bg-white" className="border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
            <p className="kalam text-lg font-bold mb-6 italic text-slate-500">"Variables are named memory locations. Python detects the 'type' of data you put inside automatically!"</p>
            <div className="space-y-3">
              <TypeRow type="String (str)" syntax='msg = "Hello"' desc="Text data. Must have quotes!" color="text-pink-600" />
              <TypeRow type="Integer (int)" syntax='score = 10' desc="Whole numbers. No decimal point." color="text-indigo-600" />
              <TypeRow type="Float (float)" syntax='pi = 3.141' desc="Decimal numbers (Real numbers)." color="text-emerald-600" />
              <TypeRow type="Boolean (bool)" syntax='alive = True' desc="True or False. Case sensitive!" color="text-amber-600" />
            </div>
            
            <div className="mt-10 p-6 bg-slate-900 rounded-[2rem] border-4 border-slate-950 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Type size={60} className="text-white"/></div>
               <h5 className="text-yellow-400 font-black handwritten text-lg mb-2">Casting: The Translator</h5>
               <p className="text-[10px] kalam text-slate-400 mb-4">"Python's input() always returns a String. To do math, you must CAST it!"</p>
               <div className="flex items-center justify-around bg-white/5 p-4 rounded-xl">
                  <div className="text-center">
                    <span className="text-[8px] font-black text-pink-400 uppercase">Input</span>
                    <p className="text-white font-mono text-xs">"17"</p>
                  </div>
                  <MoveRight className="text-slate-500" />
                  <div className="text-center">
                    <span className="text-[8px] font-black text-indigo-400 uppercase">int("17")</span>
                    <p className="text-white font-mono text-xs">17</p>
                  </div>
                  <MoveRight className="text-slate-500" />
                  <div className="text-center">
                    <span className="text-[8px] font-black text-emerald-400 uppercase">Math Ready</span>
                    <p className="text-emerald-400 font-mono text-xs">17 + 1 = 18</p>
                  </div>
               </div>
            </div>
          </HandwrittenCard>

          <div className="space-y-6">
            <HandwrittenCard title="B2.1.1: Python Arithmetic" bgColor="bg-yellow-50">
               <div className="grid grid-cols-2 gap-4">
                  <OpBox op="+" name="Add" ex="5 + 2 = 7" />
                  <OpBox op="-" name="Sub" ex="5 - 2 = 3" />
                  <OpBox op="*" name="Mult" ex="5 * 2 = 10" />
                  <OpBox op="/" name="Div" ex="5 / 2 = 2.5" />
                  <OpBox op="//" name="Floor" ex="5 // 2 = 2" color="text-rose-600" />
                  <OpBox op="%" name="Mod" ex="5 % 2 = 1" color="text-rose-600" />
                  <OpBox op="**" name="Power" ex="5 ** 2 = 25" />
               </div>
               <div className="mt-6 p-4 bg-white sketch-border border-2 border-yellow-200">
                  <h5 className="font-black text-xs text-yellow-800 uppercase flex items-center mb-1"><Zap size={14} className="mr-2"/> The Modulo (%) Secret</h5>
                  <p className="text-[10px] kalam font-bold text-slate-500">"Check if a number is EVEN? If x % 2 == 0, it's even! This is used in almost every Paper 2 coding task."</p>
               </div>
            </HandwrittenCard>
          </div>
        </div>
      </section>

      {/* B2.1.2: String Superpowers */}
      <section className="space-y-10 pt-10 border-t-2 border-dashed border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="bg-pink-600 text-white p-3 rounded-2xl shadow-xl border-2 border-slate-900"><Scissors /></div>
          <h2 className="text-4xl font-black handwritten text-slate-900">B2.1.2: String Methods & Indexing</h2>
        </div>

        <HandwrittenCard bgColor="bg-pink-50" className="border-4 border-pink-900">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-2xl font-black handwritten text-pink-900">Visualizing the Index Ruler</h4>
              <div className="flex space-x-1 mb-2">
                {['P', 'Y', 'T', 'H', 'O', 'N'].map((char, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[9px] font-mono font-black text-pink-400 mb-1">{i}</span>
                    <div className="w-10 h-10 bg-white border-2 border-slate-900 flex items-center justify-center font-black text-lg shadow-sm">{char}</div>
                    <span className="text-[9px] font-mono font-black text-slate-300 mt-1">{i - 6}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] kalam text-slate-600 italic">"Indexes start at <b>0</b>. Negative indexes start from the <b>end</b> (-1 is the last char!)"</p>
              
              <div className="space-y-2 mt-4 bg-white/40 p-4 rounded-2xl border border-pink-200">
                 <MethodRow name="len(s)" result="6" desc="Size of string" />
                 <MethodRow name="s.upper()" result="'PYTHON'" desc="Converts to ALL UPPERCASE" />
                 <MethodRow name="s.lower()" result="'python'" desc="Converts to all lowercase" />
                 <MethodRow name="s[0:2]" result="'PY'" desc="Slicing: Start at 0, stop at 2" />
                 <MethodRow name="s.find('H')" result="3" desc="Finds first index of 'H'" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-3xl border-4 border-slate-900 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><FileCode size={80} className="text-white"/></div>
                <h4 className="text-xl font-black handwritten text-emerald-400 mb-4 flex items-center"><Code size={18} className="mr-2"/> String Methods Code</h4>
                <pre className="font-mono text-[11px] text-indigo-300 leading-relaxed">
{`text = "Python Programming"

# 1. Changing Case
upper_text = text.upper() # "PYTHON PROGRAMMING"
lower_text = text.lower() # "python programming"

# 2. Searching for Substrings
# .find() returns the STARTING INDEX or -1
pos = text.find("gram")   # pos = 10
missing = text.find("Java")# missing = -1

# 3. Concatenation & Length
size = len(text)          # 18
combined = "IB " + text    # "IB Python Programming"`}
                </pre>
              </div>

              <div className="bg-slate-900 p-8 rounded-[3rem] sketch-border shadow-2xl relative">
                  <h4 className="text-xl font-black handwritten text-yellow-400 mb-4">Exam Success Checklist</h4>
                  <div className="space-y-4">
                    <CheckItem text="Strings are immutable (cannot change in-place)" />
                    <CheckItem text="Index starts at 0, not 1" />
                    <CheckItem text=".find() is case-sensitive" />
                    <CheckItem text="Slicing [start:stop] excludes stop index" />
                  </div>
              </div>
            </div>
          </div>
        </HandwrittenCard>
      </section>
    </div>
  );
};

const MiniCard = ({ title, icon: Icon, color, desc }: any) => (
  <div className="p-6 bg-white sketch-border flex flex-col items-center text-center group hover:shadow-xl transition-all">
    <div className={`p-3 rounded-2xl mb-4 bg-slate-50 ${color} transition-transform group-hover:scale-110`}>
      <Icon size={24} />
    </div>
    <h4 className="font-black handwritten text-xl mb-2">{title}</h4>
    <p className="text-[10px] kalam text-slate-500 font-bold">{desc}</p>
  </div>
);

const TypeRow = ({ type, syntax, desc, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-900 transition-all group">
    <div className="flex-1">
      <h5 className={`font-black text-xs uppercase mb-1 ${color}`}>{type}</h5>
      <p className="text-[9px] kalam font-bold text-slate-500">{desc}</p>
    </div>
    <div className="bg-slate-900 px-3 py-1 rounded-lg">
      <code className="text-[10px] font-mono text-white">{syntax}</code>
    </div>
  </div>
);

const OpBox = ({ op, name, ex, color = "text-indigo-600" }: any) => (
  <div className="p-3 bg-white border-2 border-slate-200 rounded-xl text-center group hover:border-indigo-400 transition-all">
    <span className={`text-xl font-mono font-black ${color}`}>{op}</span>
    <p className="text-[9px] font-black text-slate-400 uppercase mt-1">{name}</p>
    <p className="text-[10px] font-mono text-slate-800 mt-2">{ex}</p>
  </div>
);

const MethodRow = ({ name, result, desc }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-pink-100 last:border-0">
    <div className="flex flex-col">
       <span className="text-[10px] font-mono bg-pink-100 px-2 py-0.5 rounded text-pink-700 font-black w-fit">{name}</span>
       <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">{desc}</span>
    </div>
    <span className="text-[10px] font-mono font-black text-slate-700">→ {result}</span>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-3 text-slate-300">
    <CheckCircle size={16} className="text-emerald-400" />
    <span className="text-xs kalam">{text}</span>
  </div>
);

const CheckCircle = ({size, className}: {size: number, className: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default B2BasicsSection;