import type { Metadata } from "next";
import { APP_VERSION } from "@/lib/version";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odyssey Multi-Modal Course Generator",
  description:
    "A bold MVP experience for multi-modal learning: study guides, quizzes, flashcards, and audio-first lessons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div className="pointer-events-none fixed bottom-3 right-3 z-50 rounded-pill border border-odyssey-gray-light bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-odyssey-gray shadow-[0_8px_24px_rgba(17,17,17,0.08)]">
          {APP_VERSION}
        </div>
      </body>
    </html>
  );
}
