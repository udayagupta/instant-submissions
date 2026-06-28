import React from 'react';
import { X } from 'lucide-react';
import "../theme.css";

export const PopUpModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
      
      <div className="bg-panel border border-line rounded-[var(--radius-card)] w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-line bg-panel-2/50">
          <h2 className="text-text font-sans text-lg font-medium m-0">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-text-dim hover:text-accent cursor-pointer transition-colors bg-transparent border-none p-1 rounded hover:bg-accent-glow"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body (Where your injected children go) */}
        <div className="p-5">
          {children}
        </div>
        
      </div>
    </div>
  );
};