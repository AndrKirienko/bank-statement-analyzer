import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bank Statement Analyzer",
  description: "Simple and secure tool for analyzing bank statements and financial transactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
