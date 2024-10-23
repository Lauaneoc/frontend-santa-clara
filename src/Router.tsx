// src/Router.tsx
import { Route, Routes } from 'react-router-dom';

import { ExamPage } from './view/pages/Exam';
import { DefaultLayout } from './view/DefaultLayout';
import { CreateExamForm } from './view/forms/exam/CreateExamForm';


export function Router() {
  return (
    <Routes>
        <Route path="/" element={<DefaultLayout />} >
            <Route 
                index 
                path='exam'
                element={<ExamPage />} 
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
