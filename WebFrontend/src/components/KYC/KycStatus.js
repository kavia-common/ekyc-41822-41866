import React, { useEffect, useState } from 'react';
import RetroCard from '../Layout/RetroCard';
import { kycService } from '../../api/kycService';

// PUBLIC_INTERFACE
export default function KycStatus({ caseId }) {
  /** Displays current KYC status for a case. */
  const [status, setStatus] = useState(null);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await kycService.status(caseId);
        if (active) setStatus(res);
      } catch (err) {
        if (active) setErrorText(err?.message || 'Unable to load status');
      }
    };
    load();
    return () => { active = false; };
  }, [caseId]);

  return (
    <RetroCard title="KYC Status" subtitle="Track your verification progress">
      {errorText && <div className="pill warn">⚠️ {errorText}</div>}
      {!errorText && !status && <div className="pill info">Loading status…</div>}
      {status && (
        <div className="mt-2">
          <div className={`pill ${status.state === 'approved' ? 'success' : status.state === 'rejected' ? 'warn' : 'info'}`}>
            <span>State:</span> <strong>{status.state}</strong>
          </div>
          {status.reason && <div className="mt-1">Reason: {status.reason}</div>}
          {status.updatedAt && <div className="mt-1">Updated: {new Date(status.updatedAt).toLocaleString()}</div>}
        </div>
      )}
    </RetroCard>
  );
}
