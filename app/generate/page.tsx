import { Suspense } from "react";
import GenerateClient from "@/app/generate/GenerateClient";

const GeneratePage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ef_0%,#f8f4ef_55%,#f2eee8_100%)]">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="h-10 w-48 animate-pulse rounded-pill bg-white/70" />
            <div className="mt-6 h-12 w-3/4 animate-pulse rounded-3xl bg-white/70" />
            <div className="mt-8 space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-12 animate-pulse rounded-2xl bg-white/70"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <GenerateClient />
    </Suspense>
  );
};

export default GeneratePage;
