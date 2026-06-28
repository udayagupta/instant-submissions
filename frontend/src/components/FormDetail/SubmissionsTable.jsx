import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import "../../theme.css";

const SubmissionsTable = ({ submissions }) => {
  const location = useLocation()
  const formName = location.state?.formName

  console.log(formName);

  if (submissions.length === 0) {
    return (
      <p className='text-center text-text-dim text-[18px] py-10'>
        No submissions for <span className='font-semibold text-accent-100'>{formName}</span> form yet!
      </p>
    )
  }

  const columns = useMemo(() => {
    const keys = submissions.flatMap(sub => Object.keys(sub.data));
    return Array.from(new Set(keys))
  }, [submissions])

  return (
    <div className='p-2 rounded-md flex flex-col gap-4'>
      <div className='text-center'>
        <h2 className='text-text text-xl font-semibold capitalize'>{formName || "Submissions"}</h2>
      </div>

      <div className='table-wrapper rounded-lg border border-line overflow-x-auto panel'>
        <table className='w-full border-collapse font-mono text-[12.5px]'>
          <thead>
            <tr className='bg-panel-2'>
              <th className='text-left font-semibold uppercase tracking-wide text-[12.5px] text-text-dim px-3.5 py-2.5 whitespace-nowrap border-b border-line'>
                Time
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className='text-left font-semibold uppercase tracking-wide text-[12.5px] text-text-dim px-3.5 py-2.5 whitespace-nowrap border-b border-line'
                >
                  {col}
                </th>
              ))}
              <th className='text-left font-semibold uppercase tracking-wide text-[12.5px] text-text-dim px-3.5 py-2.5 whitespace-nowrap border-b border-line'>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => {
              const data = sub.data;
              const createdAt = new Date(sub.createdAt);

              return (
                <tr
                  key={sub._id}
                  className='border-b border-line last:border-b-0 hover:bg-panel-2 transition-colors'
                >
                  <td className='px-3.5 py-2.5 text-text-dim whitespace-nowrap'>
                    {createdAt.toLocaleTimeString()}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col}
                      className='px-3.5 py-2.5 text-text whitespace-nowrap max-w-[240px] overflow-hidden text-ellipsis'
                      title={data[col] ?? ''}
                    >
                      {data[col] || <span className='text-text-faint'>—</span>}
                    </td>
                  ))}
                  <td className='px-3.5 py-2.5 text-text-dim whitespace-nowrap'>
                    {createdAt.toLocaleDateString()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionsTable