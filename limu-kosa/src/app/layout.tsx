import type { Metadata } from "next";
import "./globals.css"; 
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from '@/components/common/PageTransition';

export const metadata: Metadata = {
  title: "Limu Kosa Woreda - Official Portal",
  description: "Welcome to the official public portal of Limu Kosa Woreda Administration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#F8F6F1] text-[#2C2C2C] antialiased">
        <Navbar />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}