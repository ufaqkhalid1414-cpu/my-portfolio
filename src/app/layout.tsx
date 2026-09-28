import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorTrail } from "@/components/CursorTrail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GsapRefresh } from "@/components/GsapRefresh";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ufaq Khalid | Software Engineer · Full-Stack Builder",
  description:
    "Portfolio of Ufaq Khalid — clean systems, modern web apps, and considered software from coursework to shipped work.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('ufaq-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body min-h-full flex flex-col antialiased code-texture text-[var(--text)]">
        <ThemeProvider>
          <GsapRefresh />
          <CursorTrail />
          <ThemeToggle />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollProgress />
        </ThemeProvider>
      </body>
    </html>
  );
}
