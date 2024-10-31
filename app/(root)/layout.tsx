import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import ToasterContext from "@/context/toaster-context";
import ReactQueryProvider from "@/lib/react-query-provider";
import { WorkspaceContextProvider } from "@/context/workspace-context";

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
      <body
        className={`${geistSans.variable} font-sans antialiased overflow-hidden`}
      >
        <ReactQueryProvider>
          <WorkspaceContextProvider>
            <ToasterContext />
            <MainNavigation />
            {children}
          </WorkspaceContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
