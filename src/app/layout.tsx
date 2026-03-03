import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$GNOMES — THEY WERE NEVER MYTHS",
  description: "WHY IS NO ONE TALKING ABOUT THIS? The evidence is overwhelming. $GNOMES.",
  icons: {
    icon: "/schizo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gnome-dark text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
