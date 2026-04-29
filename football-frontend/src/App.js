import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Όταν το path είναι σκέτο "/", δείξε το Login */}
        <Route path="/" element={<Login />} />
        
        {/* Όταν το path είναι "/register", δείξε το Register */}
        <Route path="/register" element={<Register />} />

        {/* Αν ο χρήστης γράψει κάτι άκυρο, στείλτον στο Login */}
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;