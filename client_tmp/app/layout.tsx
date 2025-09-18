import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SneakerHub - Boutique de Sneakers Premium",
  description:
    "Découvrez notre collection exclusive de sneakers des plus grandes marques. Livraison gratuite et retours faciles.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CookieBanner />
            <Toaster />
          </Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
