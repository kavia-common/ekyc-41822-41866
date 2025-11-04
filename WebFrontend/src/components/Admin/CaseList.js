import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RetroCard from '../Layout/RetroCard';
import { kycService } from '../../api/kycService';

// PUBLIC_INTERFACE
export default function CaseList() {
  /** Lists KYC cases for admin review. */
  const [items, setItems] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await kycService.listCases();
        if (active) setItems(res || []);
      } catch (err) {
        if (active) setErrorText(err?.message || 'Failed to load cases');
      }
    };
    load();
    return () => { active = false; };
  }, []);

  return (
    <RetroCard title="KYC Cases" subtitle="Overview of all user KYC cases">
      {errorText && <div className="pill warn">⚠️ {errorText}</div>}
      {!errorText && items.length === 0 && <div className="pill info">No cases found</div>}
      {items.length > 0 && (
        <table className="table-like mt-2" role="table" aria-label="KYC case list">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.user?.email || '-'}</td>
                <td>
                  <span className={`pill ${c.state === 'approved' ? 'success' : c.state === 'rejected' ? 'warn' : 'info'}`}>
                    {c.state}
                  </span>
                </td>
                <td>{c.updatedAt ? new Date(c.updatedAt).toLocaleString() : '-'}</td>
                <td><Link className="btn" to={`/admin/cases/${encodeURIComponent(c.id)}`}>Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RetroCard>
  );
}
