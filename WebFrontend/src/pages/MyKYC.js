import React, { useState } from 'react';
import RetroCard from '../components/Layout/RetroCard';
import KycStatus from '../components/KYC/KycStatus';

// PUBLIC_INTERFACE
export default function MyKYC() {
  /** Allows a user to check their KYC status by entering case ID. */
  const [caseId, setCaseId] = useState('');
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="container">
      <RetroCard title="My KYC" subtitle="Enter your case ID to view status" actions={
        <button className="btn" type="submit" form="find-case">Check Status</button>
      }>
        <form id="find-case" onSubmit={submit} className="form-grid single">
          <div className="form-field">
            <label htmlFor="caseId">Case ID</label>
            <input id="caseId" value={caseId} onChange={(e) => setCaseId(e.target.value)} required />
          </div>
        </form>
      </RetroCard>

      {show && caseId && (
        <div className="mt-3">
          <KycStatus caseId={caseId} />
        </div>
      )}
    </div>
  );
}
