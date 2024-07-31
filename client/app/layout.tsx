import dotenv from "dotenv";
import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { UserProvider } from "./store/userContext";
import { ThemeProvider, QueryProvider } from "./providers";
import { SessionProvider } from "@/hooks/usePersistSession";

const inter = Inter({
  subsets: ["latin"],
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Taskflo - Rahul",
  description: "Task management - Crework labs assignment",
};

// Load environment variables
dotenv.config();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/creworks_logo.png" />
      </head>
      <body className={`${inter.className}`}>
        <QueryProvider>
          <UserProvider>
            <SessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <div className="min-h-[100vh] max-w-[100%]">
                  {children}
                </div>
              </ThemeProvider>
            </SessionProvider>
          </UserProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

export { barlow };
