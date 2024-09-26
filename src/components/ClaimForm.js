import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fileClaim } from '../reducer/userSlice';
const ClaimForm = () => {
  const { claimRequest } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const { policyId, userEmail } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClaimSubmit = (data) => {
    dispatch(fileClaim(data));
    reset();
    setTimeout(() => {
      navigate('/claim-history');
    }, 2000);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4 bg-white rounded-lg w-100"
        style={{ maxWidth: '500px' }}
      >
        <h2 className="text-center mb-4">File a Claim</h2>
        <form onSubmit={handleSubmit(handleClaimSubmit)}>
          <input type="hidden" {...register('userEmail')} value={userEmail} />
          <input type="hidden" {...register('policyId')} value={policyId} />
          <input type="hidden" {...register('claimStatus')} value="Pending" />
          {/* Claim Description */}
          <div className="mb-3">
            <label htmlFor="claimDescription" className="form-label">
              Claim Description:
            </label>
            <textarea
              className="form-control"
              id="claimDescription"
              {...register('claimDescription', {
                required: 'Claim description is required',
              })}
              placeholder="Describe the incident or reason for the claim"
            />
            {errors.claimDescription && (
              <p className="text-danger">{errors.claimDescription.message}</p>
            )}
          </div>

          {/* Payment of claim */}
          <div className="mb-3">
            <label htmlFor="incidentDate" className="form-label">
              Amount Claim:
            </label>
            <input
              type="number"
              className="form-control"
              id="claimAmount"
              placeholder="Please Enter Claim Amount"
              {...register('claimAmount', { required: 'Amount is required' })}
            />
            {errors.claimAmount && (
              <p className="text-danger">{errors.claimAmount.message}</p>
            )}
          </div>

          {/* Date of Incident */}
          <div className="mb-3">
            <label htmlFor="incidentDate" className="form-label">
              Date of Incident:
            </label>
            <input
              type="date"
              className="form-control"
              id="incidentDate"
              {...register('incidentDate', {
                required: 'Date of incident is required',
              })}
            />
            {errors.incidentDate && (
              <p className="text-danger">{errors.incidentDate.message}</p>
            )}
          </div>

          {/* Attach Supporting Documents */}
          {/* <div className="mb-3">
            <label htmlFor="supportingDocuments" className="form-label">
              Attach Supporting Documents:
            </label>
            <input
              type="file"
              className="form-control"
              id="document"
              {...register('document', { required: "Please attach documents" })}
            />
            {errors.document && <p className="text-danger">{errors.document.message}</p>}
          </div> */}

          {/* Terms & Conditions */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsAccepted"
              {...register('termsAccepted', {
                required: 'You must accept the terms and conditions',
              })}
            />
            <label className="form-check-label" htmlFor="termsAccepted">
              I accept the terms and conditions
            </label>
            {errors.termsAccepted && (
              <p className="text-danger">{errors.termsAccepted.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimForm;
