import { Route, Routes } from "react-router-dom";

import { ExamPage } from "./view/pages/Exam";
import { DefaultLayout } from "./view/DefaultLayout";
import { PatientPage } from "./view/pages/patient";
import { DoctorPage } from "./view/pages/doctor";
import { EnterprisePage } from "./view/pages/enterprise";
import { SchedulingPage } from "./view/pages/scheduling";
import { UserPage } from "./view/pages/user";
import { ProtectedRoute } from "./ProtectedRouter";
import { LoginPage } from "./view/pages/Login";
import { DashboardPage } from "./view/pages/dashboard";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage /> } />

      <Route path="/" element={<DefaultLayout />}>
      <Route
          index
          path=""
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="exam"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="patient"
          element={
            <ProtectedRoute>
              <PatientPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="doctor"
          element={
            <ProtectedRoute>
              <DoctorPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="enterprise"
          element={
            <ProtectedRoute>
              <EnterprisePage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="scheduling"
          element={
            <ProtectedRoute>
              <SchedulingPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
