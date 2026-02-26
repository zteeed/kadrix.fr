import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kadrix.fr"),
  title: "Kadrix - Agence d'intégration IA, cloud & développement web",
  description:
    "Intégration IA, infrastructures cloud et on-premise, développement web. Votre équipe tech pour accélérer vos projets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
