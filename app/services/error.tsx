
"use client";

export default function ServicesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
          Something went wrong
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          We couldn't load this section
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          An unexpected error occurred while opening our services. Please try
          again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Try Again
        </button>

        {error.digest && (
          <p className="mt-4 text-xs text-slate-500">
            Error reference: {error.digest}
          </p>
        )}
      </section>
    </main>
  );
}
