import { useEffect } from "react";
import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { AuthForm } from "./AuthForm.jsx";
import { BrandPanel } from "./BrandPanel.jsx";

function SignedInPanel({ user, onSignOut, isLoading }) {
  return (
    <div className="w-full max-w-[390px] text-center">
      <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-subtle text-accent">
        <Sparkles size={24} />
      </div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-accent">
        You&apos;re all set
      </p>
      <h2 className="text-[32px] font-semibold tracking-[-0.055em] text-ink">
        Welcome, {user.name.split(" ")[0]}.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Signed in as <span className="font-medium text-ink">{user.email}</span>
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Your Downbot account is ready.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        disabled={isLoading}
        className="mx-auto mt-8 inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-medium text-ink transition hover:border-border-hover hover:bg-surface-hover disabled:opacity-60"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}

export function AuthPage({ mode }) {
  const { user, status, initialized, restore, signOut } = useAuth();

  useEffect(() => {
    if (!initialized) restore();
  }, [initialized, restore]);

  return (
    <main className="min-h-screen bg-canvas px-4 py-5 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1320px] grid-cols-1 overflow-hidden rounded-[30px] bg-surface shadow-panel lg:min-h-[min(820px,calc(100vh-80px))] lg:grid-cols-[1.05fr_0.95fr]">
        <BrandPanel />
        <section className="flex min-h-[650px] flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-10 xl:px-16">
          {user ? (
            <SignedInPanel
              user={user}
              onSignOut={signOut}
              isLoading={status === "loading"}
            />
          ) : initialized ? (
            <AuthForm mode={mode} />
          ) : (
            <div className="flex items-center gap-3 text-sm text-muted" role="status">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
              Preparing your space…
            </div>
          )}
        </section>
      </div>
      <footer className="mx-auto flex max-w-[1320px] items-center justify-between px-1 pt-5 text-[11px] text-muted/80">
        <span>© {new Date().getFullYear()} Downbot</span>
        <span>Made for clearer thinking</span>
      </footer>
    </main>
  );
}
