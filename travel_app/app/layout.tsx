import type { Metadata } from 'next'

import './globals.css'
import Navbar from '';
import Footer from './@component';





export const metadata: Metadata = {
  title: 'Travel',
  description: 'Travel Website for Camping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        
      <Footer />
        </body>
    </html>
  )
}
