import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { company, seo } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { MotionProvider } from "@/components/layout/motion-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// Decorative handwriting in the hero only; not preloaded.
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05030f",
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description: seo.description,
  email: company.email,
  telephone: company.phoneHref.replace("tel:", ""),
  knowsAbout: [
    "Software product engineering",
    "AI development",
    "SaaS development",
    "Web application development",
    "Mobile app development",
    "CRM and ERP systems",
    "Cloud and DevOps",
  ],
  sameAs: company.social.map((s) => s.href).filter(Boolean),
};

const themeScript = `try{var t=localStorage.getItem("sslc-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <div aria-hidden className="grain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
