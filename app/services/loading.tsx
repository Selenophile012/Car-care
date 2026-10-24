
export default function ServicesLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-10 w-80 max-w-full rounded bg-slate-200" />
        <div className="mt-4 h-5 w-full max-w-xl rounded bg-slate-200" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="h-12 w-12 rounded-lg bg-slate-200" />
              <div className="mt-5 h-5 w-40 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-6 h-6 w-28 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
