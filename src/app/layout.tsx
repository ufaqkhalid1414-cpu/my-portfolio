import type { Metadata } from 'next'
import { Great_Vibes, Oswald, Outfit } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Navbar } from '@/components/site/Navbar'
import { ScrollToHash } from '@/components/site/ScrollToHash'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600'],
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['500', '600', '700'],
})

const script = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Ufaq Khalid, software and web developer',
  description:
    'Portfolio of Ufaq Khalid, a third-year BSCS student building database systems, specified platforms, and applied DSA projects.',
  openGraph: {
    title: 'Ufaq Khalid',
    description:
      'Database systems, specified platforms, and applied DSA. Third-year BSCS, Gujranwala.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Ufaq Khalid' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ufaq Khalid',
    description:
      'Database systems, specified platforms, and applied DSA. Third-year BSCS, Gujranwala.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${oswald.variable} ${script.variable} font-sans antialiased`}
      >
        <Navbar />
        <ScrollToHash />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
