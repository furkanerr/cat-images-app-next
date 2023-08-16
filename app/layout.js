
import './globals.css'
import { Inter } from 'next/font/google'

import Nav from '@/components/navbar/nav'
const inter = Inter({ subsets: ['latin'] })
 import { GlobalContextProvider } from './context/store';




export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      
      <body className={inter.className}>
        
        <GlobalContextProvider>
        <Nav/>
          {children}</GlobalContextProvider>
        </body>
    </html>
  )
}
