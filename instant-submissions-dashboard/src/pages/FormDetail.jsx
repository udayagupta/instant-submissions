import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSubmissions } from "../hooks/useSubmissions";
import SubmissionsTable from '../components/FormDetail/SubmissionsTable';
import "../theme.css";

const FormDetail = () => {
  const { formId } = useParams()
  const { submissions, isLoading, isError, error } = useSubmissions(formId);

  if (isLoading) {
    return (
      <div className="p-4 text-text-dim text-sm font-mono">
        Loading submissions…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 text-warn text-sm">
        Failed to load submissions{error?.message ? `: ${error.message}` : '.'}
      </div>
    )
  }

  return (
    <div className="">
      <SubmissionsTable submissions={submissions}/>
    </div>
  )
}

export default FormDetail