'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const platform = searchParams.get('platform');
  const genre = searchParams.get('genre');
  const query = searchParams.get('q');

  const calculateFinalPrice = (game: Game) => {
    const standardPrice = Object.values(game.platformPrices)[0]?.standard || 0;
    const finalPrice = standardPrice * (1 - (game.discount / 100));
    return Math.round(finalPrice * 100) / 100;
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError('');
        
        let url = '/api/games/search?';
        if (platform) url += `platform=${encodeURIComponent(platform)}&`;
        if (genre) url += `genre=${encodeURIComponent(genre)}&`;
        if (query) url += `q=${encodeURIComponent(query)}&`;

        console.log('Fetching from URL:', url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Formato de respuesta inválido');
        }

        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('No se pudieron cargar los resultados');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [platform, genre, query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="animate-pulse">Cargando resultados...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          {platform ? `Juegos para ${platform.toUpperCase()}` : 
           genre ? `Juegos de ${genre}` :
           query ? `Resultados para "${query}"` :
           'Todos los juegos'}
        </h1>

        {games.length === 0 ? (
          <div className="text-center text-white">
            <p>No se encontraron juegos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, gameIndex) => (
              <Link 
                key={`game-${game._id}-${gameIndex}`}
                href={`/games/${game._id}`}
                className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-video">
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
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.map((platform, platformIndex) => (
                        <span
                          key={`platform-${game._id}-${platform}-${platformIndex}-${gameIndex}`}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      {game.discount > 0 ? (
                        <>
                          <span className="text-gray-400 line-through text-sm">
                            {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                          </span>
                          <span className="text-white font-bold ml-2">
                            {calculateFinalPrice(game).toFixed(2)}€
                          </span>
                        </>
                      ) : (
                        <span className="text-white font-bold">
                          {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 