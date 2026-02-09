import type { Metadata } from "next";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const odysseySans = Space_Grotesk({
  variable: "--font-odyssey-sans",
  subsets: ["latin"],
});

const odysseyDisplay = DM_Serif_Display({
  variable: "--font-odyssey-display",
  subsets: ["latin"],
  weight: "400",
});

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
      <body
        className={`${odysseySans.variable} ${odysseyDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
