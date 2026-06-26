import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import Layout from './Layout';
import FormDetail from './pages/FormDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/submissions/:formId' element={<FormDetail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
