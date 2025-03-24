import { ReactNode } from "react";
import "./global.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
