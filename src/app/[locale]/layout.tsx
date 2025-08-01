import type { Metadata } from "next";
import "./globals.css";
import { Directions, Languages } from "@/components/constants/enum";
import { Locale } from "@/i18n.config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import getTrans from "@/lib/translation";
import { Alexandria } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MEIC | حلول متكاملة للبنية التحتية",
    template: "MEIC",
  },
  description:
    "شركة متخصصة في الحفر والمقاولات العامة وأنظمة التكييف والصيانة، نقدم خدماتنا بجودة عالية واحترافية تغطي جميع مناطق المملكة.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: " MEIC | حلول متكاملة للبنية التحتية",
    description:
      "خبرة واسعة في تنفيذ المشاريع من الحفر إلى التشغيل بجودة ومعايير عالمية.",
    url: "https://example.com",
    siteName: "اسم شركتك",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MEIC",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: " MEIC | خدمات المقاولات والحفر",
    description: "نقدّم حلول تشغيل وصيانة شاملة للمشاريع الحكومية والخاصة.",
    images: ["/og-image.jpg"],
  },
};

// Root Layout
export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const isArabic = locale === Languages.ARABIC;
  const translations = await getTrans(locale);
  return (
    <html lang={locale} dir={isArabic ? Directions.RTL : Directions.LTR}>
      <body className={`${alexandria.variable} antialiased`}>
        <NextAuthSessionProvider>
          <Toaster position="top-center" richColors />
          <Header />
          {children}
          <Footer translation={translations} />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
