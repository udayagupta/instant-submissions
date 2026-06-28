import React from 'react'
import { FormCard } from './FormCard'

const FormsList = ({ forms }) => {
  return (
    <ul className='forms-list-dashboard flex flex-col gap-4'>
      {forms.map((form) => (
        <li key={form._id}>
          <FormCard form={form}/>
        </li>
      ))}
    </ul>
  )
}

export default FormsList