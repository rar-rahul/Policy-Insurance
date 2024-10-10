import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { purchasePolicy } from '../reducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const PurchaseForm = () => {
  const { formState, currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const { policy } = location.state || {};
  const policyPremium = policy.details.premium;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle purchase handler
  const handlePurchasePolicy = async (data) => {

    try {
      const response = await fetch('http://127.0.0.1:8000/api/purchasePolicy',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          // 'Authorization': `${token}`
        },
        body:JSON.stringify(data)
      })
      const res = await response.json()
    } catch (error) {
      
    }
  
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4 bg-white rounded-lg w-100"
        style={{ maxWidth: '500px' }}
      >
        <h2 className="text-center mb-4">Purchase Policy Form</h2>
        <form onSubmit={handleSubmit(handlePurchasePolicy)}>
          {/* Policy Number */}
          <input
            type="hidden"
            {...register('user')}
            value={currentUser._id}
          />
           <input
            type="hidden"
            {...register('usermail')}
            value={currentUser.email}
          />
          <input type="hidden" {...register('paymentStatus')} value="unpaid" />

          <div className="mb-3">
            <label htmlFor="policyNumber" className="form-label">
              Policy Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyNumber"
              value={policy.policy_id}
              {...register('policyNumber')}
              readOnly
            />
          </div>

          {/* Policy Holder Name */}
          <div className="mb-3">
            <label htmlFor="policyHolderName" className="form-label">
              Policy Holder Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyHolderName"
              {...register('policyHolder', {
                required: 'Policy Holder Name is required',
              })}
              placeholder="Please Enter Full Name"
            />
            {errors.policyHolderName && (
              <p className="text-danger">{errors.policyHolderName.message}</p>
            )}
          </div>
          {/* Policy Holder Age */}
          <div className="mb-3">
            <label htmlFor="policyHolderName" className="form-label">
              Policy Holder Age:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyHolderAge"
              name="policyHolderAge"
              {...register('policyAge')}
              placeholder="Please Enter age"
            />
          </div>

          {/* Coverage Amount */}
          <div className="mb-3">
            <label htmlFor="coverageAmount" className="form-label">
              Coverage Amount (Rs):
            </label>
            <input
              type="number"
              className="form-control"
              id="coverageAmount"
              value={policy.coverage_amount}
              {...register('covrageAmount')}
              required
            />
          </div>

          {/* Purchase Date */}
          <div className="mb-3">
            <label htmlFor="purchaseDate" className="form-label">
              Purchase Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="purchaseDate"
              {...register('purchaseDate')}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            {formState === 'Loading' ? 'Processing' : 'Submit Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
