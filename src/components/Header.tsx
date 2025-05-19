'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlatformClick = (platform: string) => {
    router.push(`/search?platform=${platform}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 ml-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-gamer-chest.png"
                alt="Gamer Chest Logo"
                width={74}
                height={74}
                className="rounded-full"
                priority
                unoptimized
              />
              <span className="text-3xl font-bold text-white">Gamer Chest</span>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Noticiones
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Reservar
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Soporte
              </Link>
            </div>
            <div className="flex space-x-2 p-2 rounded-xl bg-gray-800 relative min-h-[48px]">
              <div
                className={`flex items-center transition-all duration-300 ease-out transform ${
                  showSearch
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 -translate-y-2 pointer-events-none absolute'
                }`}
              >
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar juegos..."
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
                  >
                    Buscar
                  </button>
                </form>
              </div>

              {!showSearch && (
                <>
                  <button 
                    onClick={() => handlePlatformClick('PC')}
                    className="group relative px-3 py-1.5 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>🎮</span>
                      <span>PC</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => handlePlatformClick('PlayStation')}
                    className="group relative px-3 py-1.5 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 w-0 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>🎮</span>
                      <span>Play Station</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => handlePlatformClick('Xbox')}
                    className="group relative px-3 py-1.5 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 w-0 bg-green-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>🎮</span>
                      <span>X-Box</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => handlePlatformClick('Nintendo Switch')}
                    className="group relative px-3 py-1.5 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 w-0 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>🎮</span>
                      <span>Nintendo</span>
                    </div>
                  </button>
                </>
              )}

              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:text-orange-500 transition-colors"
              >
                {showSearch ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mr-4">
            <Link 
              href="/cart"
              className="w-12 h-12 bg-white text-gray-900 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center"
            >
              🛒
            </Link>
            <Link 
              href="/admin"
              className="w-12 h-12 bg-white text-gray-900 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center"
            >
              👤
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
