
import React, { useState } from 'react';
import HandwrittenCard from '../components/HandwrittenCard';
import { 
  Binary, Brain, Scale, Target, Search, Info, 
  ArrowRight, ShieldAlert, Cpu, Database, Network,
  Zap, AlertCircle, CheckCircle2, MessageSquareText,
  Activity, Repeat, Layers, LineChart, PieChart,
  Eye, Wand2, FlaskConical, UserCheck
} from 'lucide-react';

const A4MLSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'logic' | 'ethics'>('types');

  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-8 pb-32">
      <div className="text-center relative py-12">
        <div className="tape"></div>
        <h1 className="text-6xl font-black handwritten text-slate-900 mb-4 tracking-tight">A4 Machine Learning</h1>
        <p className="text-2xl kalam text-slate-600 italic">"Teaching Logic Without Rules"</p>
        
        <div className="flex justify-center mt-10 space-x-4">
           <button onClick={() => setActiveTab('types')} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'types' ? 'bg-purple-600 text-white border-purple-900 shadow-xl scale-105' : 'bg-white text-slate-500 border-slate-200'}`}>A4.1 Learning Types</button>
           <button onClick={() => setActiveTab('logic')} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'logic' ? 'bg-indigo-600 text-white border-indigo-900 shadow-xl scale-105' : 'bg-white text-slate-50 border-slate-200'}`}>A4.2 Neural Nets</button>
           <button onClick={() => setActiveTab('ethics')} className={`px-8 py-3 rounded-full font-black text-sm transition-all border-4 ${activeTab === 'ethics' ? 'bg-rose-600 text-white border-rose-900 shadow-xl scale-105' : 'bg-white text-slate-50 border-slate-200'}`}>A4.3 ML Ethics</button>
        </div>
      </div>

      <div className="animate-in fade-in zoom-in-95 duration-500" key={activeTab}>
        {activeTab === 'types' && <LearningTypesContent />}
        {activeTab === 'logic' && <NeuralNetsContent />}
        {activeTab === 'ethics' && <EthicsContent />}
      </div>
    </div>
  );
};

const LearningTypesContent = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Binary /></div>
      <h2 className="text-4xl font-black handwritten text-slate-900">A4.1 Paradigms of AI Training</h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
       <LearningCard 
          title="Supervised" 
          icon={UserCheck} 
          desc="The model is trained on labeled data (Teacher-led). Input includes the 'correct' answer." 
          example="Image detection (e.g. This is a cat)." 
          color="purple" 
       />
       <LearningCard 
          title="Unsupervised" 
          icon={Search} 
          desc="The model finds hidden patterns in unlabeled data. It groups similar items together." 
          example="Customer segmentation (Clustering)." 
          color="indigo" 
       />
       <LearningCard 
          title="Reinforcement" 
          icon={Target} 
          desc="Learning via Trial & Error. Rewards for good moves, penalties for bad ones." 
          example="Self-driving cars or Game AI." 
          color="emerald" 
       />
    </div>

    <HandwrittenCard title="Annotated: The Training Pipeline" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl relative overflow-hidden">
       <div className="flex flex-col md:flex-row items-center justify-around py-10 space-y-12 md:space-y-0">
          <PipelineNode title="Data Collection" icon={Database} desc="Raw, messy records." color="text-slate-400" />
          <ArrowRight className="text-slate-300 hidden md:block" size={32} />
          <PipelineNode title="Pre-processing" icon={FlaskConical} desc="Cleaning & Labeling." color="text-purple-600" />
          <ArrowRight className="text-slate-300 hidden md:block" size={32} />
          <PipelineNode title="Training" icon={Brain} desc="Learning weights." color="text-indigo-600" animate />
          <ArrowRight className="text-slate-300 hidden md:block" size={32} />
          <PipelineNode title="Inference" icon={Zap} desc="Real-world prediction." color="text-emerald-500" />
       </div>
       <div className="p-4 bg-purple-50 rounded-2xl border-2 border-dashed border-purple-200 mt-8">
          <p className="text-[11px] kalam font-bold text-slate-500 italic text-center">
             "Notice: Overfitting happens when the model learns the training data <b>TOO well</b>, including the noise. It then fails on new, unseen data!"
          </p>
       </div>
    </HandwrittenCard>
  </div>
);

