import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import Navbar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Cinephile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
