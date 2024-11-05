import { Route, Routes } from 'react-router-dom';

import { ExamPage } from './view/pages/Exam';
import { DefaultLayout } from './view/DefaultLayout';
import { CreateExamForm } from './view/forms/exam/CreateExamForm';
import { CreatePatientForm } from './view/forms/patient/CreatePatientForm';


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
                path='exam/create-form'
                element={<CreateExamForm />} 
            />
            <Route 
              index 
              path='patient'
              element={<CreatePatientForm />} 
            />
            <Route 
              index 
              path='patient/create-form'
              element={<CreatePatientForm />} 
            />
        </Route>
    </Routes>
  );
}
