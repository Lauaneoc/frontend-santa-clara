// src/Router.tsx
import { Route, Routes } from 'react-router-dom';

import { Exam } from './view/pages/Exam';
import { DefaultLayout } from './view/DefaultLayout';
import { CreateExamForm } from './view/forms/exam/CreateExamForm';


export function Router() {
  return (
    <Routes>
        <Route path="/" element={<DefaultLayout />} >
            <Route 
                index 
                path='exam'
                element={<Exam />} 
            />
            <Route 
                index 
                path='form'
                element={<CreateExamForm />} 
            />
            
        </Route>
    </Routes>
  );
}
