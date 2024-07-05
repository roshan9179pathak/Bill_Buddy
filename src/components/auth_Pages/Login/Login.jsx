import React, {useRef, useState} from "react";
import "./login.css";
import { Button, Input } from "../../index";
import { Link, json } from "react-router-dom";
import login_logo from "../../../assets/undraw_receipt_re_fre3.svg";
import { useForm } from "react-hook-form";
import authservices from "../../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../../store/authslice'

const Login = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [Errors,setErrors] = useState('')

  const onSubmit = async(data) => {
    setErrors('')
    try {
      const session = await authservices.authLogin(data)
    if(session){
      const userData = await authservices.getCurrentUser()
      localStorage.setItem('userId', JSON.stringify(userData.$id))
      localStorage.setItem('userData', JSON.stringify(userData))
      dispatch(login(userData))
      navigate(`/invoice/${userData.name}`)
    }
    } catch (error) {
      setErrors(error.message)
    }
  };

  return (
    <div className={`${"login-page"}`}>
      <div className={`${"login-svg-container"}`}>
        <img src={login_logo} alt="" className={`${"login-svg"}`} />
      </div>

<form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-component">
        <h3 className="login-wlcm">Hi There :)</h3>
        <p className="login-wlcm-message">
          To be connected, please login with your email & password
        </p>

        <div className="w-full flex flex-col items-center">
        <Input
          type="text"
          placeholder="Your Email goes here..."
          className={`${'email'} w-full`}
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Invalid Email",
            },
          })}
        />
        {errors.email && <p className="text-red-600 text-[12px]">{errors.email.message}</p>}
        <Input
          type="password"
          placeholder="Your password goes here..."
          className="password"
          {...register("password", {
            required: "Password is required"
          })}
        />
        {errors.password && <p className="text-red-600 text-[12px]">{errors.password.message}</p>}
    </div>
        <Button type="submit" className="login-button">
          Login Now
        </Button>

        <div className="signup-container mt-6">
          <p className="text-white signup">
            Don't have an account{" "}
            <Link to="/signup" className="text-[#6C63FF] cursor-pointer">
              Sign-up
            </Link>
          </p>
        </div>
        <p className="text-red-600 text-[15px] mt-6">{Errors}</p>
      </div>
      
    </form>
          
    </div>
  );
}

export default  Login;