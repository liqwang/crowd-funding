import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import './scrollbar.css'

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
        {/* https://daisyui.com/components/navbar */}
        {/* https://github.com/saadeghi/daisyui/discussions/2277 */}
        {/* https://tailwindcss.com/docs/border-width#individual-sides */}
        <div className="navbar bg-base-100 border-b-2 sticky top-0 z-50">
          <div className="navbar-start">
            <a className="btn btn-ghost text-lg">
              <i className="icon-[tabler--archive] w-7 h-7"/>
              Projects
            </a>
            <a className="btn btn-ghost text-lg">
              <i className="icon-[ic--round-plus] w-7 h-7"/>
              New
            </a>
          </div>
          <div className="navbar-center">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <i className="icon-[tabler--search] w-6 h-6" />
            </label>
          </div>
          <div className="navbar-end">
            <a className="btn btn-ghost text-lg">
              <i className="icon-[charm--person] w-7 h-7"/>
              Home
            </a>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
