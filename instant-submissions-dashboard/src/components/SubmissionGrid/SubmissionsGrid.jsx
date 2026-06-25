import React, { useState, useEffect } from 'react';
import { socket } from "../../lib/socket";
import { getSubmissionsByFormId } from "../../lib/api";

const FORM_ID = "portfolio-contact";

const SubmissionsGrid = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        getSubmissionsByFormId(FORM_ID).then(setSubmissions);

        const handleNewSubmissions = (newSubmission) => {
            setSubmissions((prev) => [newSubmission, ...prev]);
        };

        socket.on(`new-submission-${FORM_ID}`, handleNewSubmissions);

        return () => {
            socket.off(`new-submission-${FORM_ID}`, handleNewSubmissions);
        };

    }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>⚡ InstantSubmissions Dashboard</h1>
      <p>Listening for new forms on: <strong>{FORM_ID}</strong></p>

      <div style={{ marginTop: "2rem" }}>
        {submissions.length === 0 ? (
          <p>No submissions yet. Go submit your HTML form!</p>
        ) : (
          submissions.map((sub) => (
            <div 
              key={sub._id} 
              style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", backgroundColor: "#f9f9f9" }}
            >
              <span style={{ fontSize: "0.8rem", color: "#666" }}>
                {new Date(sub.createdAt).toLocaleString()}
              </span>
              <div style={{ marginTop: "0.5rem" }}>
                {/* Dynamically map over whatever random data the form sent */}
                {Object.entries(sub.data).map(([key, value]) => (
                  <p key={key} style={{ margin: "0.2rem 0" }}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SubmissionsGrid