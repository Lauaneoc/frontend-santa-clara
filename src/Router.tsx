// src/Router.tsx
import { Route, Routes } from 'react-router-dom';

import { Exam } from './pages/Exam';
import { DefaultLayout } from './layout/DefaultLayout';


export function Router() {
  return (
    <Routes>
        <Route path="/exam" element={<DefaultLayout />} >
            <Route 
                index 
                element={<Exam />} 
            />
        </Route>
    </Routes>
  );
}
