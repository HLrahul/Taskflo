import dotenv from "dotenv";
import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { SessionProvider } from "@/hooks/usePersistSession";
import { ThemeProvider, QueryProvider } from "./providers";
import { UserProvider } from "./store/userContext";

const inter = Inter({
  subsets: ["latin"],
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Taskflo - Rahul",
  description: "Todo app - Crework labs assignment",
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
                <div className="min-h-[100vh] max-w-[100%] m-auto">
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
