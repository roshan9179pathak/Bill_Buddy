import React from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../index";
import sign_up_logo from "../../../assets/signup.svg";
export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    console.log(data);
    console.log(`This is the data from react hook form`);
  };

  return (
    <div className={`${"login-page"}`}>
      <div className={`${"login-svg-container"}`}>
        <img src={sign_up_logo} alt="" className={`${"login-svg"}`} />
      </div>

      <form onSubmit={handleSubmit(signup)} className="flex flex-col justify-center">
        <div className={`${"login-component"}`}>
         

          <Input
            type="text"
            placeholder="Full Name"
            className={`${"email"}`}
            {...register("name", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email is invalid",
              },
            })}
          />

          <Input
            type="number"
            placeholder="+910123456789"
            className={`${"email"}`}
            {...register("number", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email is invalid",
              },
            })}
          />

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
          <Input
            type="password"
            placeholder="You password goes here..."
            className={`${"password"}`}
            {...register("email", {
              required: true,
            })}
          />

          <Button type="submit" className={`${"login-button"}`}>
            Login Now
          </Button>
        </div>
      </form>
    </div>
  );
}
