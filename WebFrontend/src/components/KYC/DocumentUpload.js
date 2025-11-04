import React, { useState } from 'react';
import RetroCard from '../Layout/RetroCard';
import { kycService } from '../../api/kycService';

// PUBLIC_INTERFACE
export default function DocumentUpload({ caseId, onUploaded }) {
  /**
   * Uploads document metadata to the backend.
   * Note: File transfer can be added later; this focuses on wiring a flow end-to-end.
   */
  const [doc, setDoc] = useState({ type: 'passport', number: '', issuedCountry: '' });
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (e) => setDoc({ ...doc, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorText('');
    setSuccess(false);
    try {
      await kycService.uploadMetadata(caseId, doc);
      setSuccess(true);
      onUploaded && onUploaded();
    } catch (err) {
      setErrorText(err?.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RetroCard
      title="Upload documents"
      subtitle="Provide your document details to continue."
      actions={
        <button className="btn" type="submit" form="doc-form" disabled={loading} aria-busy={loading}>
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      }
    >
      <form id="doc-form" onSubmit={submit} className="form-grid">
        <div className="form-field">
          <label htmlFor="type">Document type</label>
          <select id="type" name="type" value={doc.type} onChange={update}>
            <option value="passport">Passport</option>
            <option value="national_id">National ID</option>
            <option value="driver_license">Driver License</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="number">Document number</label>
          <input id="number" name="number" value={doc.number} onChange={update} required />
        </div>
        <div className="form-field">
          <label htmlFor="issuedCountry">Issuing country</label>
          <input id="issuedCountry" name="issuedCountry" value={doc.issuedCountry} onChange={update} required />
        </div>
      </form>
      {errorText && <div className="mt-2 pill warn" role="alert">⚠️ {errorText}</div>}
      {success && <div className="mt-2 pill success" role="status">✅ Document metadata submitted</div>}
    </RetroCard>
  );
}
