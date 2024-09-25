import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation,useNavigate } from "react-router-dom";
import { purchasePolicy } from "../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
const PurchaseForm = () => {
    const{formState,currentUser} = useSelector(state => state.user)
    const {register,handleSubmit,formState: { errors },reset } = useForm();
    const location = useLocation();
    const {policy} = location.state || {}
    const policyPremium = policy.details.premium
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //handle purchase handler
    const handlePurchasePolicy = (data) => {
        dispatch(purchasePolicy(data))
        reset()
        if(formState === 'Success'){
            navigate('/payment',{state:{premium:policyPremium,policy:policy}})
        }
    }
//    useEffect(() => { 
//     if(formState === 'Success'){
//         navigate('/payment',{state:{premium:policyPremium,policy:policy}})
//     }
//    },[])
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 bg-white rounded-lg w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Purchase Policy Form</h2>
        <form onSubmit={handleSubmit(handlePurchasePolicy)}>
          {/* Policy Number */}
          <input type="hidden" {...register('userEmail')} value={currentUser.email}/>
          <input type="hidden" {...register('paymentStatus')} value="unpaid"/>

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
              {...register("policyHolderName", { required: "Policy Holder Name is required" })}
            placeholder="Please Enter Full Name"
           />
     {errors.policyHolderName && <p className="text-danger">{errors.policyHolderName.message}</p>}

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
              {...register('policyHolderAge')}
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
              {...register('coverageAmount')}
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

          {/* Terms & Conditions */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsAccepted"
              {...register('termsAccepted')}
              required
            />
            <label className="form-check-label" htmlFor="termsAccepted">
              I accept the terms and conditions
            </label>
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
