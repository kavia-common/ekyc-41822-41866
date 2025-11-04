/**
 * Service for interacting with EKYC backend endpoints.
 * Note: Backend endpoints should exist; these calls are optimistic and feature basic error handling.
 */

import { apiRequest } from './client';

// PUBLIC_INTERFACE
export const kycService = {
  /** Starts a new KYC case for a user with provided profile data. */
  start: (data) => apiRequest('/kyc/start', { method: 'POST', body: data }),
  /** Uploads a document to an existing KYC case (mock: metadata only as JSON). */
  uploadMetadata: (caseId, doc) => apiRequest(`/kyc/${encodeURIComponent(caseId)}/documents`, { method: 'POST', body: doc }),
  /** Gets KYC status for a given caseId or for current user if supported. */
  status: (caseId) => apiRequest(`/kyc/${encodeURIComponent(caseId)}/status`),
  /** Lists all cases for admin. */
  listCases: () => apiRequest('/admin/kyc/cases'),
  /** Retrieves case detail for admin review. */
  getCase: (id) => apiRequest(`/admin/kyc/cases/${encodeURIComponent(id)}`),
  /** Approves a case. */
  approve: (id) => apiRequest(`/admin/kyc/cases/${encodeURIComponent(id)}/approve`, { method: 'POST' }),
  /** Rejects a case with reason. */
  reject: (id, reason) => apiRequest(`/admin/kyc/cases/${encodeURIComponent(id)}/reject`, { method: 'POST', body: { reason } }),
};
