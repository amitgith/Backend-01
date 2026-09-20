import React from "react";
import { User, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    registerSubmit,
    navigate,
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
              <UserPlus className="h-6 w-6 text-sky-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Register to get started with your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(registerSubmit)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters are required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum 20 characters are allowed",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name should contain only letters",
                    },
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                />
              </div>

              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  placeholder="Create a password"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
            >
              <UserPlus className="h-4 w-4" />
              Create Account
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-2 inline-flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-sky-600 transition hover:text-sky-700"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