const NeuralNetsContent = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Brain /></div>
      <h2 className="text-4xl font-black handwritten text-slate-900">A4.2 Artificial Neural Networks (ANN)</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-10">
       <HandwrittenCard title="Model Architecture" bgColor="bg-white" className="border-4 border-slate-900 shadow-2xl">
          <div className="flex flex-col items-center space-y-12 py-10">
             <div className="flex space-x-8">
                <Neuron label="Input Layer" count={3} color="bg-slate-900" />
                <div className="flex flex-col justify-center"><Network className="text-slate-200" /></div>
                <Neuron label="Hidden Layer" count={4} color="bg-indigo-500" active />
                <div className="flex flex-col justify-center"><Network className="text-slate-200" /></div>
                <Neuron label="Output Layer" count={2} color="bg-emerald-500" />
             </div>
             <p className="text-xs kalam font-bold text-slate-500 italic text-center max-w-sm">
               "Each circle is a <b>Perceptron</b>. The lines have <b>Weights</b>. Learning is the process of adjusting these weights to reduce error."
             </p>
          </div>
       </HandwrittenCard>

       <div className="space-y-6">
          <div className="p-8 bg-slate-900 text-white rounded-[3rem] sketch-border shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Activity size={120}/></div>
             <h4 className="text-2xl font-black handwritten text-yellow-400 mb-6 flex items-center"><Zap className="mr-2" size={24}/> The Deep Learning Logic</h4>
             <div className="space-y-4">
                <LogicStep title="Forward Propagation" desc="Data moves from input to output. The final prediction is compared to the true result." />
                <LogicStep title="Loss Function" desc="Calculates the 'Distance' between predicted and true value (The Error)." />
                <LogicStep title="Backpropagation" desc="The error signal is sent backwards to tweak weights using Gradient Descent." />
             </div>
          </div>
          <HandwrittenCard title="Exam Definition: ANN" bgColor="bg-indigo-50">
             <p className="text-[11px] kalam font-bold text-indigo-900 italic leading-relaxed">
               "An Artificial Neural Network is a computational model inspired by the human brain's biological neurons. It uses interconnected layers of processing nodes to identify complex non-linear relationships in data."
             </p>
          </HandwrittenCard>
       </div>
    </div>
  </div>
);

const EthicsContent = () => (
  <div className="space-y-12">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-xl border-2 border-slate-900"><Scale /></div>
      <h2 className="text-4xl font-black handwritten text-slate-900">A4.3 Ethical Machine Learning</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-10">
       <HandwrittenCard title="The Bias Problem" bgColor="bg-white" className="border-4 border-rose-900 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><ShieldAlert size={200} /></div>
          <p className="kalam text-lg font-bold text-slate-800 mb-8 leading-tight">
            "AI is not neutral. If the training data is biased, the model will be biased. We call this <b>Algorithmic Discrimination</b>."
          </p>
          <div className="space-y-6">
             <div className="p-5 bg-rose-50 border-l-8 border-rose-500 rounded-r-xl">
                <h6 className="font-black text-xs text-rose-900 uppercase mb-2">Sources of Bias:</h6>
                <ul className="text-[11px] kalam font-bold text-slate-600 space-y-2">
                   <li>• <b>Sampling Bias:</b> Training data doesn't represent the whole population.</li>
                   <li>• <b>Historical Bias:</b> Data reflects existing social prejudices.</li>
                   <li>• <b>Labeling Bias:</b> Humans make errors while tagging the training set.</li>
                </ul>
             </div>
          </div>
       </HandwrittenCard>

       <div className="space-y-6">
          <div className="p-8 bg-slate-900 text-white rounded-[3rem] sketch-border shadow-2xl relative">
             <h4 className="text-2xl font-black handwritten text-emerald-400 mb-6 flex items-center uppercase tracking-tighter">The AI Ethics Checklist</h4>
             <ul className="space-y-4">
                <EthicsItem title="Transparency" desc="Can the model explain its decision? (The Black Box Problem)." />
                <EthicsItem title="Accountability" desc="Who is responsible when an AI makes a fatal error?" />
                <EthicsItem title="Privacy" desc="Was the training data collected with informed consent?" />
                <EthicsItem title="Fairness" desc="Are the outcomes equitable across different social groups?" />
             </ul>
          </div>
          
          <div className="bg-yellow-400 p-6 rounded-[2rem] sketch-border shadow-lg rotate-1">
             <h5 className="font-black text-xs text-slate-900 uppercase flex items-center mb-2"><AlertCircle size={14} className="mr-2"/> Teacher's Exam Warning</h5>
             <p className="text-[10px] kalam font-bold text-slate-800 leading-tight">
                "In Paper 1 Section A, expect questions about the <b>social impact</b> of ML. Don't just focus on the tech—discuss the human consequence!"
             </p>
          </div>
       </div>
    </div>
  </div>
);

