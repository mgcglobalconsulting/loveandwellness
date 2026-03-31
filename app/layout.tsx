import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Love & Wellness Coaching | Dr. Patricia George",
    template: "%s | Love & Wellness Coaching",
  },
  description:
    "Dr. Patricia George guides you toward the love, wholeness, and relationship you were born to experience. Life coaching for love, relationships, and total wellness.",
  keywords: [
    "love coaching",
    "relationship coaching",
    "wellness coaching",
    "Dr. Patricia George",
    "love and wellness",
    "relationship transformation",
    "VIP coaching",
  ],
  authors: [{ name: "Dr. Patricia George" }],
  creator: "Dr. Patricia George",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.loveandwellnesscoaching.com",
    siteName: "Love & Wellness Coaching",
    title: "Love & Wellness Coaching | Dr. Patricia George",
    description:
      "Transform your love life. Build the relationship you deserve. Guided by Dr. Patricia George.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Love & Wellness Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love & Wellness Coaching | Dr. Patricia George",
    description:
      "Transform your love life. Build the relationship you deserve.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logos/love-wellness-butterfly.jpeg",
    apple: "/images/logos/love-wellness-butterfly.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
