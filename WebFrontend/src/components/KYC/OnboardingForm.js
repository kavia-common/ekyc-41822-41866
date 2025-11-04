import React, { useState } from 'react';
import RetroCard from '../Layout/RetroCard';
import { kycService } from '../../api/kycService';

// PUBLIC_INTERFACE
export default function OnboardingForm({ onStarted }) {
  /**
   * Collects minimal user info to open a KYC case.
   * Emits the created case details via onStarted callback.
   */
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorText('');
    try {
      const res = await kycService.start(form);
      onStarted && onStarted(res);
    } catch (err) {
      setErrorText(err?.message || 'Failed to start KYC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RetroCard
      title="Start your KYC"
      subtitle="Provide your basic information to open a KYC case."
      actions={
        <button className="btn" type="submit" form="onboard-form" disabled={loading} aria-busy={loading}>
          {loading ? 'Starting…' : 'Start KYC'}
        </button>
      }
    >
      <form id="onboard-form" onSubmit={submit} className="form-grid">
        <div className="form-field">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" value={form.firstName} onChange={update} required />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" value={form.lastName} onChange={update} required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={update} required />
        </div>
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <input id="country" name="country" value={form.country} onChange={update} required />
        </div>
      </form>
      {errorText && <div className="mt-2 pill warn" role="alert">⚠️ {errorText}</div>}
    </RetroCard>
  );
}
