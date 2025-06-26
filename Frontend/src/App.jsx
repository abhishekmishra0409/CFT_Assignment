import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" replace />} />
                <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" replace />} />
                <Route path="/forgot-password" element={!token ? <ForgotPasswordPage /> : <Navigate to="/" replace />} />
                <Route path="/reset-password/:token" element={!token ? <ResetPasswordPage /> : <Navigate to="/" replace />} />

                {/* Protected route */}
                <Route
                    path="/"
                    element={token ? <HomePage /> : <Navigate to="/login" replace />}
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
            </Routes>
        </Router>
    );
};

export default App;