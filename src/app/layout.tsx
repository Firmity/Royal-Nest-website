import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ClientRoot from "./ClientRoot";
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

const GTM_ID = "GTM-53WBJ5WN";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GTM — fires after hydration, does not block render */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM noscript fallback — must be first child of <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ClientRoot>{children}</ClientRoot>

        {/* WhatsApp Widget Script — uncomment to enable */}
           {/* WhatsApp Widget Script */}
        {/* Use next/script for proper client-side loading */}
        {/* <script
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
        /> */}
      </body>
    </html>
  );
}