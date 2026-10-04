import React from "react";
import { useAuth } from "../../hooks/useAuth";
const Register = () => {
  const { register, handleSubmit, reset, errors, registerSubmit, navigate } =
    useAuth();
  return (
    <div>
      <h1 className="text-xl font-bold p-2">Register Page</h1>
      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-90 flex flex-col gap-3 p-2"
      >
        <input
          className="border border-black p-2 rounded"
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
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        <input
          {...register("email", { required: "Email is required" })}
          className="border border-black p-2 rounded"
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters are required",
            },
          })}
          className="border border-black p-2 rounded"
          type="password"
          placeholder="Enter Your Password"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button className="bg-sky-600 p-2 text-white rounded cursor-pointer">
          Create
        </button>
      </form>
      <p className="text-xl p-2">
        Already have an account !
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
