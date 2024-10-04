import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers/Provider";
import { QueryProviders } from "@/providers/QueryProvider";
import NavPanel from "@/components/navigation/NavPanel";

export const metadata: Metadata = {
  title: "Asexpert Assignment Helper App",
  description: "Build with passion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={`antialiased min-h-screen w-full relative  font-nunito  light `}
      >
        <QueryProviders>
          <Providers>
            <div className="absolute -left-3 top-[50%]">
              <NavPanel />
            </div>
            {children}
          </Providers>
        </QueryProviders>
      </body>
    </html>
  );
}
