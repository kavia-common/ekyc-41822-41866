import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RetroNavbar() {
  /** Retro-styled navigation bar with accessible links. */
  return (
    <>
      <div className="brand" aria-label="EKYC Retro App">EKYC▲RETRO</div>
      <div className="nav-items" role="navigation" aria-label="Primary">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/start" className="nav-link">Start KYC</NavLink>
        <NavLink to="/my-kyc" className="nav-link">My KYC</NavLink>
        <NavLink to="/admin" className="nav-link">Admin</NavLink>
      </div>
    </>
  );
}
