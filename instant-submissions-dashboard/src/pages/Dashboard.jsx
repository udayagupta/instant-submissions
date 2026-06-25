import React from 'react';
import useForms from '../hooks/useForms';
import FormsList from '../components/Dashboard/FormsList';
import "../theme.css";

const Dashboard = () => {
  const { forms, isLoading, isError, createForm, isCreating } = useForms()
  
  return (
    <div className="p-4">
      {/* <p>Total Forms: {forms.length}</p> */}

      <FormsList forms={forms}/>
    </div>
  )
}

export default Dashboard