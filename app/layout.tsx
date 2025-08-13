"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable} bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <Providers>
        <ThemeProvider 
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="elearning-theme"
          enableColorScheme={true}
        >
          {children}
          <Toaster position='top-center' reverseOrder={false} />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
