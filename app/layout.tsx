import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google'
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext'

const nunitoSans = Nunito_Sans({ variable: '--font-sans', subsets: ['latin'] })
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nolly Components',
  description: 'A collection of reusable components for building modern web applications.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${nunitoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
