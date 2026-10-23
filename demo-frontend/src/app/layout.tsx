import type { Metadata } from 'next'
import './globals.css'
import { DemoProvider } from '@/lib/demo-context'

export const metadata: Metadata = {
  title: 'WACRM - WhatsApp CRM Interactive Demo',
  description:
    'Full interactive demo frontend of WhatsApp CRM featuring shared team inbox, sales pipelines, contacts directory, and automated broadcasts with pre-loaded seed data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  )
}
