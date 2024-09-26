import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleSignup = (data) => {
    setIsSubmitting(true);
    let genToken = 'token' + Math.random().toString(24).substring(2) + Date.now().toString(24);
    let updatedUser = { ...data, token: genToken };
    dispatch(signUp(updatedUser));
    
    setIsSubmitting(false);
    setSuccessMessage('You have registered successfully');
    
    setTimeout(() => {
      setSuccessMessage('');
      reset(); // Clear the form after successful submission
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <h2 className="text-center mb-4">Register</h2>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit(handleSignup)} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
