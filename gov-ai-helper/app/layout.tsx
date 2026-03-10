import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { CountryProvider } from "./context/CountryContext";
import { ChatProvider } from "./context/ChatContext";
import Header from "./components/Header";
import CountryConfirmation from "./components/CountryConfirmation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inclusive Citizen AI",
  description: "Understand government services easily - Multilingual AI Assistant for ASEAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CountryProvider>
          <LanguageProvider>
            <ChatProvider>
              <CountryConfirmation />
              <Header />
              {children}
            </ChatProvider>
          </LanguageProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
