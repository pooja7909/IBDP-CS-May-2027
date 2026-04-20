
import React, { useState, useEffect } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Calendar, ChevronLeft, ChevronRight, Star, Flag, Clock, 
  BookOpen, Search, Code, BrainCircuit, Network, 
  MessageSquareText, Database, Plus, Trash2, Edit2, Save, RotateCcw,
  CheckCircle2, AlertCircle, Lock, Unlock, X, Key, ClipboardCheck, Zap,
  LogIn, LogOut
} from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User, signInAnonymously } from 'firebase/auth';

interface MonthPlan {
  month: string;
  topic: string;
  details: string[];
  type: 'Topic A' | 'Topic B' | 'IA' | 'Exam' | 'Case Study' | 'Topic B4' | 'Topic Assessment';
  isMilestone?: boolean;
}

const DEFAULT_DP1_PLAN: MonthPlan[] = [
  { month: 'August', topic: 'Course Launch & B1', type: 'Topic B', details: ['Introduction to CS', 'B1.1 Approaches to Computational Thinking'] },
  { month: 'September', topic: 'Programming B2', type: 'Topic B', details: ['Python/Java Fundamentals', 'Variables, Control Flow', 'Basic Data Structures'] },
  { month: 'October', topic: 'Algorithms B2', type: 'Topic B', details: ['Search & Sort Algorithms', 'Big O Notation', 'Trace Tables', 'Topic Assessment - programming in python'] },
  { month: 'November', topic: 'OOP B3 Part 1', type: 'Topic B', details: ['Classes & Objects', 'Encapsulation', 'Constructors'] },
  { month: 'December', topic: 'OOP B3 Part 2', type: 'Topic B', details: ['Inheritance & Polymorphism', 'Multiple Classes Logic'] },
  { month: 'January', topic: 'Database Design A3', type: 'Topic A', details: ['A3.1 Features & Anomalies', 'A3.2.1-4 Schemas & ERDs'] },
  { month: 'February', topic: 'Normalization A3', type: 'Topic A', details: ['A3.2.5-7 1NF, 2NF, 3NF', 'Denormalization Evaluation'] },
  { month: 'March', topic: 'SQL Programming A3', type: 'Topic A', details: ['A3.3 SQL DDL & DML', 'Aggregate Functions', 'JOINS'] },
  { month: 'April', topic: 'IA Start & Review', type: 'IA', details: ['Criterion A: Problem Specification', 'Drafting success criteria'] },
  { month: 'May', topic: 'EOY Exams', type: 'Exam', isMilestone: true, details: ['Paper 1 & 2 Foundations', 'IA Criterion B Planning'] },
  { month: 'June', topic: 'IA Progress & Case Study', type: 'Case Study', isMilestone: true, details: ['CASE STUDY RELEASED!', 'Criterion B Submission'] },
];

const DEFAULT_DP2_PLAN: MonthPlan[] = [
  { month: 'August', topic: 'Networks A2 & IA Dev', type: 'Topic A', details: ['A2.1-2 Network Fundamentals', 'IA Criterion D: Development'] },
  { month: 'September', topic: 'Network Security A2', type: 'Topic A', details: ['A2.3-4 Security Protocols', 'Encryption Basics'] },
  { month: 'October', topic: 'IA Development Cont.', type: 'IA', details: ['Coding the Product', 'Drafting Testing Strategy'] },
  { month: 'November', topic: 'Machine Learning A4', type: 'Topic A', details: ['A4.1-3 ML Foundations', 'Supervised vs Unsupervised'] },
  { month: 'December', topic: 'Computer Fundamentals A1', type: 'Topic A', details: ['A1.1 CPU Components', 'A1.3 OS & Scheduling', 'Final IA Submission'] },
  { month: 'January', topic: 'Mock Exams', type: 'Exam', isMilestone: true, details: ['Full Past Paper Simulation', 'Case Study Deep Dive 1'] },
  { month: 'February', topic: 'Case Study & Review', type: 'Case Study', details: ['Detailed research on pre-seen', 'Linking questions practice'] },
  { month: 'March', topic: 'Final Sprint', type: 'Exam', isMilestone: true, details: ['Exam Paper Mastery', 'Revision of Topic A & B'] },
];

