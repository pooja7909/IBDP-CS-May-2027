import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Database, Binary, Lock, Cpu, Search, Sparkles, Layout, 
  Scissors, Eye, Terminal, ChevronRight, Layers, 
  ArrowRight, Info, BookOpen, BarChart3, LineChart, ShieldCheck,
  Workflow, Network, Zap
} from 'lucide-react';

const B1AppsSection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState(0);

  const domains = [
    {
      title: "Software Development",
      icon: Cpu,
      color: "text-blue-600",
      bg: "bg-blue-50",
      summary: "Designing and coding robust applications for various platforms.",
      syllabusLinks: ["B2 (Programming)", "B3 (OOP)", "Internal Assessment"],
      pillars: [
        { name: "Decomposition", icon: Scissors, detail: "Breaking a massive app into individual modules, classes, and functions that can be tested separately." },
        { name: "Abstraction", icon: Eye, detail: "Using high-level languages (Python/Java) to write logic without worrying about CPU registers or memory addresses." },
        { name: "Pattern Recognition", icon: Search, detail: "Using Design Patterns (like MVC or Observers) to solve common coding architecture problems efficiently." },
        { name: "Algorithmic Thinking", icon: Terminal, detail: "Defining the exact logical steps (loops, if-statements) needed to process user input into a result." }
      ]
    },
    {
      title: "Data Analysis",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      summary: "Extracting meaningful insights from complex, often messy datasets.",
      syllabusLinks: ["Big Data", "Probability & Stats", "A3 (Databases)"],
      pillars: [
        { name: "Decomposition", icon: Scissors, detail: "Breaking a large research question into smaller sub-questions that can be answered by specific variables." },
        { name: "Abstraction", icon: Eye, detail: "Focusing on statistical trends (means, standard deviation) while ignoring individual outliers and 'noise'." },
        { name: "Pattern Recognition", icon: Search, detail: "Identifying correlations, seasonal trends, or clusters within a scatter plot or time-series graph." },
        { name: "Algorithmic Thinking", icon: Terminal, detail: "Designing the data-cleaning pipeline (Filter -> Sort -> Transform) to prepare raw data for visualization." }
      ]
    },
    {
      title: "Machine Learning",
      icon: Binary,
      color: "text-purple-600",
      bg: "bg-purple-50",
      summary: "Teaching computers to predict and classify using training data.",
      syllabusLinks: ["Topic A4 (ML)", "Ethics in AI", "Neural Networks"],
      pillars: [
        { name: "Decomposition", icon: Scissors, detail: "Dividing the AI pipeline into distinct phases: Data Collection, Pre-processing, Training, and Evaluation." },
        { name: "Abstraction", icon: Eye, detail: "Feature Selection—deciding that 'Pixel Color' is essential for image recognition, but 'File Created Date' is irrelevant." },
        { name: "Pattern Recognition", icon: Search, detail: "The core of ML! Finding hidden mathematical patterns in historical data to predict future outcomes." },
        { name: "Algorithmic Thinking", icon: Terminal, detail: "Defining the training algorithm (e.g., Gradient Descent) that the model follows to reduce its error rate." }
      ]
    },
    {
      title: "Database Design",
      icon: Database,
      color: "text-pink-600",
      bg: "bg-pink-50",
      summary: "Structuring storage systems to ensure data integrity and speed.",
      syllabusLinks: ["Topic A3 (Databases)", "Normalization", "SQL"],
      pillars: [
        { name: "Decomposition", icon: Scissors, detail: "Splitting one giant unnormalized 'Flat File' into multiple related tables using the rules of Normalization." },
        { name: "Abstraction", icon: Eye, detail: "Using ERDs (Entity Relationship Diagrams) to show logical relationships without caring about physical disk storage." },
        { name: "Pattern Recognition", icon: Search, detail: "Recognizing repeating data patterns that indicate a need for a Link Table (Many-to-Many resolution)." },
        { name: "Algorithmic Thinking", icon: Terminal, detail: "Query Optimization—writing SQL that finds the most efficient 'path' to join data across thousands of records." }
      ]
    },
    {
      title: "Network Security",
      icon: Lock,
      color: "text-red-600",
      bg: "bg-red-50",
      summary: "Protecting digital infrastructure from unauthorized access and attacks.",
      syllabusLinks: ["Topic A2 (Networks)", "Protocols", "Cyber Ethics"],
      pillars: [
        { name: "Decomposition", icon: Scissors, detail: "Network Segmentation—breaking a huge corporate network into smaller 'Subnets' to contain potential breaches." },
        { name: "Abstraction", icon: Eye, detail: "The OSI Model—treating networking as layers (Transport, Network, Link), allowing apps to communicate regardless of hardware." },
        { name: "Pattern Recognition", icon: Search, detail: "Intrusion Detection—recognizing the specific digital 'fingerprint' or behavior of a known malware attack." },
        { name: "Algorithmic Thinking", icon: Terminal, detail: "Designing the mathematical steps of an Encryption Algorithm (like RSA) to scramble and descramble data." }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="text-center relative py-8">
        <div className="tape"></div>
        <h1 className="text-5xl font-black handwritten text-slate-900 mb-2">B1.1.3 CT Applications</h1>
        <p className="text-xl kalam text-slate-600 italic">"The Four Pillars in Action Across the Tech Industry"</p>
      </div>

      <div className="bg-white sketch-border shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[700px]">
          {/* Domain Sidebar */}
          <div className="w-full md:w-80 bg-slate-900 text-white p-6 space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6">Select Domain</h4>
            {domains.map((domain, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDomain(idx)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${activeDomain === idx ? 'bg-indigo-600 shadow-lg scale-105' : 'hover:bg-slate-800 opacity-60'}`}
              >
                <div className="flex items-center space-x-3">
                  <domain.icon size={20} className={activeDomain === idx ? 'text-white' : 'text-slate-500'} />
                  <span className="font-black text-xs handwritten">{domain.title}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform ${activeDomain === idx ? 'translate-x-1' : ''}`} />
              </button>
            ))}
            
            <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] kalam text-slate-400 italic">
              <Info size={14} className="mb-1 text-slate-500" />
              "In IBDP CS exams, you are often asked to explain how CT principles apply to these specific domains. Always link to specific syllabus topics!"
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col" key={activeDomain}>
              <div className="mb-10">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 ${domains[activeDomain].color} ${domains[activeDomain].bg}`}>
                  <Sparkles size={12} />
                  <span>Topic B1.1.3 Focus</span>
                </div>
                <h2 className="text-5xl font-black handwritten text-slate-900 mb-4">{domains[activeDomain].title}</h2>
                <p className="kalam text-lg text-slate-600 italic">"{domains[activeDomain].summary}"</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {domains[activeDomain].syllabusLinks.map((link, lIdx) => (
                    <span key={lIdx} className="text-[9px] font-black uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                      Link: {link}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 flex-grow">
                {domains[activeDomain].pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="p-6 bg-slate-50 border-2 border-slate-200 sketch-border flex flex-col group hover:bg-white hover:border-indigo-300 hover:shadow-xl transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <pillar.icon size={18} />
                      </div>
                      <h5 className="font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-indigo-600">{pillar.name}</h5>
                    </div>
                    <p className="text-sm kalam leading-relaxed text-slate-700 font-bold">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-400 rounded-xl shadow-sm rotate-3">
                    <BookOpen size={18} className="text-yellow-900" />
                  </div>
                  <p className="text-xs kalam font-black text-yellow-900">
                    Syllabus Concept: Why do we use CT in {domains[activeDomain].title}? To reduce complexity and ensure scalable solutions.
                  </p>
                </div>
                <ArrowRight className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <HandwrittenCard title="Concept Connections: Deep Dive" bgColor="bg-white" className="border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)]">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h4 className="text-2xl font-black handwritten text-slate-900 flex items-center">
                <Workflow className="mr-2 text-indigo-600" /> Connecting the Dots
             </h4>
             <p className="kalam text-sm font-bold leading-relaxed italic">"Computational Thinking isn't an isolated topic; it's the foundation for everything else in the IBDP CS course."</p>
             <div className="space-y-3">
               <ConnectionRow 
                  topic="Network Security & Abstraction" 
                  desc="We abstract the hardware to focus on logic at the Application layer." 
               />
               <ConnectionRow 
                  topic="Database Design & Decomposition" 
                  desc="Normalizing tables is the ultimate act of data decomposition." 
               />
               <ConnectionRow 
                  topic="Software Dev & Patterns" 
                  desc="Object-Oriented Programming (OOP) relies heavily on recognizing code patterns." 
               />
             </div>
          </div>
          <div className="bg-indigo-50 p-8 rounded-3xl flex flex-col items-center justify-center border-2 border-indigo-200 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse" />
             <ShieldCheck size={48} className="text-indigo-600 mb-4" />
             <h5 className="font-black text-xl handwritten text-indigo-900 mb-2">The CT Exam Shield</h5>
             <p className="text-sm kalam text-indigo-700 italic font-bold">
               "If you're stuck on an exam question about design, start with CT pillars. They provide the logical framework for any computational answer."
             </p>
             <div className="mt-4 flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
             </div>
          </div>
        </div>
      </HandwrittenCard>
    </div>
  );
};

const ConnectionRow = ({ topic, desc }: { topic: string, desc: string }) => (
  <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition-colors group">
    <div className="mt-1 p-1 bg-white rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-colors">
      <Zap size={14} />
    </div>
    <div>
      <h6 className="text-[10px] font-black uppercase text-slate-900 mb-1">{topic}</h6>
      <p className="text-[10px] kalam text-slate-500 font-bold leading-tight">{desc}</p>
    </div>
  </div>
);

export default B1AppsSection;