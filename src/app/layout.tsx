import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Rotinapp",
  description: "Rotinas diárias compartilhadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
