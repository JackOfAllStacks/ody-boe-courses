import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
