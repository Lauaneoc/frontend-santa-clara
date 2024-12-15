import { Route, Routes } from "react-router-dom";

import { ExamPage } from "./view/pages/Exam";
import { DefaultLayout } from "./view/DefaultLayout";
import { PatientPage } from "./view/pages/patient";
import { DoctorPage } from "./view/pages/doctor";
import { EnterprisePage } from "./view/pages/enterprise";
import { SchedulingPage } from "./view/pages/scheduling";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index path="exam" element={<ExamPage />} />
        <Route index path="patient" element={<PatientPage />} />
        <Route index path="doctor" element={<DoctorPage />} />
        <Route index path="enterprise" element={<EnterprisePage />} />
        <Route index path="scheduling" element={<SchedulingPage />} />
      </Route>
    </Routes>
  );
}
