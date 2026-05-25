import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "VietABank - Quan Hệ Nhà Đầu Tư",
    template: "%s | VietABank IR",
  },
  description:
    "Nền tảng Quan hệ Nhà đầu tư chính thức của VietABank - Ngân hàng Thương mại Cổ phần niêm yết HOSE. Báo cáo tài chính, công bố thông tin, ESG.",
  keywords: [
    "VietABank",
    "VAB",
    "quan hệ nhà đầu tư",
    "investor relations",
    "cổ phiếu VAB",
    "báo cáo tài chính",
    "ESG",
    "HOSE",
  ],
  authors: [{ name: "VietABank Investor Relations" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    url: "https://ir.vietabank.com.vn",
    siteName: "VietABank IR",
    title: "VietABank - Quan Hệ Nhà Đầu Tư",
    description:
      "Nền tảng Quan hệ Nhà đầu tư chính thức của VietABank. Cập nhật báo cáo tài chính, KPI, ESG và công bố thông tin theo quy định.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VietABank - Quan Hệ Nhà Đầu Tư",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23002d68' rx='8'/><text y='.9em' font-size='70' x='15' fill='white'>V</text></svg>",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VietABank",
  legalName: "Ngân hàng Thương mại Cổ phần VietABank",
  ticker: "VAB",
  exchange: "HOSE",
  url: "https://ir.vietabank.com.vn",
  description:
    "Ngân hàng thương mại cổ phần niêm yết tại HOSE. Cam kết tăng trưởng bền vững và minh bạch.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Investor Relations",
    email: "ir@vietabank.com.vn",
    telephone: "+84-24-1234-5678",
    availableLanguage: ["Vietnamese", "English"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1 page-enter">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
