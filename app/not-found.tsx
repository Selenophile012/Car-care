
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <section className="w-full max-w-lg text-center">
        <p className="text-7xl font-bold text-blue-700">404</p>

        <h1 className="mt-6 text-3xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Sorry, we couldn't find the page you're looking for. It may have
          moved, or the address may be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Back to Home
          </Link>

          <Link
            href="/services"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100"
          >
            Browse Services
          </Link>
        </div>
      </section>
    </main>
  );
}
