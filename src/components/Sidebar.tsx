
import React from 'react';
import { Section } from '../types';
import { 
  BookOpen, Database, Zap, Code, Search, ShieldCheck, 
  PenTool, Terminal, GraduationCap, Map, LayoutDashboard, 
  Award, Briefcase, ChevronRight, CalendarDays, Brain,
  Box, Eye, Scissors, GitBranch, PenBox, Construction,
  Braces, List, Activity, Repeat, FileCode, FlaskConical,
  Layers, Shapes, Fingerprint, Network, Cpu, Binary,
  ShieldAlert, Settings, Info, Scale
} from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const courseItems = [
    { id: Section.ROADMAP, label: 'Course Roadmap', icon: Map },
    { id: Section.TIMELINE, label: 'Curriculum Timeline', icon: CalendarDays },
    { id: Section.EXAMS, label: 'Exam Weightings', icon: Award },
    { id: Section.IA_GUIDE, label: 'IA Navigator', icon: Briefcase },
  ];

  const topicA1Items = [
    { id: Section.A1_HARDWARE, label: 'A1.1 Hardware Core', icon: Cpu },
    { id: Section.A1_OS, label: 'A1.3 OS & Scheduling', icon: Settings },
  ];

  const topicA2Items = [
    { id: Section.A2_BASICS, label: 'A2.1-2 Networking', icon: Network },
    { id: Section.A2_SECURITY, label: 'A2.3 Security Protocols', icon: ShieldCheck },
  ];

  const topicA4Items = [
    { id: Section.A4_ML_TYPES, label: 'A4.1 ML Types', icon: Binary },
    { id: Section.A4_NEURAL_NETS, label: 'A4.2 Neural Nets', icon: Brain, isHL: true },
    { id: Section.A4_ETHICS, label: 'A4.3 ML Ethics', icon: Scale },
  ];

  const topicB1Items = [
    { id: Section.B1_SPEC, label: 'B1.1.1: Spec Lab', icon: Box },
    { id: Section.B1_CONCEPTS, label: 'B1.1.2: Concepts', icon: Brain },
    { id: Section.B1_APPS, label: 'B1.1.3: Applications', icon: Zap },
    { id: Section.B1_FLOWCHARTS, label: 'B1.1.4: Flowcharts', icon: GitBranch },
    { id: Section.B1_FLOWCHART_LAB, label: 'B1 construction lab', icon: Construction },
    { id: Section.B1_PRACTICE, label: 'B1 Practice & MS', icon: PenBox },
  ];

  const topicB2Items = [
    { id: Section.B2_BASICS, label: 'B2.1 Fundamentals', icon: Braces },
    { id: Section.B2_STRUCTURES, label: 'B2.2 Data Structures', icon: List },
    { id: Section.B2_ALGORITHMS, label: 'B2.4 Logic & Big O', icon: Activity },
    { id: Section.B2_RECURSION, label: 'B2.4.4 Recursion', icon: Repeat, isHL: true },
    { id: Section.B2_FILES_EXCEPTIONS, label: 'B2.5 Files & Errors', icon: FileCode },
    { id: Section.B2_PYTHON_LAB, label: 'Python Mission Lab', icon: FlaskConical },
    { id: Section.B2_PRACTICE, label: 'B2 Logic Review', icon: PenTool },
  ];

  const topicB3Items = [
    { id: Section.B3_CONCEPTS, label: 'B3.1 OOP Pillars', icon: Layers },
    { id: Section.B3_CLASS_DESIGN, label: 'B3.2 Classes & self', icon: Shapes },
    { id: Section.B3_INHERITANCE, label: 'B3.2.4 Inheritance', icon: GitBranch },
    { id: Section.B3_HL_ADVANCED, label: 'B3.3 Adv. OOP', icon: ShieldCheck, isHL: true },
    { id: Section.B3_TRACE_LAB, label: 'Object Trace Lab', icon: Activity },
    { id: Section.B3_PRACTICE, label: 'OOP Review & MS', icon: PenTool },
  ];

  const topicB4Items = [
    { id: Section.B4_HL_ADT, label: 'B4 HL ADTs', icon: Binary, isHL: true },
  ];

  const topicA3Items = [
    { id: Section.A3_HOME, label: 'A3.1 Fundamentals', icon: BookOpen },
    { id: Section.A3_SCHEMAS, label: 'A3.2 Design & ERDs', icon: Database },
    { id: Section.A3_NORMALIZATION, label: 'A3.2.5 Normalization', icon: Zap },
    { id: Section.A3_SQL_BASICS, label: 'A3.3 SQL Basics', icon: Code },
    { id: Section.A3_SQL_QUERIES, label: 'A3.3.2 Queries & Aggs', icon: Search, isHL: true },
    { id: Section.A3_SQL_LAB, label: 'SQL Mission Workshop', icon: GraduationCap },
    { id: Section.A3_PLAYGROUND, label: 'SQL Sandbox', icon: Terminal },
    { id: Section.A3_ACID_VIEWS, label: 'ACID & Views', icon: ShieldCheck, isHL: true },
    { id: Section.PRACTICE, label: 'A3 Practice Lab', icon: PenTool },
  ];

  const renderLink = (item: any) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => setActiveSection(item.id)}
        className={`w-full flex items-center justify-between p-2 rounded-xl transition-all duration-200 border-2 ${
          activeSection === item.id 
          ? 'bg-slate-900 text-white border-slate-900 shadow-md transform translate-x-1' 
          : 'bg-white text-slate-600 border-transparent hover:border-slate-200 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={16} />
          <span className="font-bold text-[11px] text-left">{item.label}</span>
        </div>
        {item.isHL && (
          <span className="bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded leading-none">HL</span>
        )}
      </button>
    );
  };

  return (
    <nav className="w-72 bg-white border-r-4 border-slate-900 h-screen sticky top-0 flex flex-col p-4 shadow-2xl hidden md:flex overflow-hidden">
      <div className="mb-6 p-4 bg-yellow-100 sketch-border group relative cursor-pointer" onClick={() => setActiveSection(Section.ROADMAP)}>
        <h1 className="text-xl font-bold handwritten leading-tight">IBDP CS<br/>Guide 2027</h1>
        <div className="absolute top-2 right-2 text-slate-400 group-hover:text-slate-900 transition-colors">
          <LayoutDashboard size={16}/>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {/* Course Overview Section */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Global Tools
          </h3>
          <div className="space-y-1">
            {courseItems.map(renderLink)}
          </div>
        </div>

        {/* Topic A1: Fundamentals */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Topic A1: Fundamentals
          </h3>
          <div className="space-y-1">
            {topicA1Items.map(renderLink)}
          </div>
        </div>

        {/* Topic A2: Networks */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Topic A2: Networks
          </h3>
          <div className="space-y-1">
            {topicA2Items.map(renderLink)}
          </div>
        </div>

        {/* Topic A3: Databases */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-pink-500 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Topic A3: Databases
          </h3>
          <div className="space-y-1">
            {topicA3Items.map(renderLink)}
          </div>
        </div>

        {/* Topic A4: ML */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Topic A4: ML (New)
          </h3>
          <div className="space-y-1">
            {topicA4Items.map(renderLink)}
          </div>
        </div>

        <div className="border-t border-slate-100 my-4" />

        {/* Theme B Groups (Programming/Logic) */}
        <div>
          <h3 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-3 flex items-center">
            <ChevronRight size={10} className="mr-1"/> Theme B: Problem Solving
          </h3>
          <div className="space-y-8">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-300 uppercase ml-2 mb-1">B1: Thinking</p>
              {topicB1Items.map(renderLink)}
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-300 uppercase ml-2 mb-1">B2: Programming</p>
              {topicB2Items.map(renderLink)}
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-300 uppercase ml-2 mb-1">B3: OOP Core</p>
              {topicB3Items.map(renderLink)}
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-300 uppercase ml-2 mb-1">B4: HL ADTs</p>
              {topicB4Items.map(renderLink)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 text-[10px] italic text-slate-400 font-mono space-y-1 border-t border-slate-50">
        <div className="text-slate-600 font-bold uppercase tracking-tight">© Pooja Arora</div>
        <div className="text-slate-400">Computing Teacher</div>
      </div>
    </nav>
  );
};

export default Sidebar;
