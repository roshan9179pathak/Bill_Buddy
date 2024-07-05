import React, { useState } from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../index";
import sign_up_logo from "../../../assets/signup.svg";
import authservices from "../../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authslice";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [Errors,setErrors] = useState('')

  const navigate = useNavigate();

  const signup = async (data) => {
    setErrors('')
    try {
      const userData = await authservices.createAccount(data);
      console.log(userData, `userData`);
      if (userData) {
        const userData = await authservices.getCurrentUser();
        if (userData) {
          localStorage.setItem('userId', JSON.stringify(userData.$id));
          localStorage.setItem('userData',JSON.stringify(userData))
          dispatch(login(userData));
          navigate(`/invoice/${userData.name}`);
        }
      }
    } catch (error) {
     setErrors(error.message)
    }
  };

  return (
    <div className={`${"login-page"}`}>
      <div className={`${"login-svg-container"}`}>
        <img src={sign_up_logo} alt="" className={`${"login-svg"}`} />
      </div>

      <form
        onSubmit={handleSubmit(signup)}
        className="flex flex-col justify-center"
      >
        <div className={`${"login-component"}`}>
          <Input
            type="text"
            placeholder="Full Name"
            className={`${"email"}`}
            {...register("name", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value) ||
                  "Please add Full and Last Name, ex- Jane Doe",
              },
            })}
          />

          {errors.name && <p className="text-red-600">{errors.name.message}</p>}

          <Input
            type="text"
            placeholder="Your Email goes here..."
            className={`${"email"}`}
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email is invalid",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="You password goes here..."
            className={`${"password"}`}
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-[10px]">
              {errors.password.message}
            </p>
          )}
          <Button type="submit" className={`${"login-button"} signUpButton`}>
            Signup
          </Button>
        </div>
        <p className="text-red-600 text-[12px] text-center ">{Errors}</p>
      </form>
    </div>
  );
}
