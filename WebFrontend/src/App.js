import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import RetroNavbar from './components/Layout/RetroNavbar';
import Home from './pages/Home';
import StartKYC from './pages/StartKYC';
import MyKYC from './pages/MyKYC';
import AdminDashboard from './pages/AdminDashboard';
import CaseDetail from './components/Admin/CaseDetail';

// PUBLIC_INTERFACE
function App() {
  /** Root application that wires routes and shared layout (retro navbar). */
  return (
    <BrowserRouter>
      <div className="app-root">
        <nav className="navbar">
          <div className="container navbar-inner">
            <RetroNavbar />
          </div>
        </nav>
        <main>
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/start" element={<StartKYC />} />
              <Route path="/my-kyc" element={<MyKYC />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/cases/:id" element={<CaseDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
