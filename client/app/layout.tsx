import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
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
      </body>
    </html>
  );
}

export { barlow };