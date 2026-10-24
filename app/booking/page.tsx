"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, type UserSession } from "../../lib/auth";
import { saveBooking } from "../../lib/bookings";

const services = [
  "Oil Change",
  "Engine Diagnostics",
  "Brake Inspection",
  "Tire Replacement",
  "Battery Service",
  "Full Car Service",
];

export default function BookingPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    vehicle: "",
    plate: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace("/login?redirect=%2Fbooking");
      return;
    }

    setUser(currentUser);

    setForm((previous) => ({
      ...previous,
      name:
        "name" in currentUser && typeof currentUser.name === "string"
          ? currentUser.name
          : "",
    }));

    setLoading(false);
  }, [router]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!user?.email) {
      setError("Please sign in before booking a service.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.service ||
      !form.vehicle.trim() ||
      !form.plate.trim() ||
      !form.date ||
      !form.time
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    if (form.date < todayString) {
      setError("Please choose today or a future date.");
      return;
    }

    setSubmitting(true);

    try {
      saveBooking({
        name: form.name.trim(),
        email: user.email,
        phone: form.phone.trim(),
        service: form.service,
        vehicle: form.vehicle.trim(),
        plate: form.plate.trim(),
        date: form.date,
        time: form.time,
        notes: form.notes.trim(),
      });

      // Redirect to My Bookings and show the confirmation message.
      router.push("/my-bookings?booking=success");
    } catch {
      setError("We couldn't save your booking. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-10 text-center text-black">
        Loading booking form...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-black">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/services"
          className="mb-6 inline-block text-sm font-semibold text-black hover:underline"
        >
          ← Back to Services
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-black">
            AutoCare
          </p>

          <h1 className="mt-2 text-3xl font-bold text-black">
            Book a Service
          </h1>

          <p className="mt-2 text-black">
            Tell us about your vehicle and choose a convenient appointment.
          </p>

          <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-black">
            Signed in as: {user?.email}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="+251..."
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Choose Service *
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="vehicle"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Vehicle Make and Model *
                </label>
                <input
                  id="vehicle"
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Toyota Corolla"
                />
              </div>

              <div>
                <label
                  htmlFor="plate"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  License Plate *
                </label>
                <input
                  id="plate"
                  name="plate"
                  value={form.plate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Vehicle plate number"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Appointment Date *
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={(() => {
                    const today = new Date();
                    return [
                      today.getFullYear(),
                      String(today.getMonth() + 1).padStart(2, "0"),
                      String(today.getDate()).padStart(2, "0"),
                    ].join("-");
                  })()}
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Appointment Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Describe any issues with your vehicle..."
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-black"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving Booking..." : "Confirm Booking"}
            </button>

            <p className="text-center text-sm text-black">
              You can view your appointments after booking.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}