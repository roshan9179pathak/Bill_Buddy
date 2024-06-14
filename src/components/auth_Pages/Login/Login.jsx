import React from "react";
import "./login.css";
import { Button, Input } from "../../index";
import { Link } from "react-router-dom";
import login_logo from "../../../assets/undraw_receipt_re_fre3.svg";
import { useForm } from "react-hook-form";
export default function Login() {
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    console.log(data);
    console.log(`This is the data from react hook form`);
  };

  return (
    <div className={`${"login-page"}`}>
      <div className={`${"login-svg-container"}`}>
        <img src={login_logo} alt="" className={`${"login-svg"}`} />
      </div>

      <div className={`${"login-component"}`}>
        <form onSubmit={handleSubmit(login)}>
          <h3 className="login-wlcm">Hi There :)</h3>
          <p className="login-wlcm-message">
            To be connected, please login with your email & password
          </p>
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
        </form>
      </div>

      <div className="signup-container">
        <p className="text-white">
          Don't have an account{" "}
          <Link to="/signup" className="text-[#6C63FF] cursor-pointer">
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
}
