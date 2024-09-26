import React, { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserPolicyCard from './UserPolicyCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // Get the user state from Redux
  const user = useSelector((state) => state.user);
  const userEmail = user?.currentUser?.email;
  const userPolicies = user?.purchasedPolicy.filter((policy) => policy.userEmail === userEmail ) || [];
  const navigate = useNavigate()
  useEffect(() => {
    if(!user.isLoggedIn){
      navigate('/')
    }
  },[user.isLoggedIn])
  return (
    <div className="container my-5">
      <div className="row">
        {/* User Information Section */}
        <div className="col-md-4">
          <Card>
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/1.jpg" />
            <Card.Body>
              <Card.Title>Name: {user?.currentUser?.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user?.currentUser?.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Purchase Policies Section */}
        <div className="col-md-8">
          <h3 className="mb-4">Purchase Policies</h3>
          
          {/* Display policies */}
          {userPolicies.length > 0 ? (
            userPolicies.map((policy, index) => (
              <UserPolicyCard policy={policy}/>
            ))
          ) : (
            <p>No purchase policies found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
