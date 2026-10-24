
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  logoutUser,
  type UserSession,
} from "../../lib/auth";

export default function MyAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace("/");
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    logoutUser();

    // Update components that listen for authentication changes.
    window.dispatchEvent(new Event("auth-change"));

    // Return to the homepage after logging out.
    window.location.replace("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="rounded-xl border border-blue-200 bg-white px-6 py-4 text-blue-700 shadow-sm">
          Loading your account...
        </p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          My Account
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your CarCare account details.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="font-semibold text-slate-900">
              {user.name}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Email Address</p>
            <p className="font-semibold text-slate-900">
              {user.email}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Account Status</p>
            <p className="font-semibold text-green-700">
              Active
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/my-bookings"
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            My Bookings
          </Link>

          <Link
            href="/booking"
            className="rounded-lg border border-blue-700 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Book a Service
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
