import React from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import ClaimCard from './ClaimCard';

const ClaimHistory = () => {
  const claims = useSelector((state) => state.user.claimRequest);
  const currentUser = useSelector((state) => state.user.currentUser);
  const claimHistory =
    claims?.filter((claim) => claim.userEmail === currentUser?.email) || [];
  // const findPolicy = store.policyData?.find((policy) => policy.policy_id === policyId)

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Claim History for - {currentUser?.name}
      </h2>
      <div className="row">
        {claimHistory.length > 0 ? (
          claimHistory.map((claim) => (
            <ClaimCard claim={claim} key={claim.id} />
          ))
        ) : (
          <div className="text-center">
            <p>No claims found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;
