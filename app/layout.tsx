import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreightCore Logistics | Freight Intelligence in Motion",
  description:
    "Connected road, ocean and control-tower logistics for modern freight teams.",
  icons: {
    icon: "/favicon-new.svg",
    shortcut: "/favicon-new.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
