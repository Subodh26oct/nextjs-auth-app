import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextAuth App",
  description: "Authentication app using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
