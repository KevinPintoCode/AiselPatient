'use client'

import { Inter } from 'next/font/google'
import '../globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import Navbar from '@/components/common/Navbar'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main>
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
