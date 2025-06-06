import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FeaturedGamesProvider } from '@/context/FeaturedGamesContext';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamer Chest - Tu tienda de videojuegos",
  description: "Encuentra los mejores videojuegos al mejor precio",
  icons: {
    icon: '/logo-gamer-chest.png',
    apple: '/logo-gamer-chest.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <FeaturedGamesProvider>
            {children}
          </FeaturedGamesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
