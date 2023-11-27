import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/NextAuthProvider";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={DMSans.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
