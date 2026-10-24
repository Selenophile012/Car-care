
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, type UserSession } from "../../lib/auth";
import {
  getBookings,
  deleteBooking,
  type Booking,
} from "../../lib/bookings";

export default function MyBookingsPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserSession | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false);

  // Load bookings belonging to the signed-in customer.
  const loadBookings = useCallback(() => {
    const currentUser = getCurrentUser();

    if (!currentUser?.email) {
      router.replace("/login?redirect=%2Fmy-bookings");
      return;
    }

    setUser(currentUser);
    setBookings(getBookings());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadBookings();

    window.addEventListener("storage", loadBookings);
    window.addEventListener("auth-change", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
      window.removeEventListener("auth-change", loadBookings);
    };
  }, [loadBookings]);

  // Read the booking confirmation from the browser URL.
  // This avoids the useSearchParams prerendering error.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setConfirmation(params.get("booking") === "success");
  }, []);

  // Delete a booking after customer confirmation.
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?",
    );

    if (!confirmed) return;

    try {
      deleteBooking(id);
      setBookings(getBookings());
    } catch {
      window.alert("Unable to delete this booking. Please sign in again.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-10 text-center text-black">
        Loading your bookings...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-black">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/my-account"
          className="text-sm font-semibold text-black hover:underline"
        >
          ← Back to My Account
        </Link>

        {/* Show confirmation after a successful booking submission. */}
        {confirmation && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-black"
          >
            <h2 className="text-lg font-bold">
              Booking Submitted Successfully!
            </h2>
            <p className="mt-1">
              Your booking was saved successfully. Review your appointment
              details below.
            </p>
          </div>
        )}

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-black">
            My Booking History
          </h1>
          <p className="mt-2 text-black">
            Bookings for {user?.email}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-xl font-bold text-black">
              No bookings yet
            </h2>

            <p className="mt-2 text-black">
              You haven't booked a service with this account yet.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-black">
                      {booking.service}
                    </h2>

                    <p className="mt-1 text-sm text-black">
                      Booking ID: {booking.id.slice(0, 8)}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-black">
                    Booked
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-black">
                  <p>
                    <strong>Customer:</strong> {booking.name}
                  </p>

                  <p>
                    <strong>Vehicle:</strong> {booking.vehicle}
                  </p>

                  <p>
                    <strong>License Plate:</strong> {booking.plate}
                  </p>

                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>

                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>

                  <p>
                    <strong>Time:</strong> {booking.time}
                  </p>

                  {booking.notes && (
                    <p>
                      <strong>Notes:</strong> {booking.notes}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(booking.id)}
                  className="mt-6 w-full rounded-lg border border-red-300 px-4 py-3 font-semibold text-red-700 hover:bg-red-50"
                >
                  Delete Booking
                </button>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Return to Home
          </Link>

          <Link
            href="/booking"
            className="inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Another Booking
          </Link>
        </div>
      </div>
    </main>
  );
}
