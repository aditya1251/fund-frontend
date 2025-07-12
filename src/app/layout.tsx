"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import TokenSync from "@/components/TokenSync";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define a CSS variable for Inter
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'], // Adjust weights as needed
  subsets: ['latin'],
  variable: '--font-space-grotesk', // Define a CSS variable for Space Grotesk
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable}`}
      >
        <SessionProvider>
          <Provider store={store}>
            <TokenSync />
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
