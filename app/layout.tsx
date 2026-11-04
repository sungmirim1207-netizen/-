import React from "react";

export const metadata = {
  title: "keepin-cool",
  description: "B2P Smart Frozen Slot Sharing & AI Hygiene Verification Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}