import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import '../index.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'Ufaq Khalid — Software / Web Developer',
  description:
    'Portfolio of Ufaq Khalid, an aspiring software and web developer based in Gujranwala, Pakistan.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  )
}
