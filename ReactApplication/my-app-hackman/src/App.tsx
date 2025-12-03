import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeeDetails from './pages/EmployeeDetails';
import * as auth from './services/auth';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/employees"
          element={<EmployeeDetails />}
        />
        <Route path="*" element={<Navigate to={auth.isAuthenticated() ? "/employees" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
