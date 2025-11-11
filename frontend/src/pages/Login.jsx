import React from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loginHandler = async (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "//Please enter a valid email address",
              },
            })}
            error={errors?.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
                message:
                  "Password must be at least 8 characters long include uppercase, lowercase, number, and special character",
              },
            })}
            error={errors?.password?.message}
          />

          <Button type="submit" className="w-full btn-info">
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
