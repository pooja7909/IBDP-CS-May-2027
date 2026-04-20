
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
// Fix: Import missing Info and Star icons
import { Terminal, Play, RefreshCw, Table as TableIcon, CheckCircle2, AlertCircle, Users, Landmark, Info, Star } from 'lucide-react';

const INITIAL_STUDENTS = [
  { ID: 1, Name: 'Alice', Grade: 12, DeptID: 10 },
  { ID: 2, Name: 'Bob', Grade: 11, DeptID: 10 },
  { ID: 3, Name: 'Charlie', Grade: 12, DeptID: 20 },
];

const INITIAL_DEPTS = [
  { ID: 10, Title: 'CS' },
  { ID: 20, Title: 'Math' },
];

const SqlPlaygroundSection: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM Students;');
  const [students, setStudents] = useState([...INITIAL_STUDENTS]);
  const [results, setResults] = useState<any[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle', msg: string }>({ type: 'idle', msg: '' });

  const templates = [
    { name: 'Get All', sql: 'SELECT * FROM Students;' },
    { name: 'Filter', sql: "SELECT Name FROM Students WHERE Grade = 12;" },
    { name: 'Insert', sql: "INSERT INTO Students (ID, Name, Grade, DeptID) VALUES (4, 'Zoe', 10, 20);" },
    { name: 'Update', sql: "UPDATE Students SET Grade = 13 WHERE Name = 'Alice';" },
    { name: 'Delete', sql: "DELETE FROM Students WHERE ID = 2;" },
    { name: 'Join Query', sql: "SELECT Students.Name, Depts.Title FROM Students INNER JOIN Depts ON Students.DeptID = Depts.ID;" },
  ];

  const handleRun = () => {
    const q = query.trim().toUpperCase();
    
    try {
      if (q.startsWith('SELECT')) {
        if (q.includes('JOIN')) {
          const joined = students.map(s => {
            const d = INITIAL_DEPTS.find(dept => dept.ID === s.DeptID);
            return { "Student Name": s.Name, "Department": d ? d.Title : 'NULL' };
          });
          setResults(joined);
          setStatus({ type: 'success', msg: `JOIN successful. Combined data from 2 tables.` });
        } else if (q.includes('WHERE GRADE = 12')) {
          setResults(students.filter(s => s.Grade === 12).map(s => ({ Name: s.Name, Grade: s.Grade })));
          setStatus({ type: 'success', msg: `Filtered result set returned.` });
        } else if (q.includes('FROM DEPTS') || q.includes('FROM DEPARTMENTS')) {
          setResults(INITIAL_DEPTS);
          setStatus({ type: 'success', msg: `Query executed on Departments table.` });
        } else {
          setResults(students);
          setStatus({ type: 'success', msg: `Query executed. Returned ${students.length} rows.` });
        }
      } else if (q.startsWith('INSERT')) {
        const newStudent = { ID: 4, Name: 'Zoe', Grade: 10, DeptID: 20 };
        if (!students.find(s => s.ID === 4)) {
          setStudents([...students, newStudent]);
          setResults([]);
          setStatus({ type: 'success', msg: '1 row inserted successfully.' });
        } else {
          throw new Error('Constraint Violation: Duplicate entry for ID 4');
        }
      } else if (q.startsWith('UPDATE')) {
        setStudents(students.map(s => s.Name === 'Alice' ? { ...s, Grade: 13 } : s));
        setResults([]);
        setStatus({ type: 'success', msg: '1 row updated successfully.' });
      } else if (q.startsWith('DELETE')) {
        setStudents(students.filter(s => s.ID !== 2));
        setResults([]);
        setStatus({ type: 'success', msg: '1 row deleted successfully.' });
      } else {
        throw new Error('Syntax Error: Command not supported in this simplified lab.');
      }
    } catch (e: any) {
      setStatus({ type: 'error', msg: e.message });
      setResults([]);
    }
  };

  const reset = () => {
    setStudents([...INITIAL_STUDENTS]);
    setResults([]);
    setQuery('SELECT * FROM Students;');
    setStatus({ type: 'idle', msg: '' });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-8">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Interactive SQL Lab</h1>
        <p className="text-xl kalam text-slate-600">Practice real queries in a safe sandbox</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <HandwrittenCard title="The Query Editor" bgColor="bg-slate-900" className="text-white border-slate-700 shadow-2xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {templates.map(t => (
                <button 
                  key={t.name}
                  onClick={() => setQuery(t.sql)}
                  className="px-3 py-1 bg-slate-800 hover:bg-indigo-600 border border-slate-600 rounded text-[10px] font-mono transition-colors text-indigo-100 font-bold"
                >
                  {t.name}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Terminal className="absolute top-4 left-4 text-slate-500" size={20} />
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-40 bg-slate-950 border-2 border-slate-800 rounded-xl p-6 pl-12 font-mono text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                spellCheck={false}
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleRun}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-black flex items-center transition-all shadow-lg active:scale-95"
                >
                  <Play size={16} className="mr-2" /> RUN QUERY
                </button>
                <button 
                  onClick={reset}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors shadow-md"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
              
              {status.type !== 'idle' && (
                <div className={`flex items-center p-3 rounded-lg border-2 shadow-sm ${status.type === 'success' ? 'bg-green-950/40 border-green-700 text-green-300' : 'bg-red-950/40 border-red-700 text-red-300'}`}>
                  {status.type === 'success' ? <CheckCircle2 size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
                  <span className="text-[11px] font-black uppercase">{status.msg}</span>
                </div>
              )}
            </div>
          </HandwrittenCard>

          <HandwrittenCard title="Result Set Output" bgColor="bg-white" className="shadow-lg border-slate-200">
            {results.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border-2 border-slate-100 shadow-inner">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-800">
                      {Object.keys(results[0]).map(key => (
                        <th key={key} className="p-4 text-left uppercase tracking-widest font-black text-[10px]">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="p-4 font-bold text-slate-900 border-r border-slate-50 last:border-r-0">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 italic border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                <TableIcon size={40} className="mb-2 opacity-20" />
                <p className="kalam font-bold text-sm">Waiting for SELECT query execution...</p>
              </div>
            )}
          </HandwrittenCard>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white sketch-border shadow-xl border-indigo-100">
            <h3 className="font-black text-slate-900 mb-6 flex items-center border-b-2 border-indigo-50 pb-3">
              <DatabaseIcon className="mr-2 text-indigo-600" size={20} /> LIVE DB STATE
            </h3>
            
            <div className="mb-8">
              <h4 className="text-[10px] font-black uppercase text-indigo-600 mb-3 flex items-center bg-indigo-50 p-2 rounded tracking-widest">
                <Users size={14} className="mr-2" /> Table: Students
              </h4>
              <div className="space-y-2">
                <div className="flex text-[9px] font-black text-slate-500 px-3 uppercase mb-1">
                  <span className="w-10">ID</span>
                  <span className="flex-1">Name</span>
                  <span className="w-12 text-right">DeptID</span>
                </div>
                {students.map(s => (
                  <div key={s.ID} className="p-3 bg-slate-50 rounded-lg border-2 border-slate-100 text-[11px] font-mono flex justify-between items-center group shadow-sm hover:border-indigo-200 transition-colors">
                    <span className="w-10 text-indigo-600 font-black">#{s.ID}</span>
                    <span className="flex-1 font-bold text-slate-900">{s.Name}</span>
                    <span className="w-12 text-right px-1.5 py-1 bg-indigo-100/50 rounded text-indigo-800 font-black border border-indigo-200">{s.DeptID}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-600 mb-3 flex items-center bg-slate-100 p-2 rounded tracking-widest">
                <Landmark size={14} className="mr-2" /> Table: Depts
              </h4>
              <div className="space-y-2">
                <div className="flex text-[9px] font-black text-slate-500 px-3 uppercase mb-1">
                  <span className="w-10">ID</span>
                  <span className="flex-1">Title</span>
                </div>
                {INITIAL_DEPTS.map(d => (
                  <div key={d.ID} className="p-3 bg-slate-50 rounded-lg border-2 border-slate-100 text-[11px] font-mono flex justify-between items-center group shadow-sm hover:border-slate-200 transition-colors">
                    <span className="w-10 text-slate-500 font-black">#{d.ID}</span>
                    <span className="flex-1 font-bold text-slate-800">{d.Title}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 p-4 bg-indigo-50 rounded-xl text-[10px] kalam text-indigo-900 italic leading-relaxed border border-indigo-100">
              <Info size={14} className="inline mr-1 mb-0.5 text-indigo-500"/>
              Notice how <b>DeptID</b> in Students links to the <b>ID</b> in Depts. This is the Foreign Key relationship!
            </p>
          </div>

          <HandwrittenCard bgColor="bg-yellow-50" className="border-yellow-200 shadow-lg">
             <h4 className="font-black text-xs uppercase text-yellow-900 mb-3 flex items-center">
               <Star size={14} className="mr-2 text-yellow-600"/> JOIN Logic Tip!
             </h4>
             <p className="text-[12px] kalam leading-relaxed text-slate-800 font-medium">
               When you JOIN, SQL looks for matching values in both tables. <br/><br/>
               The <span className="font-black text-indigo-700">ON</span> clause tells SQL exactly which columns to "glue" together.
             </p>
          </HandwrittenCard>
        </div>
      </div>
    </div>
  );
};

const DatabaseIcon = ({size, className}: {size: number, className: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
  </svg>
);

export default SqlPlaygroundSection;
