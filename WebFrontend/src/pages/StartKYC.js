import React, { useState } from 'react';
import OnboardingForm from '../components/KYC/OnboardingForm';
import DocumentUpload from '../components/KYC/DocumentUpload';
import KycStatus from '../components/KYC/KycStatus';

// PUBLIC_INTERFACE
export default function StartKYC() {
  /** Page that guides the user through onboarding then uploading documents. */
  const [caseInfo, setCaseInfo] = useState(null);

  return (
    <div className="container">
      {!caseInfo && <OnboardingForm onStarted={setCaseInfo} />}
      {caseInfo && (
        <>
          <DocumentUpload caseId={caseInfo.id || caseInfo.caseId} />
          <div className="mt-3">
            <KycStatus caseId={caseInfo.id || caseInfo.caseId} />
          </div>
        </>
      )}
    </div>
  );
}
