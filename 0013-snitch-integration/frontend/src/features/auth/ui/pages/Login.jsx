import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, reset, errors, loginSubmit, navigate } =
    useAuth();
  return (
    <div className="flex flex-col gap-3 p-2">
      <h1 className="text-xl font-bold">User login</h1>
      <form
        onSubmit={handleSubmit(loginSubmit)}
        className="w-90 flex flex-col gap-5"
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          className="border border-black rounded p-2"
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("password", { required: "Password is required" })}
          className="border border-black rounded p-2"
          type="password"
          placeholder="Enter Your Password"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button className="bg-green-500 rounded text-white cursor-pointer p-2">
          LoginIn
        </button>
        <p>
          Don't have an account{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-red-600 cursor-pointer"
          >
            Register
          </button>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
