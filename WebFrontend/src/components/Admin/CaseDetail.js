import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import RetroCard from '../Layout/RetroCard';
import { kycService } from '../../api/kycService';

// PUBLIC_INTERFACE
export default function CaseDetail() {
  /** Admin case detail page with approve/reject actions. */
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [reason, setReason] = useState('');
  const [errorText, setErrorText] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setErrorText('');
    try {
      const res = await kycService.getCase(id);
      setData(res);
    } catch (err) {
      setErrorText(err?.message || 'Failed to load case');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const approve = async () => {
    setSaving(true);
    setErrorText('');
    try {
      await kycService.approve(id);
      navigate('/admin');
    } catch (err) {
      setErrorText(err?.message || 'Approve failed');
    } finally {
      setSaving(false);
    }
  };
  const reject = async () => {
    setSaving(true);
    setErrorText('');
    try {
      await kycService.reject(id, reason);
      navigate('/admin');
    } catch (err) {
      setErrorText(err?.message || 'Reject failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <Link to="/admin" className="btn mb-2">← Back</Link>
      <RetroCard title={`Case ${id}`} subtitle="Review the case details and documents">
        {errorText && <div className="pill warn">⚠️ {errorText}</div>}
        {!errorText && !data && <div className="pill info">Loading…</div>}
        {data && (
          <>
            <div className="mt-1">
              <div><strong>User:</strong> {data.user?.email || '-'}</div>
              <div className="mt-1"><strong>Status:</strong> <span className={`pill ${data.state === 'approved' ? 'success' : data.state === 'rejected' ? 'warn' : 'info'}`}>{data.state}</span></div>
            </div>
            <div className="mt-2">
              <h3 className="retro-title">Documents</h3>
              {(data.documents && data.documents.length > 0) ? (
                <ul>
                  {data.documents.map((d, idx) => (
                    <li key={idx}>{d.type} • {d.number} • {d.issuedCountry}</li>
                  ))}
                </ul>
              ) : <div className="pill info">No documents</div>}
            </div>
            <div className="mt-3">
              <button className="btn" onClick={approve} disabled={saving}>Approve</button>
              <button className="btn secondary mt-1" onClick={reject} disabled={saving} style={{ marginLeft: 8 }}>Reject</button>
              <div className="form-field mt-1">
                <label htmlFor="reason">Rejection reason</label>
                <input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Optional reason" />
              </div>
            </div>
          </>
        )}
      </RetroCard>
    </div>
  );
}
