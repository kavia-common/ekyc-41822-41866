import React from 'react';
import CaseList from '../components/Admin/CaseList';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Admin entry page listing cases. */
  return (
    <div className="container">
      <CaseList />
    </div>
  );
}
