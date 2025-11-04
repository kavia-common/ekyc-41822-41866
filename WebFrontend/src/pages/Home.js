import React from 'react';
import RetroCard from '../components/Layout/RetroCard';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page for EKYC retro app. */
  return (
    <div className="container">
      <RetroCard title="Welcome to EKYC▲RETRO" subtitle="Secure, modular, and stylish identity verification">
        <p>
          Start your verification journey or check your status. Admins can review cases.
        </p>
        <div className="mt-2">
          <Link to="/start" className="btn">Start KYC</Link>
          <Link to="/my-kyc" className="btn secondary" style={{ marginLeft: 8 }}>My KYC</Link>
        </div>
      </RetroCard>
    </div>
  );
}
