'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types/game';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        if (!response.ok) {
          throw new Error('Error al cargar los juegos');
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        setError('Error al cargar los juegos');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      try {
        const response = await fetch(`/api/games/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setGames(games.filter(game => game._id !== id));
          setError('');
        } else {
          setError('Error al eliminar el juego');
        }
      } catch (error) {
        setError('Error al eliminar el juego');
        console.error('Error:', error);
      }
    }
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
          <p>Cargando juegos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Link
              href="/admin/new"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Añadir Nuevo Juego
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game._id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
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
                <h3 className="text-xl font-bold text-white mb-2 truncate">{game.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {game.platforms.map((platform) => (
                    <span
                      key={`${game._id}-${platform}`}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-right">
                    {game.discount > 0 ? (
                      <>
                        <span className="text-gray-400 line-through text-sm mr-2">
                          {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                        </span>
                        <span className="text-white font-bold">
                          {(Object.values(game.platformPrices)[0].standard * (1 - game.discount / 100)).toFixed(2)}€
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-bold">
                        {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/edit/${game._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => game._id && handleDelete(game._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}