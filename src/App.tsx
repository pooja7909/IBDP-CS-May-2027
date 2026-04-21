
import React, { useState } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import CourseOverview from './sections/CourseOverview';
import ExamDetails from './sections/ExamDetails';
import InternalAssessment from './sections/InternalAssessment';
import TimelineSection from './sections/TimelineSection';
import IntroSection from './sections/IntroSection';
import SchemaSection from './sections/SchemaSection';
import NormalizationSection from './sections/NormalizationSection';
import SqlBasicsSection from './sections/SqlBasicsSection';
import SqlQuerySection from './sections/SqlQuerySection';
import SqlPlaygroundSection from './sections/SqlPlaygroundSection';
import SqlLabSection from './sections/SqlLabSection';
import AcidViewsSection from './sections/AcidViewsSection';
import PracticeSection from './sections/PracticeSection';
import B1SpecSection from './sections/B1SpecSection';
import B1ConceptsSection from './sections/B1ConceptsSection';
import B1AppsSection from './sections/B1AppsSection';
import B1FlowchartsSection from './sections/B1FlowchartsSection';
import B1FlowchartLabSection from './sections/B1FlowchartLabSection';
import B1PracticeSection from './sections/B1PracticeSection';
import B2BasicsSection from './sections/B2BasicsSection';
import B2StructuresSection from './sections/B2StructuresSection';
import B2AlgorithmsSection from './sections/B2AlgorithmsSection';
import B2RecursionSection from './sections/B2RecursionSection';
import B2FilesExceptionsSection from './sections/B2FilesExceptionsSection';
import B2PythonLabSection from './sections/B2PythonLabSection';
import B2PracticeSection from './sections/B2PracticeSection';
import B3ConceptsSection from './sections/B3ConceptsSection';
import B3ClassDesignSection from './sections/B3ClassDesignSection';
import B3InheritanceSection from './sections/B3InheritanceSection';
import B3AdvancedSection from './sections/B3AdvancedSection';
import B3TraceLabSection from './sections/B3TraceLabSection';
import B3PracticeSection from './sections/B3PracticeSection';
import B4ADTSection from './sections/B4ADTSection';

// New Topic A sections
import A1HardwareSection from './sections/A1HardwareSection';
import A2NetworksSection from './sections/A2NetworksSection';
import A4MLSection from './sections/A4MLSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.ROADMAP);

  const renderSection = () => {
    switch (activeSection) {
      // Hub & Specs
      case Section.ROADMAP: return <CourseOverview onNavigate={setActiveSection} />;
      case Section.TIMELINE: return <TimelineSection />;
      case Section.EXAMS: return <ExamDetails />;
      case Section.IA_GUIDE: return <InternalAssessment />;
      
      // Topic A1: Computer Fundamentals
      case Section.A1_HARDWARE: return <A1HardwareSection />;
      case Section.A1_OS: return <A1HardwareSection />; // Shares component but internal tabs
      
      // Topic A2: Networks
      case Section.A2_BASICS: return <A2NetworksSection />;
      case Section.A2_SECURITY: return <A2NetworksSection />;

      // Topic A3: Databases
      case Section.A3_HOME: return <IntroSection />;
      case Section.A3_SCHEMAS: return <SchemaSection />;
      case Section.A3_NORMALIZATION: return <NormalizationSection />;
      case Section.A3_SQL_BASICS: return <SqlBasicsSection />;
      case Section.A3_SQL_QUERIES: return <SqlQuerySection />;
      case Section.A3_SQL_LAB: return <SqlLabSection />;
      case Section.A3_PLAYGROUND: return <SqlPlaygroundSection />;
      case Section.A3_ACID_VIEWS: return <AcidViewsSection />;

      // Topic A4: ML
      case Section.A4_ML_TYPES: return <A4MLSection />;
      case Section.A4_NEURAL_NETS: return <A4MLSection />;
      case Section.A4_ETHICS: return <A4MLSection />;

      // Topic B1: Computational Thinking
      case Section.B1_SPEC: return <B1SpecSection />;
      case Section.B1_CONCEPTS: return <B1ConceptsSection />;
      case Section.B1_APPS: return <B1AppsSection />;
      case Section.B1_FLOWCHARTS: return <B1FlowchartsSection />;
      case Section.B1_FLOWCHART_LAB: return <B1FlowchartLabSection />;
      case Section.B1_PRACTICE: return <B1PracticeSection />;

      // Topic B2: Programming
      case Section.B2_BASICS: return <B2BasicsSection />;
      case Section.B2_STRUCTURES: return <B2StructuresSection />;
      case Section.B2_ALGORITHMS: return <B2AlgorithmsSection />;
      case Section.B2_RECURSION: return <B2RecursionSection />;
      case Section.B2_FILES_EXCEPTIONS: return <B2FilesExceptionsSection />;
      case Section.B2_PYTHON_LAB: return <B2PythonLabSection />;
      case Section.B2_PRACTICE: return <B2PracticeSection />;

      // Topic B3: OOP
      case Section.B3_CONCEPTS: return <B3ConceptsSection />;
      case Section.B3_CLASS_DESIGN: return <B3ClassDesignSection />;
      case Section.B3_INHERITANCE: return <B3InheritanceSection />;
      case Section.B3_HL_ADVANCED: return <B3AdvancedSection />;
      case Section.B3_TRACE_LAB: return <B3TraceLabSection />;
      case Section.B3_PRACTICE: return <B3PracticeSection />;

      // Topic B4: ADTs (NEW)
      case Section.B4_HL_ADT: return <B4ADTSection />;
      
      // Review
      case Section.PRACTICE: return <PracticeSection />;
      default: return <CourseOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans text-slate-800">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 transition-all">
        <div className="max-w-6xl mx-auto space-y-12">
          {renderSection()}
          
          <footer className="mt-20 pt-8 border-t border-slate-200 text-center pb-12">
            <p className="text-slate-400 text-sm font-medium">
              © 2025 <span className="font-bold text-slate-600">Pooja Arora</span> - Computing Teacher
            </p>
            <p className="text-[10px] font-mono text-slate-300 mt-1 uppercase tracking-widest">
              IBDP Computer Science New Curriculum Specialist (2027 Assessment)
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
