import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { Play, CheckCircle, Info, Database, Send, Terminal, RefreshCw, Star, Trophy, ListFilter, PieChart, Table, Construction, Plus } from 'lucide-react';

interface Mission {
  id: number;
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'JOIN' | 'GROUP_BY' | 'CREATE_TABLE' | 'ALTER_TABLE';
  title: string;
  objective: string;
  explanation: string;
  hint: string;
  solution: string;
  expectedRows?: number;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    type: 'CREATE_TABLE',
    title: 'The Architect',
    objective: 'Create a new table named "Teachers" with two columns: ID (INT) and Name (VARCHAR).',
    explanation: 'Data Definition Language (DDL) is used to define the database structure. CREATE TABLE creates a new table in the database.',
    hint: 'Use: CREATE TABLE Teachers (ID INT, Name VARCHAR(50));',
    solution: 'CREATE TABLE TEACHERS',
  },
  {
    id: 2,
    type: 'ALTER_TABLE',
    title: 'The Renovator',
    objective: 'Add a new column "Email" (VARCHAR) to the existing "Students" table.',
    explanation: 'ALTER TABLE is used to add, delete, or modify columns in an existing table structure.',
    hint: 'Use: ALTER TABLE Students ADD Email VARCHAR(100);',
    solution: 'ALTER TABLE STUDENTS ADD',
  },
  {
    id: 3,
    type: 'SELECT',
    title: 'The Data Finder',
    objective: 'Select all columns from the Students table.',
    explanation: 'The SELECT statement is used to fetch data from a database. Using * means "all columns".',
    hint: 'Use: SELECT * FROM Students;',
    solution: 'SELECT * FROM STUDENTS',
  },
  {
    id: 4,
    type: 'INSERT',
    title: 'New Student Arrival',
    objective: "Add a student named 'Dave' with ID 4, Grade 10, and DeptID 20.",
    explanation: 'INSERT INTO adds new rows. You must specify the table and the values in the correct order.',
    hint: "Use: INSERT INTO Students (ID, Name, Grade, DeptID) VALUES (4, 'Dave', 10, 20);",
    solution: 'INSERT INTO STUDENTS',
  },
  {
    id: 5,
    type: 'UPDATE',
    title: 'Grade Promotion',
    objective: "Change Alice's grade to 13.",
    explanation: 'UPDATE modifies existing data. Always use a WHERE clause to avoid updating everyone!',
    hint: "Use: UPDATE Students SET Grade = 13 WHERE Name = 'Alice';",
    solution: 'UPDATE STUDENTS',
  },
  {
    id: 6,
    type: 'DELETE',
    title: 'Leaving School',
    objective: 'Remove the student with ID 2 (Bob) from the system.',
    explanation: 'DELETE removes rows. Like UPDATE, the WHERE clause is critical for precision.',
    hint: 'Use: DELETE FROM Students WHERE ID = 2;',
    solution: 'DELETE FROM STUDENTS',
  },
  {
    id: 7,
    type: 'JOIN',
    title: 'The Link Master',
    objective: 'Join Students and Depts to show Student Names and their Department Titles.',
    explanation: 'JOIN combines rows from two or more tables based on a related column between them (FK = PK).',
    hint: 'Use: SELECT Students.Name, Depts.Title FROM Students INNER JOIN Depts ON Students.DeptID = Depts.ID;',
    solution: 'JOIN',
  },
  {
    id: 8,
    type: 'GROUP_BY',
    title: 'The Data Collector',
    objective: 'Count how many students are in each Department (DeptID).',
    explanation: 'GROUP BY groups rows that have the same values into summary rows. It is almost always used with aggregate functions like COUNT(), SUM(), AVG().',
    hint: 'Use: SELECT DeptID, COUNT(*) FROM Students GROUP BY DeptID;',
    solution: 'GROUP BY DEPTID',
  }
];

interface Student {
  ID: number;
  Name: string;
  Grade: number;
  DeptID: number;
  Email?: string | null;
}

const INITIAL_STUDENTS: Student[] = [
  { ID: 1, Name: 'Alice', Grade: 12, DeptID: 10 },
  { ID: 2, Name: 'Bob', Grade: 11, DeptID: 10 },
  { ID: 3, Name: 'Charlie', Grade: 12, DeptID: 20 },
];

const INITIAL_DEPTS = [
  { ID: 10, Title: 'CS' },
  { ID: 20, Title: 'Math' },
];

