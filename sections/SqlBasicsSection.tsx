import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Database, Box, Construction, Eraser, PlusCircle, Edit3, Trash2, Search, Lock, Unlock, Save, RotateCcw, Zap, Terminal, Code } from 'lucide-react';

const SqlBasicsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'DDL' | 'DML' | 'DCL' | 'TCL'>('DDL');

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tighter">A3.3 Database Programming</h1>
        <p className="text-2xl kalam text-slate-600 italic">"From Schema Design to Code Implementation"</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <CategoryTab active={activeCategory === 'DDL'} onClick={() => setActiveCategory('DDL')} label="1. DDL: The Architect" color="bg-indigo-600" />
        <CategoryTab active={activeCategory === 'DML'} onClick={() => setActiveCategory('DML')} label="2. DML: The Operator" color="bg-emerald-600" />
        <CategoryTab active={activeCategory === 'DCL'} onClick={() => setActiveCategory('DCL')} label="3. DCL: The Guard" color="bg-amber-600" />
        <CategoryTab active={activeCategory === 'TCL'} onClick={() => setActiveCategory('TCL')} label="4. TCL: The Safety Net" color="bg-rose-600" />
      </div>

      <HandwrittenCard bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
        <div className="animate-in fade-in duration-500" key={activeCategory}>
          {activeCategory === 'DDL' && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3"><Terminal className="text-indigo-600" size={32}/><h3 className="text-3xl font-black handwritten">Data Definition Language (DDL)</h3></div>
              <p className="kalam text-lg text-slate-700 font-bold">"DDL builds the house. It defines tables, keys, and constraints."</p>
              <div className="grid md:grid-cols-2 gap-6">
                <CodeStep title="Step 1: Create Table" code="CREATE TABLE Students (\n  ID INT PRIMARY KEY,\n  Name VARCHAR(50)\n);" />
                <CodeStep title="Step 2: Modify Structure" code="ALTER TABLE Students\nADD Email VARCHAR(100);" />
                <CodeStep title="Step 3: Delete Object" code="DROP TABLE Teachers;" />
                <div className="p-4 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600 flex items-start space-x-3">
                  <Zap size={20} className="text-indigo-600 shrink-0"/>
                  <p className="text-[11px] kalam italic text-indigo-900"><b>Crucial Tip:</b> Constraints like NOT NULL or UNIQUE are set during DDL stage to enforce <b>Data Integrity</b> from day one.</p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'DML' && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3"><Edit3 className="text-emerald-600" size={32}/><h3 className="text-3xl font-black handwritten">Data Manipulation Language (DML)</h3></div>
              <p className="kalam text-lg text-slate-700 font-bold">"DML moves the furniture. It interacts with the actual data rows."</p>
              <div className="grid md:grid-cols-2 gap-6">
                <CodeStep title="Insert Records" code="INSERT INTO Students\nVALUES (1, 'Alice', 'a@school.com');" />
                <CodeStep title="Update Existing" code="UPDATE Students\nSET Email = 'alice@web.com'\nWHERE ID = 1;" />
                <CodeStep title="Remove Rows" code="DELETE FROM Students\nWHERE ID = 1;" />
                <CodeStep title="Fetch Data" code="SELECT * FROM Students\nWHERE Name LIKE 'A%';" />
              </div>
            </div>
          )}

          {activeCategory === 'TCL' && (
            <div className="space-y-8">
               <div className="flex items-center space-x-3"><Save className="text-rose-600" size={32}/><h3 className="text-3xl font-black handwritten">Transaction Control (TCL)</h3></div>
               <p className="kalam text-lg text-slate-700 font-bold">"Ensuring operations are 'All or Nothing'. Used for ACID compliance."</p>
               <div className="bg-slate-900 p-8 rounded-3xl text-indigo-300 font-mono text-sm relative border-4 border-rose-500 shadow-xl">
                 <pre>{`BEGIN TRANSACTION;\n  UPDATE Accounts SET Bal = Bal - 100 WHERE ID = 1;\n  UPDATE Accounts SET Bal = Bal + 100 WHERE ID = 2;\nCOMMIT; -- Make changes permanent`}</pre>
                 <div className="absolute -top-4 right-8 bg-rose-600 text-white px-3 py-1 rounded text-[10px] font-black">ACID ENFORCEMENT</div>
               </div>
            </div>
          )}

          {activeCategory === 'DCL' && (
            <div className="space-y-8">
               <div className="flex items-center space-x-3"><Lock className="text-amber-600" size={32}/><h3 className="text-3xl font-black handwritten">Data Control Language (DCL)</h3></div>
               <p className="kalam text-lg text-slate-700 font-bold">"Managing permissions. Who can see what?"</p>
               <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 bg-amber-50 sketch-border border-2 border-amber-300 flex flex-col items-center">
                   <Unlock size={24} className="text-amber-600 mb-2"/>
                   <span className="font-black text-xs">GRANT SELECT</span>
                   <p className="text-[9px] kalam mt-1">Allows a user to view data.</p>
                 </div>
                 <div className="p-6 bg-amber-50 sketch-border border-2 border-amber-300 flex flex-col items-center">
                   <Lock size={24} className="text-amber-600 mb-2"/>
                   <span className="font-black text-xs">REVOKE UPDATE</span>
                   <p className="text-[9px] kalam mt-1">Stops a user from editing.</p>
                 </div>
               </div>
            </div>
          )}
        </div>
      </HandwrittenCard>
    </div>
  );
};

const CategoryTab = ({ active, onClick, label, color }: any) => (
  <button onClick={onClick} className={`px-6 py-2 rounded-full font-black text-xs transition-all border-2 border-slate-900 shadow-md ${active ? `${color} text-white scale-105` : 'bg-white text-slate-600 opacity-60 hover:opacity-100'}`}>{label}</button>
);

const CodeStep = ({ title, code }: any) => (
  <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl group hover:border-indigo-400 transition-colors">
    <h5 className="font-black text-[10px] uppercase text-slate-400 mb-2">{title}</h5>
    <pre className="font-mono text-[11px] text-indigo-700 whitespace-pre-wrap leading-relaxed">{code}</pre>
  </div>
);

export default SqlBasicsSection;