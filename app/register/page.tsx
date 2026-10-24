"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { safeRedirectPath } from "@/lib/redirect";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [redirectQuery, setRedirectQuery] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("redirect");
    if (requested) setRedirectQuery(`?redirect=${encodeURIComponent(safeRedirectPath(requested, "/"))}`);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      return;
    }

    const result = registerUser(name, email, password);

    setMessage(result.message);
    setIsError(!result.success);

    if (result.success) {
      const params = new URLSearchParams(window.location.search);
      router.push(safeRedirectPath(params.get("redirect"), "/"));
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-5 py-10 text-slate-900">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-white"
          >
            CarCare<span className="text-blue-200">.</span>
          </Link>

          <div className="mt-8">
            <div className="mb-5 h-1 w-12 rounded-full bg-blue-200" />

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Join CarCare to manage your vehicle maintenance and service
              appointments in one place.
            </p>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-9">
          <h2 className="text-xl font-bold text-slate-900">
            Get started with CarCare
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter your details to create your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Enter your password again"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {message && (
              <div
                role="status"
                className={`rounded-lg border px-4 py-3 text-sm ${
                  isError
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-blue-200 bg-blue-50 text-blue-800"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-4 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href={`/login${redirectQuery}`}
              className="font-semibold text-blue-700 hover:text-blue-900 hover:underline"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-700"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}