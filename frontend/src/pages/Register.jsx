import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import Input from "../utils/Input";
import GoogleBtn from "../components/GoogleBtn";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Register = () => {
  const navigate = useNavigate()
  const { googleLogin } = useContext(AuthContext);
  const [spin, setSpin] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const trackFile = watch("file");
  useEffect(() => {
    if (trackFile?.length > 0) {
      setSpin(true);
    }
    console.log(trackFile);
  }, [trackFile]);

  const registerHandler = async (data) => {
    console.log(data);
  };

  const googleLoginHandler = async () => {
    try {
      const res = await googleLogin();
      console.log(res);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit(registerHandler)} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                message:
                  "Name can only contain letters, spaces, hyphens, or apostrophes",
              },
            })}
            error={errors?.fullName?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors?.email?.message}
          />

          <Input
            watch={watch}
            spin={spin}
            className=""
            label="Upload Photo"
            type="file"
            placeholder="Paste your photo URL"
            {...register("file", { required: "photo are required" })}
            error={errors?.file?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
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
            Register
          </Button>
        </form>
        <div className="space-y-5 pt-3">
          <GoogleBtn googleLoginHandler={googleLoginHandler} />

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