// Start exactly the same
const DEFAULT_DP1_HL_PLAN: MonthPlan[] = [...DEFAULT_DP1_PLAN];
const DEFAULT_DP2_HL_PLAN: MonthPlan[] = [...DEFAULT_DP2_PLAN];

const TimelineSection: React.FC = () => {
  const [activeYear, setActiveYear] = useState<'DP1' | 'DP2'>('DP1');
  const [activeTrack, setActiveTrack] = useState<'SL' | 'HL'>('SL');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // UI toggle
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [dp1Plan, setDp1Plan] = useState<MonthPlan[]>(DEFAULT_DP1_PLAN);
  const [dp2Plan, setDp2Plan] = useState<MonthPlan[]>(DEFAULT_DP2_PLAN);
  const [dp1HlPlan, setDp1HlPlan] = useState<MonthPlan[]>(DEFAULT_DP1_HL_PLAN);
  const [dp2HlPlan, setDp2HlPlan] = useState<MonthPlan[]>(DEFAULT_DP2_HL_PLAN);

  // Sync with Firestore
  useEffect(() => {
    const unsubDP1SL = onSnapshot(doc(db, 'curriculum', 'dp1_sl'), (snap) => {
      if (snap.exists()) setDp1Plan(snap.data().items);
    });
    const unsubDP2SL = onSnapshot(doc(db, 'curriculum', 'dp2_sl'), (snap) => {
      if (snap.exists()) setDp2Plan(snap.data().items);
    });
    const unsubDP1HL = onSnapshot(doc(db, 'curriculum', 'dp1_hl'), (snap) => {
      if (snap.exists()) setDp1HlPlan(snap.data().items);
    });
    const unsubDP2HL = onSnapshot(doc(db, 'curriculum', 'dp2_hl'), (snap) => {
      if (snap.exists()) setDp2HlPlan(snap.data().items);
    });

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const ownerSession = sessionStorage.getItem('ibdp_owner_authenticated');
    if (ownerSession === 'true') {
      setIsOwner(true);
    }

    return () => {
      unsubDP1SL(); unsubDP2SL(); unsubDP1HL(); unsubDP2HL(); unsubAuth();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAuthError(false);
    } catch (error) {
      console.error("Login failed", error);
      setAuthError(true);
    }
  };

  const isActuallyAdmin = currentUser?.email === 'poojaaro@gmail.com';

  const getCurrentPlan = () => {
    if (activeYear === 'DP1') return activeTrack === 'SL' ? dp1Plan : dp1HlPlan;
    return activeTrack === 'SL' ? dp2Plan : dp2HlPlan;
  };

  const getSetPlan = () => {
    if (activeYear === 'DP1') return activeTrack === 'SL' ? setDp1Plan : setDp1HlPlan;
    return activeTrack === 'SL' ? setDp2Plan : setDp2HlPlan;
  };

  const currentPlan = getCurrentPlan();
  const setPlan = getSetPlan();
  
  const safeMonthIdx = Math.min(selectedMonth, currentPlan.length - 1);
  const currentItem = currentPlan[safeMonthIdx];

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ownerPassword = import.meta.env.VITE_OWNER_PASSWORD || 'Arora2027';
    if (passwordInput === ownerPassword) {
      setIsOwner(true);
      setIsEditing(true);
      sessionStorage.setItem('ibdp_owner_authenticated', 'true');
      
      // Silently sign in anonymously to allow Firebase Cloud writes via rules
      if (!currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.error("Anonymous auth failed", err);
        }
      }
      
      setShowAuthModal(false);
      setPasswordInput('');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const toggleEditMode = () => {
    if (isOwner) setIsEditing(!isEditing);
    else setShowAuthModal(true);
  };

  const logoutOwner = async () => {
    setIsOwner(false);
    setIsEditing(false);
    sessionStorage.removeItem('ibdp_owner_authenticated');
    await signOut(auth);
  };

  const saveToFirestore = async (items: MonthPlan[]) => {
    // Check if the user is authenticated (either via Google or Anonymous passcode)
    if (!auth.currentUser) return;
    
    const planId = `${activeYear.toLowerCase()}_${activeTrack.toLowerCase()}`;
    try {
      await setDoc(doc(db, 'curriculum', planId), {
        items,
        lastUpdated: serverTimestamp(),
        updatedBy: currentUser?.email || 'Anonymous Owner'
      });
    } catch (error) {
      console.error("Failed to save to Firestore", error);
    }
  };

  const updateCurrentItem = (updates: Partial<MonthPlan>) => {
    if (!isOwner) return;
    const newPlan = [...currentPlan];
    newPlan[safeMonthIdx] = { ...newPlan[safeMonthIdx], ...updates };
    setPlan(newPlan);
    
    // Always attempt cloud sync if authenticated (via passcode or Google)
    if (auth.currentUser) {
      saveToFirestore(newPlan);
    }
    
    // Also update local storage for redundancy
    localStorage.setItem(`ibdp_cs_${activeYear.toLowerCase()}_${activeTrack === 'SL' ? '' : 'hl_'}plan`, JSON.stringify(newPlan));
  };

  const handleAddDetail = () => {
    const newDetails = [...currentItem.details, 'New sub-topic...'];
    updateCurrentItem({ details: newDetails });
  };

  const handleRemoveDetail = (index: number) => {
    const newDetails = currentItem.details.filter((_, i) => i !== index);
    updateCurrentItem({ details: newDetails });
  };

  const handleUpdateDetail = (index: number, val: string) => {
    const newDetails = [...currentItem.details];
    newDetails[index] = val;
    updateCurrentItem({ details: newDetails });
  };

  const resetToDefault = () => {
    if (!isOwner) return;
    if (window.confirm("Reset current level/track defaults?")) {
      if (activeYear === 'DP1') {
        if (activeTrack === 'SL') setDp1Plan(DEFAULT_DP1_PLAN);
        else setDp1HlPlan(DEFAULT_DP1_HL_PLAN);
      } else {
        if (activeTrack === 'SL') setDp2Plan(DEFAULT_DP2_PLAN);
        else setDp2HlPlan(DEFAULT_DP2_HL_PLAN);
      }
      localStorage.removeItem(`ibdp_cs_${activeYear.toLowerCase()}_${activeTrack === 'SL' ? '' : 'hl_'}plan`);
    }
  };

  const isAssessmentMonth = (plan: MonthPlan) => 
    plan.type === 'Topic Assessment' || 
    plan.details.some(d => d.toLowerCase().includes('assessment'));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Topic A': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Topic B': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Topic B4': return 'bg-purple-900 text-white border-purple-950';
      case 'IA': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Exam': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Case Study': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Topic Assessment': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 relative">
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[2rem] sketch-border shadow-2xl max-w-sm w-full relative text-center">
            <button onClick={() => { setShowAuthModal(false); setAuthError(false); setPasswordInput(''); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"><X size={20} /></button>
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-200 shadow-inner"><Key className="text-yellow-600" size={32} /></div>
              <h2 className="text-2xl font-black handwritten text-slate-900">Owner Access</h2>
              <p className="text-xs kalam text-slate-500 mt-1">Unlock editing tools or sign in to Cloud.</p>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={handleAuthSubmit} className="space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 text-left ml-1">Local Unlock (Passcode):</p>
                <input type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setAuthError(false); }} placeholder="Passcode..." className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl text-center font-bold tracking-widest focus:outline-none transition-colors ${authError ? 'border-red-500 bg-red-50 text-red-600 animate-shake' : 'border-slate-200 focus:border-slate-900'}`}/>
                <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all active:scale-95">UNLOCK LOCAL UI</button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 pointer-events-none"></div></div>
                <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="bg-white px-4 text-slate-400">OR CLOUD SYNC</span></div>
              </div>

              {!currentUser ? (
                <button onClick={loginWithGoogle} className="w-full py-3 bg-white text-slate-700 border-2 border-slate-100 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
                  <img src="https://www.gstatic.com/firebase/anonymous-scan.png" className="w-5 h-5 opacity-0 absolute" alt=""/>
                  <div className="w-5 h-5 bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url(https://www.google.com/favicon.ico)'}}></div>
                  <span>Sign in as Ms. Arora</span>
                </button>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-100 text-green-700">
                  <p className="text-[10px] font-black uppercase mb-1">Authenticated Cloud Identity:</p>
                  <p className="text-xs font-bold truncate">{currentUser.email}</p>
                  {isActuallyAdmin ? (
                    <div className="mt-2 flex items-center justify-center text-[10px] uppercase font-black text-green-600">
                      <CheckCircle2 size={12} className="mr-1"/> Cloud Write Enabled
                    </div>
                  ) : (
                    <div className="mt-2 text-[8px] text-red-500 uppercase font-black">Not recognized as Admin. Reads only.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl md:text-6xl font-black handwritten text-slate-900 mb-2">Curriculum Journey</h1>
        <p className="text-xl kalam text-slate-600 italic">"The 18-month roadmap to IBDP Success"</p>
        
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="inline-flex bg-slate-200 p-1 rounded-2xl sketch-border">
            <button onClick={() => { setActiveYear('DP1'); setSelectedMonth(0); }} className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${activeYear === 'DP1' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500'}`}>YEAR 1: DP1</button>
            <button onClick={() => { setActiveYear('DP2'); setSelectedMonth(0); }} className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${activeYear === 'DP2' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500'}`}>YEAR 2: DP2</button>
          </div>
          <div className="inline-flex bg-purple-100 p-1 rounded-2xl sketch-border border-2 border-purple-200">
            <button onClick={() => { setActiveTrack('SL'); setSelectedMonth(0); }} className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTrack === 'SL' ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-indigo-400'}`}>STANDARD (SL)</button>
            <button onClick={() => { setActiveTrack('HL'); setSelectedMonth(0); }} className={`px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTrack === 'HL' ? 'bg-purple-800 text-white shadow-lg scale-105' : 'text-purple-400'}`}>HIGHER (HL)</button>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleEditMode} className={`flex items-center space-x-2 px-4 py-2 rounded-full font-black text-xs transition-all border-2 ${isEditing ? 'bg-green-600 text-white border-green-700 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {isEditing ? <><Save size={14}/><span>LOCK & SAVE</span></> : <>{isOwner ? <Unlock size={14} className={isActuallyAdmin ? "text-green-500" : "text-yellow-500"}/> : <Lock size={14} className="text-slate-400"/>}<span>{isOwner ? (isActuallyAdmin ? 'CLOUD SYNC ACTIVE' : 'LOCKED TO LOCAL') : 'OWNER ONLY'}</span></>}
            </button>
            {isOwner && (
              <><button onClick={resetToDefault} className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-full border border-slate-200 transition-colors" title="Reset"><RotateCcw size={16}/></button><button onClick={logoutOwner} className="px-3 py-1 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full text-[10px] font-black border border-red-100 transition-colors">{currentUser ? 'LOGOUT & SYNC OFF' : 'LOGOUT'}</button></>
            )}
          </div>
        </div>
      </div>

      <div className="relative pt-12 pb-24">
        <div className="max-w-4xl mx-auto relative px-10">
          <div className="h-2 bg-slate-200 rounded-full w-full absolute top-1/2 -translate-y-1/2 left-0 z-0 border border-slate-300"></div>
          <div className="relative z-10 flex justify-between">
            {currentPlan.map((plan, idx) => {
              const isAssess = isAssessmentMonth(plan);
              return (
                <button key={idx} onClick={() => setSelectedMonth(idx)} className={`relative flex flex-col items-center transition-all duration-300 group`}>
                  {/* Highlight Pulsing Ring for Assessments */}
                  {isAssess && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-400/30 border-2 border-orange-500/40 animate-pulse pointer-events-none" />
                  )}
                  
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                    selectedMonth === idx 
                      ? 'bg-slate-900 border-slate-900 scale-150 ring-4 ring-white shadow-lg' 
                      : isAssess ? 'bg-orange-500 border-slate-900 scale-125' : plan.isMilestone ? 'bg-yellow-400 border-slate-900 scale-125' : 'bg-white border-slate-300 group-hover:border-slate-500'
                  }`}>
                    {isAssess ? <ClipboardCheck size={12} className="text-white"/> : plan.isMilestone ? <Star size={12} fill="white" className="text-white"/> : <div className={`w-2 h-2 rounded-full ${selectedMonth === idx ? 'bg-white' : 'bg-slate-300'}`}></div>}
                  </div>
                  <span className={`mt-4 font-black text-[10px] uppercase tracking-tighter transition-colors ${selectedMonth === idx ? 'text-slate-900' : 'text-slate-400'}`}>
                    {plan.month.substring(0, 3)}
                  </span>
                  {(plan.isMilestone || isAssess) && <Flag className={`absolute -top-6 animate-bounce ${isAssess ? 'text-orange-600' : 'text-red-500'}`} size={14} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <div className="animate-in fade-in zoom-in-95 duration-500" key={`${activeYear}-${activeTrack}-${selectedMonth}`}>
            <HandwrittenCard bgColor="bg-white" className={`shadow-2xl border-4 overflow-hidden min-h-[400px] ${isAssessmentMonth(currentItem) ? 'border-orange-500 ring-4 ring-orange-100' : 'border-slate-900'}`}>
              {/* Ribbon Header logic to match UI look */}
              <div className={`absolute top-0 right-0 px-6 py-2 text-white rounded-bl-3xl font-black text-xl handwritten ${isAssessmentMonth(currentItem) ? 'bg-orange-600 animate-pulse' : 'bg-slate-900'}`}>
                <div className="flex items-center space-x-2">
                   {currentItem.month}
                   <div className="flex space-x-1 ml-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-6 pt-4">
                {isEditing ? (
                  <select value={currentItem.type} onChange={(e) => updateCurrentItem({ type: e.target.value as any })} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 outline-none ${getTypeColor(currentItem.type)}`}>
                    <option value="Topic A">Topic A</option>
                    <option value="Topic B">Topic B</option>
                    <option value="Topic B4">Topic B4 (HL)</option>
                    <option value="IA">IA</option>
                    <option value="Exam">Exam</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Topic Assessment">Topic Assessment</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 ${getTypeColor(currentItem.type)} shadow-sm`}>
                    {currentItem.type}
                  </span>
                )}
                
                {isAssessmentMonth(currentItem) && !isEditing && (
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center animate-bounce shadow-md">
                    <Zap size={10} className="mr-1" /> Action Required
                  </span>
                )}
              </div>

              {isEditing ? (
                <div className="mb-6"><input type="text" value={currentItem.topic} onChange={(e) => updateCurrentItem({ topic: e.target.value })} className="w-full text-3xl font-black text-slate-900 bg-slate-50 border-b-4 border-slate-900 p-2 focus:outline-none focus:bg-white" placeholder="Enter month topic..."/></div>
              ) : (
                <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center handwritten">
                  {isAssessmentMonth(currentItem) ? <ClipboardCheck className="mr-3 text-orange-600" size={36}/> : currentItem.type === 'Exam' ? <Calendar className="mr-3 text-red-500" size={36}/> : <BookOpen className="mr-3 text-indigo-600" size={36}/>}
                  {currentItem.topic}
                </h2>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Key Objectives:</h4>
                  {isEditing && (
                    <button onClick={handleAddDetail} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 flex items-center bg-indigo-50 px-2 py-0.5 rounded"><Plus size={12} className="mr-1"/> ADD SUB-TOPIC</button>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {currentItem.details.map((detail, dIdx) => {
                    const isSubAssess = detail.toLowerCase().includes('assessment');
                    return (
                      <li key={dIdx} className={`group flex items-start text-sm kalam font-bold transition-all p-1 rounded-lg ${isSubAssess ? 'bg-orange-50 text-orange-900' : 'text-slate-700'}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 mt-0.5 shrink-0 border ${isSubAssess ? 'bg-orange-500 border-orange-600 text-white' : 'bg-slate-100 border-slate-200'}`}>
                          <span className="text-[8px]">{dIdx + 1}</span>
                        </div>
                        {isEditing ? (
                          <div className="flex-1 flex items-center space-x-2"><input type="text" value={detail} onChange={(e) => handleUpdateDetail(dIdx, e.target.value)} className="flex-1 bg-transparent border-b border-slate-200 p-1 focus:outline-none focus:border-slate-900"/><button onClick={() => handleRemoveDetail(dIdx)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14}/></button></div>
                        ) : (
                          <span className="flex-1">{detail} {isSubAssess && '🔥'}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-auto pt-12 flex justify-between items-end border-t border-dashed border-slate-200">
                 <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pb-6">Planner Ref: IBDP-CS-2027-{activeTrack}-V1</div>
                 <div className="bg-yellow-50 p-3 sketch-border -rotate-1 group cursor-pointer mb-6 hover:rotate-0 transition-transform">
                    <p className="text-[10px] kalam font-black text-slate-600 flex items-center"><MessageSquareText size={12} className="mr-1 text-slate-400 group-hover:animate-bounce"/> Speak to Ms Arora</p>
                 </div>
              </div>
            </HandwrittenCard>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <HandwrittenCard title="Track Overview" bgColor="bg-blue-50" className="border-blue-200">
           <div className="space-y-4">
              <p className="kalam text-sm leading-relaxed">{activeTrack === 'SL' ? "Standard Level (SL) focus: Establishing core programming logic and mastering Theme A foundations." : "Higher Level (HL) focus: Extending the core with recursion, abstract data types, and advanced architectural design patterns."}</p>
              <div className="grid grid-cols-2 gap-4">
                <MiniSummary icon={Code} title="Track" desc={activeTrack === 'SL' ? "Core Core" : "Core + Depth"} color="text-blue-600" />
                <MiniSummary icon={Database} title="Databases" desc={activeTrack === 'SL' ? "Relational Basics" : "ACID & SQL Aggs"} color="text-pink-600" />
                <MiniSummary icon={Search} title="IA" desc={activeTrack === 'SL' ? "Solution Focus" : "Complexity Focus"} color="text-indigo-600" />
                <MiniSummary icon={Flag} title="Assessment" desc={activeTrack === 'SL' ? "70% Weight" : "80% Weight"} color="text-yellow-600" />
              </div>
           </div>
        </HandwrittenCard>

        <HandwrittenCard title="Yearly Goals" bgColor="bg-emerald-50" className="border-emerald-200">
           <div className="space-y-4">
              <p className="kalam text-sm leading-relaxed">{activeYear === 'DP1' ? "Foundation Year: Focus on building a strong coding portfolio and understanding relational modeling." : "Final Year: Perfecting the IA solution and mastering the case study scenario for Paper 1."}</p>
              <div className="grid grid-cols-2 gap-4">
                <MiniSummary icon={Network} title="Topic" desc={activeYear === 'DP1' ? "Intro B1/B2" : "Theory A1/A2/A4"} color="text-emerald-600" />
                <MiniSummary icon={BrainCircuit} title="Logic" desc={activeYear === 'DP1' ? "Computational thinking" : "Machine learning"} color="text-purple-600" />
                <MiniSummary icon={Trophy} title="IA Stage" desc={activeYear === 'DP1' ? "Planning (A/B)" : "Solution (C/D/E)"} color="text-indigo-600" />
                <MiniSummary icon={Star} title="Target" desc={activeYear === 'DP1' ? "Foundation" : "Exams April 2027"} color="text-red-600" />
              </div>
           </div>
        </HandwrittenCard>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl sketch-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
         <div className="flex-1 space-y-2 mb-6 md:mb-0">
            <h4 className="text-xl font-black handwritten text-yellow-400">Personalize Your {activeTrack} Track</h4>
            <p className="text-sm kalam text-slate-400 italic">Adjust this timeline with Ms Arora. Highlights assessments automatically.</p>
         </div>
         <div className="flex items-center space-x-4">
            <button onClick={toggleEditMode} className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-black text-xs hover:bg-yellow-300 transition-all shadow-lg flex items-center active:scale-95">
              {isEditing ? <><Save size={14} className="mr-2"/> FINISH EDITING</> : <><Lock size={14} className="mr-2"/> CUSTOMIZE NOW</>}
            </button>
         </div>
      </div>
    </div>
  );
};

const MiniSummary = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white p-3 sketch-border shadow-sm flex items-center space-x-3">
    <div className={color}><Icon size={18}/></div>
    <div>
      <h5 className="font-black text-[10px] leading-none">{title}</h5>
      <p className="text-[9px] text-slate-400 font-bold">{desc}</p>
    </div>
  </div>
);

const Trophy = ({size, className}: {size: number, className: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

export default TimelineSection;
