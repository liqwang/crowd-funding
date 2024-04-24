import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import './global.css'
import EthProvider from '@/context/eth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crowd Funding ÐApp'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EthProvider>
          {/* https://daisyui.com/components/navbar */}
          {/* https://github.com/saadeghi/daisyui/discussions/2277 */}
          {/* https://tailwindcss.com/docs/border-width#individual-sides */}
          <div className="navbar bg-base-100 border-b-2 sticky top-0 z-50">
            <div className="navbar-start">
              <Link href="/" className="btn btn-ghost text-lg">
                <i className="icon-[tabler--archive] w-7 h-7"/>
                Projects
              </Link>
              <Link href="/new" className="btn btn-ghost text-lg">
                <i className="icon-[ic--round-plus] w-7 h-7"/>
                New
              </Link>
            </div>
            <div className="navbar-center">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <i className="icon-[tabler--search] w-6 h-6" />
              </label>
            </div>
            <div className="navbar-end">
              <Link href="/me" className="btn btn-ghost text-lg">
                <i className="icon-[charm--person] w-7 h-7"/>
                Home
              </Link>
            </div>
          </div>
          {/* https://tailwindcss.com/docs/margin */}
          <div className="flex justify-center my-8">
            {children}
          </div>
        </EthProvider>
      </body>
    </html>
  )
}
