import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { FormField } from "./FormField.jsx";

export function AuthForm({ mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const { signIn, signUp, status, error, clearError } = useAuth();
  const isRegister = mode === "register";
  const isLoading = status === "loading";

  const update = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (error) clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = isRegister
      ? values
      : { email: values.email, password: values.password };
    try {
      if (isRegister) await signUp(credentials);
      else await signIn(credentials);
    } catch {
      // The rejected action is represented in the auth state and shown below.
    }
  };

  return (
    <div className="w-full max-w-[390px]">
      <div className="mb-8 flex items-center gap-2.5 lg:hidden">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-subtle text-accent">
          <Sparkles size={17} />
        </div>
        <span className="text-lg font-semibold tracking-[-0.04em] text-ink">downbot</span>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {isRegister ? "A fresh start" : "Welcome back"}
        </p>
        <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.055em] text-ink">
          {isRegister ? "Create your account" : "Sign in to Downbot"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {isRegister
            ? "A little space for your next big idea."
            : "Your space is ready when you are."}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {isRegister && (
          <FormField
            id="name"
            label="Your name"
            value={values.name}
            onChange={update("name")}
            placeholder="Alex Morgan"
            autoComplete="name"
          />
        )}
        <FormField
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={update("email")}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={update("password")}
          placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
          autoComplete={isRegister ? "new-password" : "current-password"}
          visible={showPassword}
          onToggleVisible={() => setShowPassword((current) => !current)}
        />

        {isRegister && (
          <p className="-mt-2 text-xs leading-5 text-muted">
            Use at least 8 characters, including a letter and a number.
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-danger-border bg-danger-surface px-4 py-3 text-sm leading-5 text-danger"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[51px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-white shadow-[0_6px_18px_rgba(56,123,97,0.18)] transition hover:bg-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              {isRegister ? "Creating your account…" : "Signing you in…"}
            </>
          ) : (
            <>
              {isRegister ? "Create account" : "Sign in"}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        {isRegister ? "Already have an account?" : "New to Downbot?"}{" "}
        <Link
          to={isRegister ? "/login" : "/register"}
          onClick={() => {
            setValues((current) => ({ ...current, name: "", password: "" }));
            clearError();
          }}
          className="font-medium text-accent transition hover:text-accent-dark"
        >
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>

      <p className="mt-8 text-center text-[11px] leading-5 text-muted/80">
        Your account is yours. Sign in securely whenever you need a little more
        space to think.
      </p>
    </div>
  );
}
