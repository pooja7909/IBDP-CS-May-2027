
import React from 'react';

interface HandwrittenCardProps {
  children: React.ReactNode;
  title?: string;
  bgColor?: string;
  className?: string;
}

const HandwrittenCard: React.FC<HandwrittenCardProps> = ({ 
  children, 
  title, 
  bgColor = 'bg-white',
  className = ''
}) => {
  return (
    <div className={`relative p-8 shadow-md sketch-border ${bgColor} ${className}`}>
      {title && (
        <h2 className="handwritten text-2xl font-bold mb-6 text-slate-800 underline decoration-pink-500 decoration-2 underline-offset-4">
          {title}
        </h2>
      )}
      <div className="text-slate-700 leading-relaxed font-medium">
        {children}
      </div>
      <div className="absolute top-2 right-2 flex space-x-1">
        <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
      </div>
    </div>
  );
};

export default HandwrittenCard;
