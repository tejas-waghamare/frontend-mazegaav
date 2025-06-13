import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Programs from './components/Programs';
import WaterSupply from './components/WaterSupply';
import ReportIssue from './components/ReportIssue';
import About from './components/About';
import Login from './components/Login';
import GramPanchayatDashboard from './components/GramPanchayatDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedType }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginType = localStorage.getItem('loginType');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedType && loginType !== allowedType) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute allowedType="user">
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/programs"
              element={
                <ProtectedRoute allowedType="user">
                  <Programs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/water"
              element={
                <ProtectedRoute allowedType="user">
                  <WaterSupply />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute allowedType="user">
                  <ReportIssue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute allowedType="user">
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grampanchayat-dashboard"
              element={
                <ProtectedRoute allowedType="grampanchayat">
                  <GramPanchayatDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;