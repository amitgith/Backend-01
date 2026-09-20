import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit, reset, errors, userRegister } = useAuth();
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="text-xl font-bold">User registered form</h1>
      <form
        onSubmit={handleSubmit(userRegister)}
        className="w-90 flex flex-col gap-4"
      >
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters are required",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters are required",
            },
          })}
          className="border border-black rounded p-2"
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
        <button className="bg-sky-600 rounded text-white p-2 cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
