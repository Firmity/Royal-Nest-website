import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ClientRoot from "./ClientRoot";
// Import Next.js Script component
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Nest Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientRoot>{children}</ClientRoot>

        {/* --- Google Analytics Tag Start --- */}
        {/* Load the gtag.js script asynchronously */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SLRHSX3WNF"
          strategy="afterInteractive"
        />
        {/* Initialize Google Analytics */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SLRHSX3WNF');
            `,
          }}
        />
        {/* --- Google Analytics Tag End --- */}

        {/* WhatsApp Widget Script */}
        {/* Use next/script for proper client-side loading */}
        {/* @ts-ignore */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function () {
        var url = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?35905';
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        var options = {
          "enabled":true,
          "chatButtonSetting":{
              "backgroundColor":"#00e785",
              "ctaText":"Chat with us",
              "borderRadius":"25",
              "marginLeft": "0",
              "marginRight": "20",
              "marginBottom": "20",
              "ctaIconWATI":false,
              "position":"right"
          },
          "brandSetting":{
              "brandName":"Royal Nest",
              "brandSubTitle":"undefined",
              "brandImg":"https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
              "welcomeText":"Hi there!\\nHow can I help you?",
              "messageText":"Hello, %0A I have a question about [https://www.royalnestgroup.com/](https://www.royalnestgroup.com/).",
              "backgroundColor":"#00e785",
              "ctaText":"Chat with us",
              "borderRadius":"25",
              "autoShow":false,
              "phoneNumber":"919289349995"
          }
        };
        s.onload = function() {
          if (typeof window.CreateWhatsappChatWidget === 'function') {
            window.CreateWhatsappChatWidget(options);
          }
        };
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      })();
    `,
          }}
        />
      </body>
    </html>
  );
}
