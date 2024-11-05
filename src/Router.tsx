import { Route, Routes } from 'react-router-dom';

import { ExamPage } from './view/pages/Exam';
import { DefaultLayout } from './view/DefaultLayout';
import { PatientPage } from './view/pages/patient';


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
              path='patient'
              element={<PatientPage />} 
            />
        </Route>
    </Routes>
  );
}
