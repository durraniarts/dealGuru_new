import type { Metadata } from "next";
import "./globals.css";
import { Wrapper } from "@/context/contextApi";

export const metadata: Metadata = {
  title: "Dealguru",
  description:"Make your own deal with Dealguru app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-slate-200">
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
