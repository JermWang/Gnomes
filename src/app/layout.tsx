import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$GNOMES — They Were Never Myths",
  description: "The evidence is overwhelming. They're real. They're here. $GNOMES",
  icons: {
    icon: "/schizo.png",
  },
  openGraph: {
    title: "$GNOMES — They Were Never Myths",
    description: "The evidence is overwhelming. They're real. They're here.",
    images: ["/we found them.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$GNOMES — They Were Never Myths",
    description: "The evidence is overwhelming. They're real. They're here.",
    images: ["/we found them.png"],
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
