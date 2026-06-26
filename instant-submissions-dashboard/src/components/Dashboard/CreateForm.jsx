import React, { useState } from 'react';
import { PopUpModal } from '../PopUpModal';

export const CreateForm = ({ isOpen, onClose, onSubmit, isCreating }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleClose = () => {
    onClose();
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  return (
    <PopUpModal isOpen={isOpen} onClose={handleClose} title="Create New Form">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-text-dim text-[13px] font-sans uppercase tracking-wider">
            Form Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-panel-2 border border-line rounded px-3 py-2.5 text-text font-sans focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g., Developer Job Application"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-text-dim text-[13px] font-sans uppercase tracking-wider">
            Description <span className="text-text-faint lowercase">(Optional)</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-panel-2 border border-line rounded px-3 py-2.5 text-text font-sans focus:outline-none focus:border-accent transition-colors resize-none h-24"
            placeholder="What is the purpose of this form?"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-line">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-transparent hover:bg-panel-2 border border-line rounded text-text-dim hover:text-text transition-colors cursor-pointer text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating}
            className="px-4 py-2 bg-accent hover:bg-accent-200 border-none rounded text-bg transition-colors cursor-pointer text-sm font-medium disabled:opacity-50"
          >
            {isCreating ? 'Saving...' : 'Save Form'}
          </button>
        </div>

      </form>
    </PopUpModal>
  );
};