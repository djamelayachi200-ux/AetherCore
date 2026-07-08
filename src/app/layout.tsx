import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";
import SoundToggle from "@/components/SoundToggle";
import SettingsPanel from "@/components/SettingsPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aethrecore.vercel.app"),
  title: "AETHRECORE | Gaming Community",
  description: "العب. تنافس. تواصل. — WHERE LEGENDS COLLIDE: PLAY. COMPETE. CONNECT.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AETHRECORE | Gaming Community",
    description: "العب. تنافس. تواصل. — WHERE LEGENDS COLLIDE: PLAY. COMPETE. CONNECT.",
    siteName: "AETHRECORE",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AETHRECORE | Gaming Community",
    description: "العب. تنافس. تواصل. — WHERE LEGENDS COLLIDE: PLAY. COMPETE. CONNECT.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
    >
      <body className="min-h-screen bg-dark-900 text-text-primary overflow-x-hidden">
        <SoundProvider>
          {children}
          <SoundToggle />
          <SettingsPanel />
        </SoundProvider>
      </body>
    </html>
  );
}
