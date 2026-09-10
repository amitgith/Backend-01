import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSububmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form
        onClick={handleSubmit(registerSububmit)}
        className="w-90 flex flex-col gap-2"
      >
        <label className="font-bold text-xl">Enter Your Name</label>
        <input
          {...register("name", {
            required: "name is required",
            minLength: {
              value: 3,
              message: "name must be at least 3 characters",
            },
            maxLength: {
              value: 10,
              message: "name must be at least 10 characters",
            },
          })}
          className="border border-black rounded p-2"
          type="text"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label className="font-bold text-xl">Enter Your Email</label>
        <input
          className="border border-black rounded p-2"
          {...register("email", { required: "email is required" })}
          type="email"
          placeholder="john@gmail.com"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label className="font-bold text-xl">Enter Your Password</label>
        <input
          className="border border-black rounded p-2"
          {...register("password", { required: "password is required" })}
          type="text"
          placeholder="*******"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button className="bg-green-600 rounded p-2 text-white cursor-pointer">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
