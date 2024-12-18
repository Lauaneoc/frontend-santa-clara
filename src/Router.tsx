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
import { AuthProvider } from "./@shared/contexts/Auth/AuthContext";

export function Router() {
  return (
    <AuthProvider>
    <Routes>
      {/* Rota de login não protegida */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rota protegida com o DefaultLayout */}
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="exam"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="patient"
          element={
            <ProtectedRoute>
              <PatientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="doctor"
          element={
            <ProtectedRoute>
              <DoctorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise"
          element={
            <ProtectedRoute>
              <EnterprisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="scheduling"
          element={
            <ProtectedRoute>
              <SchedulingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
    </AuthProvider>
  );
}
