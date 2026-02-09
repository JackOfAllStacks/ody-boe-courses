export default function Loading() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="h-56 animate-pulse rounded-card bg-white/70" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div className="h-64 animate-pulse rounded-card bg-white/70" />
          <div className="space-y-6">
            <div className="h-40 animate-pulse rounded-card bg-white/70" />
            <div className="h-40 animate-pulse rounded-card bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
