import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const ClaimCard = ({claim}) => {
    const store = useSelector(state => state.policy)
   const policy = store.policyData?.find((policy) => policy.policy_id === Number(claim.policyId))
   console.log(policy)
  return (
    <div className="col-md-6">
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>Claim #{claim.id} {policy?.policy_type}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Policy Number: </strong> {claim.policyId} | {policy?.claim_type}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Date of Incident: </strong> {claim.incidentDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Description: </strong> {claim.claimDescription}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Claim amount: </strong> Rs.{claim.claimAmount}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Status: </strong>
                      <span
                        className={`badge ${
                          claim.claimStatus === 'Approved'
                            ? 'bg-success'
                            : claim.claimStatus === 'Pending'
                            ? 'bg-warning text-dark'
                            : 'bg-danger'
                        }`}
                      >
                        {claim.claimStatus}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
  )
}

export default ClaimCard
