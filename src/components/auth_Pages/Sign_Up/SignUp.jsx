import React from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../index";
import sign_up_logo from "../../../assets/signup.svg";
import authservices from "../../../appwrite/auth";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const navigate = useNavigate()

  const signup = async (data) => {
    
    try {
      const userData = await authservices.createAccount(data);
      console.log(userData,`userData`);
      if(userData){
        const currentUser = await authservices.getCurrentUser()
        if(currentUser){
          console.log(currentUser, `currentUser`);
          navigate('/invoice')
        }
      }
    } catch (error) {
      alert(error.message);
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
          <Button type="submit" className={`${"login-button"}`}>
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
}
