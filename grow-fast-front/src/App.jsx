import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard/client"
          element={
            <PrivateRoute role="user">
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