// Internal UI Components
const LearningCard = ({ title, icon: Icon, desc, example, color }: any) => {
  const colors: any = {
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  return (
    <div className={`p-6 sketch-border ${colors[color]} hover:-translate-y-2 transition-all group shadow-sm`}>
       <div className="p-3 bg-white rounded-xl mb-4 inline-block shadow-sm group-hover:scale-110 transition-transform">
          <Icon size={24}/>
       </div>
       <h4 className="font-black handwritten text-2xl mb-2 text-slate-900">{title}</h4>
       <p className="text-[11px] font-bold kalam opacity-70 leading-relaxed italic mb-4">"{desc}"</p>
       <div className="border-t border-black/5 pt-3">
          <span className="text-[8px] font-black uppercase text-slate-400">Example:</span>
          <p className="text-[10px] font-mono text-slate-500 mt-1">{example}</p>
       </div>
    </div>
  );
};

const PipelineNode = ({ title, icon: Icon, desc, color, animate }: any) => (
  <div className="flex flex-col items-center group">
     <div className={`p-4 rounded-2xl border-2 border-slate-900 bg-white shadow-lg mb-3 ${animate ? 'animate-float' : ''} group-hover:scale-110 transition-transform`}>
        <Icon className={color} size={28} />
     </div>
     <h6 className="text-[10px] font-black uppercase text-slate-900 mb-1">{title}</h6>
     <p className="text-[9px] kalam font-bold text-slate-400">{desc}</p>
  </div>
);

const Neuron = ({ label, count, color, active }: any) => (
  <div className="flex flex-col items-center space-y-2">
     <span className="text-[8px] font-black uppercase text-slate-400 mb-2">{label}</span>
     {[...Array(count)].map((_, i) => (
       <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 shadow-sm ${active && i === 1 ? 'animate-pulse scale-110 ' + color : color}`} />
     ))}
  </div>
);

const LogicStep = ({ title, desc }: any) => (
  <div className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
     <div className="mt-1"><CheckCircle2 size={14} className="text-emerald-400"/></div>
     <div>
        <h6 className="font-black text-xs uppercase text-indigo-200">{title}</h6>
        <p className="text-[10px] kalam text-slate-400 leading-tight italic">{desc}</p>
     </div>
  </div>
);

const EthicsItem = ({ title, desc }: any) => (
  <li className="flex items-start space-x-4 border-b border-white/5 pb-4 last:border-0 group">
     <div className="p-2 bg-white/10 rounded-lg group-hover:bg-rose-500 transition-colors">
        <Scale size={16} className="text-rose-300 group-hover:text-white" />
     </div>
     <div>
        <h6 className="font-black text-sm uppercase text-slate-200 mb-1">{title}</h6>
        <p className="text-[11px] kalam text-slate-500 italic leading-snug">"{desc}"</p>
     </div>
  </li>
);

export default A4MLSection;
