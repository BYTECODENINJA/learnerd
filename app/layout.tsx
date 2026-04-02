import type { Metadata } from "next";
import {Almendra_SC, Lexend_Deca, Onest} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const Lexend = Lexend_Deca({
  variable:'--font-lexend-deca',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: "swap"
})

const Onestfont = Onest({
  variable: '--font-Onestfont',
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: "swap"
})

const AlmendraSC = Almendra_SC({
  variable: '--font-AlmendraSC',
  subsets: ["latin"],
  weight: '400',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "LearNerd",
  description: "Easier Book reading with AI aided reading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${Lexend.variable} ${Onestfont.variable} ${AlmendraSC.variable} relative font-sans antialiased`}
      >
        <body className="min-h-full flex flex-col">
            <Navbar/>
            {children}
        <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
