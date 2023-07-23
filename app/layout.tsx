import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Provider from './components/Provider'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

export const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
 })

export const metadata: Metadata = {
  title: 'Tweet-it',
  description: 'Twitter who!?',
  keywords:'twitter, twitter-clone, twitter-alternative, tweet, tweet-it, tweetit',
  viewport:"initial-scale=1.0, width=device-width"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${roboto.variable} flex flex-col items-center bg-gray-300 mx-8 min-h-screen lg:mx-80`}>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  )
}
