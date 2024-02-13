import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AuthContextProvider } from "../context/AuthContext";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Cinephile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <html lang="en" className="dark">
        <body>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </AuthContextProvider>
  );
}
