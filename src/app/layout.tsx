import type { Metadata } from "next";
import { Mulish, Geist_Mono, Baloo_2 } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OrlandoCafes — Best Cafes in Central Florida",
    template: "%s | OrlandoCafes",
  },
  description:
    "Discover the best cafes in Orlando, Winter Park, Kissimmee, and Central Florida. Personally visited, honestly reviewed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", mulish.variable, baloo.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
