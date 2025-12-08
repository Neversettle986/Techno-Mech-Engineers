import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/Chatbot";
import LenisScroller from "@/components/LenisScroller";
import ClickSpark from "@/components/ClickSpark";
import FallBeamBackground from "@/components/FallBeamBackground";
import PageTransition from "@/components/PageTransition";

import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://technomechengineers.in'),
    title: {
        default: "Techno Mech Engineers",
        template: "%s | Techno Mech Engineers"
    },
    description: "Precision Engineering Solutions",
    openGraph: {
        title: "Techno Mech Engineers",
        description: "Precision Engineering Solutions",
        url: 'https://technomechengineers.in',
        siteName: 'Techno Mech Engineers',
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: '/assets/logo.jpg',
        apple: '/assets/logo.jpg',
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Tag Manager - Script 1 */}
                <Script
                    id="google-tag-manager"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-P5DW878B');
                        `,
                    }}
                />

                {/* Google Analytics (ga4) - Script 1 */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-C0G030GDX0"
                    strategy="afterInteractive"
                />

                {/* Google Analytics (ga4) - Script 2 */}
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-C0G030GDX0');
                        `,
                    }}
                />
            </head>
            <body className={inter.className} suppressHydrationWarning>
                {/* Google Tag Manager (noscript) - Script 2 */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-P5DW878B"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>

                <FallBeamBackground lineCount={15} beamColorClass="red-500" className="fixed inset-0 z-[50] opacity-20 pointer-events-none" />
                <LenisScroller>
                    <ClickSpark sparkColor="#DC143C" sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
                        <div className="min-h-screen bg-transparent flex flex-col relative z-10">
                            <Navbar />
                            <div className="flex-grow">
                                <PageTransition>
                                    {children}
                                </PageTransition>
                            </div>
                            <Footer />
                            <Toaster />
                            <Chatbot />
                        </div>
                    </ClickSpark>
                </LenisScroller>
            </body>
        </html>
    );
}
