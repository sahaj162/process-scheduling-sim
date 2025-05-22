import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "CPU Scheduling Algorithm Simulator",
  description:
    "Explore and simulate various CPU scheduling algorithms like Shortest Remaining Time First (SRTF), First Come First Serve (FCFS), and more. Perfect for learning and testing CPU scheduling concepts.",
  keywords: [
    "scheduling algorithm simulator",
    "SRTF",
    "FCFS",
    "CPU scheduling",
    "OS algorithms",
    "interactive simulator",
  ],
  openGraph: {
    title: "CPU Scheduling Algorithm Simulator",
    description:
      "Test and learn CPU scheduling algorithms like SRTF, FCFS, and others with this interactive simulator.",
    url: "https://scheduling-algorithm-simulator.vercel.app/",
    siteName: "Scheduling Algorithm Simulator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPU Scheduling Algorithm Simulator",
    description:
      "Simulate various CPU scheduling algorithms for learning and testing.",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="l7MqVL5_9AEbO8FaJpT-XLlxSLYCdbCoIrV0Y4G9IXw"
      />
      <body className={cn("antialiased min-h-screen", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
