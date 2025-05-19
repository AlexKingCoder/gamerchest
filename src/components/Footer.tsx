'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sección del Canal de Reviews */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-8">
              Nuestro Canal de Reviews
            </h2>
            <div className="relative w-full max-w-md aspect-video mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/gamer-chest-reviews.jpeg"
                alt="Canal de Reviews"
                fill
                className="object-cover"
              />
            </div>
            <Link
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <span>Ver nuestro canal</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-8">
              Síguenos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Instagram */}
              <Link
                href="#"
                className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="#"
                className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>

              {/* Discord */}
              <Link
                href="#"
                className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </Link>

              {/* Twitter/X */}
              <Link
                href="#"
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Sección de Enlaces Legales */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-8">
              Información Legal
            </h2>
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Términos y Condiciones
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Política de Devoluciones
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Política de Cookies
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Aviso Legal
              </Link>
              <Link 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
          Copyright 2025 - Gamer Chest es un proyecto de Alex Gil (King Coder)
        </div>
      </div>
    </footer>
  );
} 