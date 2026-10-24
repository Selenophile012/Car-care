
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const services = [
  {
    id: "engine-service",
    name: "Engine Service",
    category: "Maintenance",
    price: 2500,
    duration: "2–3 hours",
    icon: "⚙️",
    description:
      "Engine inspection and maintenance to help keep your vehicle running smoothly.",
    includes: [
      "Visual engine inspection",
      "Fluid level checks",
      "Basic engine condition assessment",
      "Maintenance recommendations",
    ],
  },
  {
    id: "oil-change",
    name: "Oil Change",
    category: "Routine Care",
    price: 1200,
    duration: "30–45 minutes",
    icon: "🛢️",
    description:
      "Replace old engine oil and maintain proper lubrication for your vehicle.",
    includes: [
      "Drain old engine oil",
      "Replace engine oil",
      "Inspect the oil filter",
      "Check for visible oil leaks",
    ],
  },
  {
    id: "brake-inspection",
    name: "Brake Inspection",
    category: "Safety",
    price: 800,
    duration: "30–60 minutes",
    icon: "🛞",
    description:
      "Inspect brake components and identify potential braking system problems.",
    includes: [
      "Visual brake component inspection",
      "Brake pad condition check",
      "Basic brake fluid check",
      "Inspection findings and recommendations",
    ],
  },
  {
    id: "tire-service",
    name: "Tire Service",
    category: "Maintenance",
    price: 1000,
    duration: "45–60 minutes",
    icon: "🚘",
    description:
      "Check tire condition, pressure, and visible tread wear.",
    includes: [
      "Tire condition inspection",
      "Tire pressure check",
      "Visible tread wear assessment",
      "Maintenance recommendations",
    ],
  },
  {
    id: "battery-check",
    name: "Battery Check",
    category: "Electrical",
    price: 500,
    duration: "20–30 minutes",
    icon: "🔋",
    description:
      "Check battery condition and charging performance.",
    includes: [
      "Battery condition inspection",
      "Terminal inspection",
      "Basic charging system check",
      "Battery maintenance recommendations",
    ],
  },
  {
    id: "car-diagnostics",
    name: "Car Diagnostics",
    category: "Inspection",
    price: 1800,
    duration: "1 hour",
    icon: "🔍",
    description:
      "Identify potential vehicle problems through a general diagnostic inspection.",
    includes: [
      "Initial vehicle assessment",
      "Diagnostic scan where supported",
      "Review of detected fault codes",
      "Recommended next steps",
    ],
  },
];

type ServicePageProps = {
  params: Promise<{ id: string }>;
};

function ServiceLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="mt-8 h-64 rounded-3xl bg-slate-200" />
        <div className="mt-6 h-8 w-64 rounded bg-slate-200" />
        <div className="mt-4 h-24 rounded-xl bg-slate-200" />
      </div>
    </main>
  );
}

async function ServiceContent({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find((item) => item.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            CarCare
          </Link>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link href="/services" className="hover:text-blue-700">
              All Services
            </Link>
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/services"
          className="font-medium text-blue-700 hover:underline"
        >
          ← Back to services
        </Link>

        <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-900 px-8 py-10 text-white sm:px-12 sm:py-14">
            <p className="font-semibold uppercase tracking-widest text-blue-300">
              {service.category}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
              <h1 className="text-4xl font-bold sm:text-5xl">
                {service.name}
              </h1>
              <span className="text-6xl" aria-hidden="true">
                {service.icon}
              </span>
            </div>

            <p className="mt-5 max-w-2xl leading-7 text-slate-300">
              {service.description}
            </p>
          </div>

          <div className="grid gap-10 p-8 sm:p-12 md:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-2xl font-bold">
                What this service includes
              </h2>

              <ul className="mt-6 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-bold text-blue-700" aria-hidden="true">
                      ✓
                    </span>
                    <span className="leading-7 text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-xl bg-blue-50 p-5">
                <h2 className="font-bold">Please note</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Prices and durations are illustrative estimates for this
                  project. Final costs and completion times depend on your
                  vehicle and the work required.
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold">Service Summary</h2>

              <p className="mt-6 text-sm text-slate-500">Estimated price</p>
              <p className="mt-1 text-3xl font-bold text-blue-700">
                ETB {service.price.toLocaleString("en-US")}
              </p>

              <p className="mt-6 text-sm text-slate-500">
                Estimated duration
              </p>
              <p className="mt-1 font-semibold">{service.duration}</p>

              <Link
                href={`/booking?service=${service.id}`}
                className="mt-8 block rounded-lg bg-blue-700 px-5 py-3 text-center font-semibold text-white hover:bg-blue-800"
              >
                Book This Service
              </Link>

              <Link
                href="/services"
                className="mt-3 block rounded-lg border border-slate-300 px-5 py-3 text-center font-semibold hover:bg-slate-50"
              >
                Explore Other Services
              </Link>
            </aside>
          </div>
        </article>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
        © 2026 CarCare. Built for better vehicle care.
      </footer>
    </main>
  );
}

export default function ServiceDetailsPage({ params }: ServicePageProps) {
  return (
    <Suspense fallback={<ServiceLoading />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}
