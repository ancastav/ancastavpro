import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SecurityShield from "@/components/elite/SecurityShield";
import GoogleAnalytics from "@/components/elite/GoogleAnalytics";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ancastav.com'),
  alternates: {
    canonical: '/',
  },
  title: "Diseño Web Profesional en República Dominicana | ANCASTAV",
  description: "Diseño web profesional para MiPyMEs en Puerto Plata y toda República Dominicana. Creamos tu página web desde $249. Inmobiliarias, clínicas, negocios locales y más. ¡Cotiza gratis hoy!",
  keywords: "diseño web, puerto plata, república dominicana, mipymes, inmobiliarias, clínicas, seo, marketing digital, ancastav",
  authors: [{ name: "ANCASTAV" }],
  openGraph: {
    title: "Diseño Web Profesional en República Dominicana | ANCASTAV",
    description: "Diseño web profesional para MiPyMEs en Puerto Plata y toda República Dominicana. Creamos tu página web desde $249.",
    url: "https://ancastav.com",
    siteName: "ANCASTAV",
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño Web Profesional en República Dominicana | ANCASTAV",
    description: "Diseño web profesional para MiPyMEs en Puerto Plata y toda República Dominicana.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang = acceptLanguage.startsWith('en') ? 'en' : 'es';

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <meta name="impact-site-verification" {...({ value: "-398674695" } as any)} />
        {/* REEMPLAZAR EL VALOR DE ABAJO CON TU CÓDIGO DE GOOGLE SEARCH CONSOLE */}
        <meta name="google-site-verification" content="TU_CODIGO_AQUI" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J82GSK0CNB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J82GSK0CNB');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-poppins bg-white text-slate-900">
        <LanguageProvider>
          <SecurityShield />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
