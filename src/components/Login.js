import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login, resetErrorState } from '../reducer/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const users = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState();

  const handleLogin = (data) => {
    setIsSubmitting(true);
    dispatch(login(data));
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (users.isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [users.isLoggedIn]);

  useEffect(() => {
    dispatch(resetErrorState());
  }, []);
  return (
    <div className="container mt-5 py-5">
      <h2 className="text-center mb-4">Login</h2>
      <h3>
        {users.loginError && (
          <h3 className="text-center">Username or password not valid</h3>
        )}
      </h3>
      <form className="col-md-6 mx-auto" onSubmit={handleSubmit(handleLogin)}>
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
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
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
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isSubmitting ? 'Signing In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
