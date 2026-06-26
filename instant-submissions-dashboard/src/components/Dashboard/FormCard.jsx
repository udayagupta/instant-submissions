import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const FormCard = ({ form }) => {
  const [copied, setCopied] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);


  const API_BASE_URL = "http://localhost:5000/api";

  const handleCopy = (e) => {
    e.stopPropagation();

    if (form._id) {
      navigator.clipboard.writeText(form._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopySnippet = (e) => {
    e.stopPropagation();
    if (form._id) {
      const htmlSnippet = `<form action="${API_BASE_URL}/submit/${form._id}" method="POST">
  <input type="text" name="email" placeholder="Enter your email" required />
  <button type="submit">Submit</button>
</form>`;

      navigator.clipboard.writeText(htmlSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <div className="form-card flex flex-col gap-4">

      {/* Top Section: Info & Count Badge */}
      <div className="flex justify-between items-start gap-4">

        {/* Form Details */}
        <div className="flex-1">
          <h3 className="text-text font-sans text-lg font-medium m-0">
            {form.name}
          </h3>
          <p className="text-text-dim font-sans text-sm mt-1 mb-0 line-clamp-2">
            {form.description || "No description provided."}
          </p>
        </div>

        {/* Submissions Count Indicator */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-text-faint font-mono text-[12px] uppercase tracking-wider mb-1">
            Submissions
          </span>
          <div className="pill pill-fresh flex items-center gap-2">
            <span className="live-dot"></span>
            <span className="font-mono font-bold text-[14px] text-accent-50">
              {form.submissionCount || 0}
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Section: Footer/Action */}
      <div className="border-t border-line pt-3 mt-1 flex justify-between items-center">

        <div className='flex gap-2'>
          <button
            onClick={handleCopy}
            className="bg-panel-2 border border-line hover:border-accent text-text-dim hover:text-text text-[11px] font-mono px-2 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5"
            title="Copy full ID"
          >
            {copied ? (
              <>
                {/* Checkmark Icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-accent font-bold">Copied</span>
              </>
            ) : (
              <>
                {/* Clipboard Icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {/* ID: {form._id ? form._id.slice(-6) : '---'} */}
                ID: {form._id}
              </>
            )}
          </button>

          <button
            onClick={handleCopySnippet}
            className="bg-panel-2 border border-line hover:border-accent text-text-dim hover:text-text text-[11px] font-mono px-2 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5"
            title="Copy HTML Form Snippet"
          >
            {copiedSnippet ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-accent font-bold">Copied</span>
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                HTML
              </>
            )}
          </button>
        </div>

        {/* <a href={`/submissions/${form._id}`} className="text-accent text-sm font-medium hover:text-accent-50 transition-colors">
          View Submissions &rarr;
        </a> */}
        <Link
          to={`/submissions/${form._id}`}
          state={{ formName: form.name }}
          className="text-accent text-sm font-medium hover:text-accent-50 transition-colors"
        >
          <span>View Submissions &rarr;</span>
        </Link>
      </div>

    </div>
  );
};
