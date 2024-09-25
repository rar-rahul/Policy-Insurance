import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {login} from '../reducer/userSlice'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const users = useSelector((state => state.user));
  const {register,handleSubmit} = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (data) => { 
    dispatch(login(data))
  }
  
  useEffect(() => {
    if(users.isLoggedIn){
      setTimeout(() => {
        navigate('/')
      },1000)
    }
  },[users.isLoggedIn])
    return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Register</h2>
          <form className="col-md-6 mx-auto" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
               {...register("email")}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      );
}

export default Login
