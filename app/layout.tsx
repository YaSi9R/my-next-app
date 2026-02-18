import type { Metadata } from "next";
import "./globals.css";
import FloatingContactBar from "@/components/FloatingContactBar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Tekmart India",
  description: "Your One Stop for All Your Needs",
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
