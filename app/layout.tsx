import "./globals.css";
import { ReactNode } from "react";


<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Orbitron:wght@700&display=swap" rel="stylesheet" />



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
