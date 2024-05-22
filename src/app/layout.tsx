import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Recuisine Lafonte",
  description: "Recuisine Lafonte Webpage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-7xl mx-auto border p-4">
          <AppProvider>
            <Toaster/>
            <Header />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
