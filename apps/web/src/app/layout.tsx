import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Starlight Knowledge Tree",
  description:
    "An open intelligence graph for human capability, scientific knowledge, and contribution paths.",
  openGraph: {
    title: "Starlight Knowledge Tree",
    description:
      "An open intelligence graph for human capability, scientific knowledge, and contribution paths.",
    url: "https://starlightintelligence.org/knowledge-tree",
    siteName: "Starlight Knowledge Tree",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-900 text-white antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
