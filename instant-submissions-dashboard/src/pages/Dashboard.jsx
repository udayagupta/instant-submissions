import React, { useState } from 'react';
import useForms from '../hooks/useForms';
import FormsList from '../components/Dashboard/FormsList';
import { CreateForm } from '../components/Dashboard/CreateForm';
import { Plus } from 'lucide-react';
import "../theme.css";

export const Dashboard = () => {
  const { forms, isLoading, isError, createForm, isCreating } = useForms();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSubmit = (formData) => {
    createForm(formData);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-text font-sans text-xl font-medium m-0">My Forms</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-200 text-bg font-medium px-4 py-2 rounded transition-colors cursor-pointer border-none"
        >
          <Plus size={16} strokeWidth={2.5} />
          Create Form
        </button>
      </div>

      <FormsList forms={forms}/>

      <CreateForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateSubmit}
        isCreating={isCreating}
      />
    </div>
  );
};