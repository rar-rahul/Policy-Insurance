import React, { useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {signUp} from '../reducer/userSlice'
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

const initialFormData = {
    name: '',
    email: '',
    password: '',
  };

const Register = () => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

   const{register,handleSubmit,formState: { errors },} = useForm();
   
    const handleSignup = (data) => { 
      console.log(data)
        setIsSubmitting(true)
    let genToken = 'token' + Math.random().toString(24).substring(2) + Date.now().toString(24);
    let updatedUser = { ...data, token: genToken };
        dispatch(signUp(updatedUser))
        setIsSubmitting(false)
        setSuccessMessage("You have registered Successfully")
        setTimeout(() => {
          navigate('/login')
        },2000)
    }

    return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Register</h2>
          {successMessage && (
          <div className="text-center text-success">{successMessage}</div>
        )}
          <form className="col-md-6 mx-auto" onSubmit={handleSubmit(handleSignup)}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
               {...register("name")}
                placeholder="Enter your name"
                aria-invalid={errors.name ? "true" : "false"}
                
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email",{ required: true })}
                placeholder="Enter your email"
              />
             <> {errors.email && <span>This field is required</span>}</>
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
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      );
}

export default Register
