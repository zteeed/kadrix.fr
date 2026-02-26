import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = "https://www.kadrix.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Kadrix - Agence d'intégration IA, cloud & développement web",
  description:
    "Intégration IA, infrastructures cloud et on-premise, développement web. Votre équipe tech pour accélérer vos projets.",
  keywords: ["intégration IA", "agence cloud", "développement web", "Kadrix", "infrastructure", "automatisation"],
  authors: [{ name: "Kadrix", url: BASE_URL }],
  creator: "Kadrix",
  publisher: "Kadrix",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Kadrix",
    locale: "fr_FR",
    alternateLocale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kadrix",
  url: BASE_URL,
  description:
    "Agence d'intégration IA, infrastructures cloud et on-premise, développement web. Votre équipe tech pour accélérer vos projets.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@kadrix.fr",
    availableLanguage: ["French", "English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