const SqlLabSection: React.FC = () => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'idle', msg: string }>({ type: 'idle', msg: '' });
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [dbState, setDbState] = useState({ 
    students: [...INITIAL_STUDENTS], 
    depts: [...INITIAL_DEPTS],
    extraTables: [] as string[],
    studentColumns: ['ID', 'Name', 'Grade', 'DeptID']
  });
  const [results, setResults] = useState<any[]>([]);

  const currentMission = MISSIONS[currentMissionIdx];

  const handleRun = () => {
    const input = userInput.trim().toUpperCase();
    if (!input) return;

    try {
      if (currentMission.type === 'CREATE_TABLE' && input.includes('CREATE TABLE')) {
        if (input.includes('TEACHERS') && input.includes('ID') && input.includes('NAME')) {
          setDbState({ ...dbState, extraTables: [...dbState.extraTables, 'Teachers'] });
          handleSuccess();
        } else {
          throw new Error("Syntax error: Did you include the table name 'Teachers' and the required columns?");
        }
      } else if (currentMission.type === 'ALTER_TABLE' && input.includes('ALTER TABLE')) {
        if (input.includes('STUDENTS') && input.includes('ADD') && input.includes('EMAIL')) {
          setDbState({ 
            ...dbState, 
            studentColumns: [...dbState.studentColumns, 'Email'],
            students: dbState.students.map(s => ({ ...s, Email: null }))
          });
          handleSuccess();
        } else {
          throw new Error("Syntax error: Check your ALTER TABLE syntax. You need to ADD the Email column.");
        }
      } else if (currentMission.type === 'SELECT' && input.includes('SELECT')) {
        setResults(dbState.students);
        if (input.includes('FROM STUDENTS')) {
           handleSuccess();
        } else {
           throw new Error("Syntax error: Did you specify the table 'Students'?");
        }
      } else if (currentMission.type === 'INSERT' && input.includes('INSERT')) {
        if (input.includes('DAVE') && input.includes('4')) {
           const exists = dbState.students.find(s => s.ID === 4);
           if (!exists) setDbState({ ...dbState, students: [...dbState.students, { ...dbState.students[0], ID: 4, Name: 'Dave', Grade: 10, DeptID: 20 }] });
           handleSuccess();
        } else {
           throw new Error("Logic error: Check your VALUES match the mission requirement.");
        }
      } else if (currentMission.type === 'UPDATE' && input.includes('UPDATE')) {
        if (input.includes('ALICE') && input.includes('13')) {
           setDbState({ ...dbState, students: dbState.students.map(s => s.Name === 'Alice' ? { ...s, Grade: 13 } : s) });
           handleSuccess();
        } else {
           throw new Error("Logic error: Ensure you are SETting the Grade and using a WHERE for Alice.");
        }
      } else if (currentMission.type === 'DELETE' && input.includes('DELETE')) {
        if (input.includes('ID = 2') || input.includes('ID=2')) {
           setDbState({ ...dbState, students: dbState.students.filter(s => s.ID !== 2) });
           handleSuccess();
        } else {
           throw new Error("Logic error: Are you deleting the right ID?");
        }
      } else if (currentMission.type === 'JOIN' && input.includes('JOIN')) {
        if (input.includes('ON') && input.includes('DEPTS')) {
           const joined = dbState.students.map(s => {
             const d = dbState.depts.find(dept => dept.ID === s.DeptID);
             return { "Student": s.Name, "Dept": d ? d.Title : '???' };
           });
           setResults(joined);
           handleSuccess();
        } else {
           throw new Error("Syntax error: JOINs require an ON clause to link columns.");
        }
      } else if (currentMission.type === 'GROUP_BY' && input.includes('GROUP BY')) {
        if (input.includes('DEPTID') && (input.includes('COUNT') || input.includes('SUM'))) {
          const counts: Record<number, number> = {};
          dbState.students.forEach(s => {
            counts[s.DeptID] = (counts[s.DeptID] || 0) + 1;
          });
          const groupedResults = Object.entries(counts).map(([deptId, count]) => ({
            "DeptID": deptId,
            "StudentCount": count
          }));
          setResults(groupedResults);
          handleSuccess();
        } else {
          throw new Error("Syntax error: Ensure you are grouping by DeptID and using an aggregate function.");
        }
      } else {
        throw new Error("Command doesn't match mission objective.");
      }
    } catch (e: any) {
      setFeedback({ type: 'error', msg: e.message });
    }
  };

  const handleSuccess = () => {
    setFeedback({ type: 'success', msg: 'Excellent SQL logic! Mission Complete.' });
    if (!completedMissions.includes(currentMission.id)) {
      setCompletedMissions([...completedMissions, currentMission.id]);
    }
  };

  const nextMission = () => {
    if (currentMissionIdx < MISSIONS.length - 1) {
      setCurrentMissionIdx(currentMissionIdx + 1);
      setUserInput('');
      setFeedback({ type: 'idle', msg: '' });
      setResults([]);
    }
  };

  const resetLab = () => {
    setDbState({ 
      students: [...INITIAL_STUDENTS], 
      depts: [...INITIAL_DEPTS],
      extraTables: [],
      studentColumns: ['ID', 'Name', 'Grade', 'DeptID']
    });
    setResults([]);
    setFeedback({ type: 'idle', msg: '' });
    setUserInput('');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">SQL Mission Workshop</h1>
        <p className="text-xl kalam text-slate-600">Mastering DDL and DML in real-time</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Briefing & Progress */}
        <div className="lg:col-span-4 space-y-6">
          <HandwrittenCard title={`Mission ${currentMission.id}: ${currentMission.title}`} bgColor="bg-yellow-50">
            <div className="space-y-4">
              <div className="p-4 bg-white border-2 border-slate-900 shadow-md">
                 <h4 className="font-black text-xs text-slate-500 uppercase mb-2">The Objective:</h4>
                 <p className="text-sm font-bold kalam text-slate-900">{currentMission.objective}</p>
              </div>
              <div className="p-4 bg-white/60 border-2 border-dashed border-indigo-200 rounded-2xl">
                 <h4 className="font-black text-xs text-indigo-800 uppercase mb-2 flex items-center"><Info size={14} className="mr-1"/> The Logic:</h4>
                 <p className="text-[11px] font-bold kalam text-slate-700 italic">"{currentMission.explanation}"</p>
              </div>
              <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-xl text-[10px] font-bold kalam text-yellow-900 shadow-inner">
                <b>Psst! Try this:</b> {currentMission.hint}
              </div>
            </div>
          </HandwrittenCard>

          <div className="p-6 bg-slate-900 text-white rounded-[2rem] border-4 border-slate-900 shadow-2xl">
            <h3 className="text-xl font-black handwritten text-yellow-400 mb-4 border-b border-slate-800 pb-2 flex items-center">
              <Star className="mr-2" size={18} /> Workshop Status
            </h3>
            <div className="space-y-2">
              {MISSIONS.map(m => (
                <div key={m.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${currentMission.id === m.id ? 'bg-white/10 ring-2 ring-indigo-500' : 'opacity-40'}`}>
                  <span className="text-[10px] font-mono font-black">{m.id}. {m.type.replace('_', ' ')}</span>
                  {completedMissions.includes(m.id) ? <CheckCircle className="text-emerald-400" size={16} /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
                </div>
              ))}
            </div>
            {completedMissions.length === MISSIONS.length && (
              <div className="mt-8 p-4 bg-indigo-600 rounded-2xl text-center shadow-lg border-2 border-indigo-400 animate-bounce">
                <Trophy size={32} className="mx-auto text-yellow-400 mb-2"/>
                <p className="text-xs font-black uppercase tracking-widest">Architect Mastered!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Terminal & Tables */}
        <div className="lg:col-span-8 space-y-6">
          <HandwrittenCard title="SQL Terminal" bgColor="bg-slate-950" className="text-indigo-300 border-slate-800 border-4 shadow-2xl">
            <div className="relative">
              <Terminal className="absolute top-4 left-4 text-slate-600" size={24} />
              <textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="-- Write your SQL code here..."
                className="w-full h-48 bg-transparent border-2 border-slate-800 focus:border-indigo-500 rounded-xl p-8 pl-14 font-mono text-base focus:outline-none transition-all placeholder:text-slate-700 text-emerald-400"
                spellCheck={false}
              />
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex space-x-3">
                <button 
                  onClick={handleRun}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black flex items-center shadow-xl active:scale-95 transition-all"
                >
                  <Send size={20} className="mr-2" /> EXECUTE COMMAND
                </button>
                <button 
                  onClick={resetLab}
                  className="p-4 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-700"
                  title="Reset DB State"
                >
                  <RefreshCw size={20} />
                </button>
              </div>

              {feedback.type !== 'idle' && (
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-4 shadow-xl animate-in slide-in-from-right-4 ${feedback.type === 'success' ? 'bg-green-950 border-green-500 text-green-300' : 'bg-red-950 border-red-500 text-red-300'}`}>
                  {feedback.type === 'success' ? <CheckCircle size={24} /> : <Info size={24} />}
                  <span className="text-sm font-black uppercase">{feedback.msg}</span>
                  {/* Fix: use currentMissionIdx instead of activeMissionIdx */}
                  {feedback.type === 'success' && currentMissionIdx < MISSIONS.length - 1 && (
                    <button onClick={nextMission} className="ml-4 px-4 py-2 bg-white text-slate-900 rounded-lg font-black text-xs hover:bg-slate-100 shadow-md">
                      NEXT MISSION
                    </button>
                  )}
                </div>
              )}
            </div>
          </HandwrittenCard>

          {/* High Contrast Tables Preview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-4 border-slate-900 shadow-xl overflow-hidden rounded-[2rem]">
               <h4 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center tracking-[0.2em]">
                 <Database size={14} className="mr-2 text-indigo-600"/> Current Table: Students
               </h4>
               <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                 <table className="w-full text-xs font-mono bg-white text-slate-900">
                    <thead>
                      <tr className="border-b-4 border-slate-900 bg-slate-100">
                        {dbState.studentColumns.map(col => (
                          <th key={col} className="p-3 text-left font-black border-r border-slate-200">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {dbState.students.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-bold border-r border-slate-200 text-indigo-700">{s.ID}</td>
                          <td className="p-3 font-bold border-r border-slate-200">{s.Name}</td>
                          <td className="p-3 font-bold border-r border-slate-200">{s.Grade}</td>
                          <td className="p-3 font-bold border-r border-slate-200 bg-slate-50/50">{s.DeptID}</td>
                          {dbState.studentColumns.includes('Email') && <td className="p-3 text-slate-400 italic">NULL</td>}
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            <div className="p-6 bg-white border-4 border-slate-900 shadow-xl overflow-hidden rounded-[2rem] relative">
               <h4 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center tracking-[0.2em]">
                 <Database size={14} className="mr-2 text-indigo-600"/> Table: Depts
               </h4>
               <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                 <table className="w-full text-xs font-mono bg-white text-slate-900">
                    <thead>
                      <tr className="border-b-4 border-slate-900 bg-slate-100">
                        <th className="p-3 text-left font-black border-r border-slate-200">ID</th>
                        <th className="p-3 text-left font-black">Title</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {dbState.depts.map(d => (
                        <tr key={d.ID} className="hover:bg-slate-50">
                          <td className="p-3 font-bold border-r border-slate-200 text-slate-500">{d.ID}</td>
                          <td className="p-3 font-bold">{d.Title}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
               
               {dbState.extraTables.length > 0 && (
                 <div className="mt-6 p-4 bg-emerald-50 border-2 border-dashed border-emerald-500 rounded-2xl animate-in zoom-in duration-500">
                    <p className="text-xs font-black text-emerald-900 flex items-center">
                      <Plus size={16} className="mr-2"/> NEW TABLE ARCHITECTED: <span className="underline ml-2">{dbState.extraTables.join(', ')}</span>
                    </p>
                 </div>
               )}

               {results.length > 0 && (
                 <div className="mt-6 p-4 bg-indigo-50 rounded-3xl border-4 border-slate-900 animate-in slide-in-from-top-4 shadow-2xl">
                    <h5 className="text-[10px] font-black text-indigo-900 mb-3 uppercase tracking-widest flex items-center">
                      <Table size={14} className="mr-2"/> Result Set Output:
                    </h5>
                    <div className="space-y-3">
                      {results.map((r, i) => (
                        <div key={i} className="text-xs font-mono flex flex-wrap gap-4 border-b-2 border-indigo-100 pb-3 bg-white p-3 rounded-xl shadow-sm">
                          {Object.entries(r).map(([k, v]: any) => (
                            <div key={k} className="flex space-x-2">
                              <span className="text-slate-400 font-black uppercase text-[9px]">{k}:</span>
                              <span className="font-bold text-slate-900">{v}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlLabSection;