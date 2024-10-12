import localFont from "next/font/local";
import "../globals.css";
import { cn } from "@/lib/utils";
import ToasterContext from "@/context/toaster-context";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata = {
  title: "SyncBoarder authentication",
  description: "authentication page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", geistSans.variable)}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
