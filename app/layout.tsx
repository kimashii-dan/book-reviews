import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Books reviews",
  description:
    "can we talk about political and economic state of the world right now??🤓",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      style={{ scrollbarGutter: "stable" }}
      className="scroll-smooth"
      lang="en"
    >
      <body
        className={`${openSans.className} antialiased w-full bg-[#0d0f15] text-[#e4e6eb] scroll-smooth`}
      >
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
