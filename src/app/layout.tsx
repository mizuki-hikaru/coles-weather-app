import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ServiceWorker from './components/ServiceWorker';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Basic Weather",
    description: "A basic weather app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#007bff" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta name="description" content="A simple weather app that shows current weather for a city." />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ServiceWorker />
                {children}
            </body>
        </html>
    );
}
