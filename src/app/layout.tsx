import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Your Name - Product Manager',
    template: '%s | Your Name'
  },
  description: 'Product Manager with expertise in building user-centric products that drive business growth. Specializing in product strategy, user research, and cross-functional collaboration.',
  keywords: ['Product Manager', 'Product Strategy', 'User Research', 'Product Development', 'UX Design', 'Agile'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Your Name - Product Manager',
    description: 'Product Manager with expertise in building user-centric products that drive business growth.',
    siteName: 'Your Name - Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Product Manager',
    description: 'Product Manager with expertise in building user-centric products that drive business growth.',
    creator: '@yourtwitter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
