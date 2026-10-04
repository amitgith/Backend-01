import React from "react";
import { useAuth } from "../../hooks/useAuth";
const Login = () => {
  const { register, handleSubmit, errors, loginSubmit, navigate } = useAuth();
  return (
    <div>
      <h1 className="text-xl font-bold p-2">Register Page</h1>
      <form
        onSubmit={handleSubmit(loginSubmit)}
        className="w-90 flex flex-col gap-2 p-2"
      >
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
        <button className="bg-green-600 p-2 text-white rounded cursor-pointer">
          Login
        </button>
      </form>
      <p className="text-xl p-2">
        Don't have an account !
        <button className="cursor-pointer" onClick={() => navigate("register")}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
