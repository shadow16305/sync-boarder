import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { MainNavigation } from "@/components/main-navigation/main-navigation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Sync Boarder",
  description: "Manage and communicate!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <MainNavigation />
        {children}
      </body>
    </html>
  );
}
