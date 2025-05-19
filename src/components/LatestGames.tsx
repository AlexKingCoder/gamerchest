'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface Game {
  _id: string;
  title: string;
  image: string;
  discount: number;
  platformPrices: {
    [key: string]: {
      standard: number;
      premium: number;
    };
  };
}

interface LatestGamesProps {
  games: Game[];
}

export default function LatestGames({ games }: LatestGamesProps) {
  useEffect(() => {
    console.log('Juegos recibidos en LatestGames:', games);
  }, [games]);

  const calculateFinalPrice = (game: Game) => {
    const standardPrice = Object.values(game.platformPrices)[0]?.standard || 0;
    const finalPrice = standardPrice * (1 - (game.discount / 100));
    // Redondeamos a 2 decimales
    return Math.round(finalPrice * 100) / 100;
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Lo último</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link 
              href={`/games/${game._id}`} 
              key={game._id}
              className="group"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {game.discount > 0 && (
                    <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      -{game.discount}%
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-white font-medium text-lg truncate max-w-[70%]">
                    {game.title}
                  </h3>
                  <div className="text-right">
                    {game.discount > 0 ? (
                      <>
                        <span className="text-gray-400 line-through text-sm mr-2">
                          {Object.values(game.platformPrices)[0]?.standard.toFixed(2)}€
                        </span>
                        <span className="text-white font-bold">
                          {calculateFinalPrice(game).toFixed(2)}€
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-bold">
                        {Object.values(game.platformPrices)[0]?.standard.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 