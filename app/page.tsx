"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, type UserSession } from "@/lib/auth";

const services = [
  {
    id: "engine-service",
    name: "Engine Service",
    description:
      "Professional engine maintenance to keep your vehicle running smoothly.",
    price: "2,500",
    icon: "⚙️",
  },
  {
    id: "oil-change",
    name: "Oil Change",
    description:
      "Keep your engine protected with routine oil and filter changes.",
    price: "1,200",
    icon: "🛢️",
  },
  {
    id: "brake-inspection",
    name: "Brake Inspection",
    description:
      "Check your braking system for safer and more confident driving.",
    price: "800",
    icon: "🛞",
  },
  {
    id: "tire-service",
    name: "Tire Service",
    description:
      "Get help with tire condition, maintenance, and replacement needs.",
    price: "1,000",
    icon: "🚗",
  },
  {
    id: "battery-check",
    name: "Battery Check",
    description:
      "Check your battery and charging system for reliable starting.",
    price: "500",
    icon: "🔋",
  },
  {
    id: "car-diagnostics",
    name: "Car Diagnostics",
    description:
      "Identify potential vehicle problems with a diagnostic inspection.",
    price: "1,800",
    icon: "🔍",
  },
];

export default function HomePage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
      setAuthLoaded(true);
    };

    updateUser();

    window.addEventListener("auth-change", updateUser);
    window.addEventListener("storage", updateUser);
    window.addEventListener("focus", updateUser);

    return () => {
      window.removeEventListener("auth-change", updateUser);
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("focus", updateUser);
    };
  }, []);

  const bookingHref = user ? "/booking" : "/login?redirect=%2Fbooking";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5"
        >
          <Link href="/" className="text-2xl font-bold text-blue-700">
            CarCare
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>

            <Link href="/services" className="hover:text-blue-700">
              Services
            </Link>

            <Link href="/my-bookings" className="hover:text-blue-700">
              My Bookings
            </Link>

            <Link href={bookingHref} className="hover:text-blue-700">
              Book a Service
            </Link>

            {authLoaded &&
              (user ? (
                <Link
                  href="/my-account"
                  className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
                >
                  My Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800"
                >
                  Login
                </Link>
              ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            {user && (
              <p className="mb-5 text-lg">
                <span className="font-semibold text-blue-700">
                  {user.action === "registered"
                    ? "Welcome, "
                    : "Welcome back, "}
                </span>
                <span className="font-semibold text-slate-900">
                  {user.name}
                </span>
              </p>
            )}

            <p className="font-semibold uppercase tracking-widest text-blue-700">
              Reliable vehicle care
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Keep your car running at its best.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Find the right maintenance service for your vehicle and request an
              appointment with CarCare.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Explore Services
              </Link>

              <Link
                href={bookingHref}
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100"
              >
                Book an Appointment
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              <div>
                <p className="text-2xl font-bold text-blue-700">6</p>
                <p className="mt-1 text-sm text-slate-600">Services</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-blue-700">Easy</p>
                <p className="mt-1 text-sm text-slate-600">Booking</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-blue-700">Realiable</p>
                <p className="mt-1 text-sm text-slate-600">Results</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-blue-700 p-8 text-white shadow-xl sm:p-12">
            <div className="text-6xl" aria-hidden="true">
              🚘
            </div>

            <h2 className="mt-8 text-3xl font-bold">
              Your car deserves better care.
            </h2>

            <p className="mt-4 leading-7 text-blue-100">
              Explore routine maintenance, safety inspections, and diagnostic
              services in one convenient place.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <p className="font-semibold">Start with the right service</p>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Review the available services, check the illustrative prices,
                and choose a preferred appointment time.
              </p>

              <Link
                href="/services"
                className="mt-5 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                View Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold uppercase tracking-widest text-blue-700">
              What we offer
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Explore Our Services
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Choose a service to learn more and start your booking request.
            </p>
          </div>

          <Link
            href="/services"
            className="font-semibold text-blue-700 hover:text-blue-900"
          >
            All services →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl"
                aria-hidden="true"
              >
                {service.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold">{service.name}</h3>

              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {service.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-xs text-slate-500">Estimated price</p>
                  <p className="mt-1 font-bold">ETB {service.price}</p>
                </div>

                <Link
                  href={`/services/${service.id}`}
                  className="rounded-lg border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-500">
          Prices shown are illustrative estimates and may differ from the final
          service quotation.
        </p>
      </section>

      {/* Booking Call to Action */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Ready to care for your car?
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Choose a service and submit your preferred appointment details
                  through our booking demo.
                </p>
              </div>

              <Link
                href={bookingHref}
                className="shrink-0 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-xl font-bold text-blue-700">
              CarCare
            </Link>

            <p className="mt-2 text-sm text-slate-500">
              A vehicle service and maintenance platform demo.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-medium">
            <Link href="/services" className="hover:text-blue-700">
              Services
            </Link>

            <Link href={bookingHref} className="hover:text-blue-700">
              Book Appointment
            </Link>

            <Link href="/my-bookings" className="hover:text-blue-700">
              My Bookings
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-100 py-4 text-center text-sm text-slate-500">
          © 2026 CarCare. Built for better vehicle care.
        </div>
      </footer>
    </main>
  );
}
