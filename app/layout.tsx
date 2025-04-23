import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BackButton } from "@/components/back-button";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Puzzle Games Collection",
  description: "A collection of mind-bending puzzles and games",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLandingPage = pathname === "/";

  return (
    <html lang="en" className={cn("select-none", GeistSans.variable, GeistMono.variable)}>
      <body className={cn(
        "min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 bg-fixed",
        "font-sans antialiased tracking-tight",
      )}>
        <div className="relative flex min-h-screen flex-col">
          {/* Logo */}
          <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 z-50">
            <Image
              src="/logo.png"
              alt="Noddy's Fruit Box Logo"
              width={128}
              height={128}
              className="rounded-full shadow-lg"
            />
          </div>
          {!isLandingPage && <BackButton />}
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
