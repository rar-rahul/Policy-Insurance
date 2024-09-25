import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import { payment } from '../reducer/userSlice';
const PaymentForm = () => {
    const {currentUser,isLoggedIn,purchasedPolicy} = useSelector(state => state.user)
    const location = useLocation();
    const dispatch = useDispatch();
    const {policy} = location.state || {}
    const navigate = useNavigate();
    const handlePayment = () => { 
        dispatch(payment({
            policyId:policy.policy_id,
            userEmail:currentUser.email
        }))
    }
    useEffect(() => {
        if(!isLoggedIn){
          navigate('/')
        }
      },[isLoggedIn])

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Header className="text-center">
              <h3>Payment Details</h3>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-4">Policy Details</h5>
              <p>
                <strong>Policy Number:</strong> {policy.policy_id}
              </p>
              <p>
                <strong>Coverage Amount:</strong> Rs. {policy.coverage_amount}
              </p>
              <p>
                <strong>Policy Type:</strong> {policy.policy_type}
              </p>
              <hr />
              <h5 className="mb-4">Premium Amount</h5>
              <p>
                <strong>Total Premium:</strong> Rs. {policy.details.premium}
              </p>
              <Button variant="primary" onClick={handlePayment} className="w-100">
                Pay Now
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
