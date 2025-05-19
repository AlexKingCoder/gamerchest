'use client';

import { useEffect, useState } from 'react';
import { useFeaturedGames } from '@/context/FeaturedGamesContext';
import { Game } from '@/types/game';
import Image from 'next/image';
import Link from 'next/link';

export default function WeeklyOffers() {
  const { featuredGames, loading, error } = useFeaturedGames();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bouncingIndex, setBouncingIndex] = useState<number | null>(null);

  const togglePanel = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 4);
      setBouncingIndex(randomIndex);

      setTimeout(() => {
        setBouncingIndex(null);
      }, 1400);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tu botín semanal
          </h2>
          <div className="relative h-64 bg-gray-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-white">Cargando ofertas...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredGames.length === 0) {
    return (
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tu botín semanal
          </h2>
          <div className="relative h-64 bg-gray-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white">No hay ofertas disponibles en este momento.</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Tu botín semanal
        </h2>
        <div className="relative h-64 bg-gray-800 rounded-xl overflow-hidden">
          {/* Panel clickeable */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 bg-gray-700 flex items-center justify-center cursor-pointer z-10"
            onClick={togglePanel}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transform -rotate-90 text-white font-bold text-sm tracking-wider whitespace-nowrap">
                Haz clic para abrir tu botín
              </div>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-2xl">
              →
            </div>
          </div>

          {/* Contenido revelado */}
          <div 
            className="absolute left-16 top-0 bottom-0 right-0 bg-gray-800 transition-transform duration-1500 ease-out"
            style={{ 
              transform: `translateX(${isOpen ? '0%' : '-100%'})`
            }}
          >
            <div className="grid grid-cols-4 gap-4 p-4 h-full">
              {featuredGames.map((game, index) => (
                <Link 
                  key={game._id}
                  href={`/games/${game._id}`}
                  className={`border-2 border-yellow-500 rounded-lg bg-gray-700/50 transition-transform duration-900 overflow-hidden ${
                    bouncingIndex === index ? 'animate-subtle-bounce' : ''
                  }`}
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                    {game.discount > 0 && (
                      <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        -{game.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="text-white text-sm font-bold truncate">
                      {game.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
