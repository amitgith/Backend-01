import React from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, errors, loginSubmit, navigate } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <LogIn className="h-6 w-6 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(loginSubmit)} className="space-y-5">
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
                      : "border-slate-300 focus:border-green-500 focus:ring-green-100"
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
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-green-500 focus:ring-green-100"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">Don't have an account?</p>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="mt-2 cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 transition hover:text-green-700"
            >
              <UserPlus className="h-4 w-4" />
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
