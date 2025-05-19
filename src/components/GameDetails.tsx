'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Game } from '@/types/game';
import { useCart } from '@/context/CartContext';
import Toast from './Toast';

interface GameDetailsProps {
  game: Game;
}

export default function GameDetails({ game }: GameDetailsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(game.platforms[0]);
  const [selectedEdition, setSelectedEdition] = useState<'standard' | 'premium'>('standard');
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const calculateFinalPrice = () => {
    const basePrice = game.platformPrices[selectedPlatform][selectedEdition];
    return basePrice * (1 - (game.discount / 100));
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 5) return 'text-red-500';
    if (rating <= 8) return 'text-yellow-500';
    return 'text-green-500';
  };

  const renderRequirements = (requirements: { [key: string]: string }) => {
    return Object.entries(requirements).map(([key, value]) => (
      <div key={key} className="mb-2">
        <span className="font-semibold text-white capitalize">{key}:</span>{' '}
        <span className="text-gray-300">{value}</span>
      </div>
    ));
  };

  const handleAddToCart = () => {
    addToCart(game);
    setShowToast(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showToast && (
        <Toast
          message={`¡${game.title} añadido al carrito!`}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bloque izquierdo - Imagen principal y descripción */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={game.image}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Descripción del juego */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Acerca de</h2>
            <p className="text-gray-300 leading-relaxed">{game.description}</p>
          </div>
        </div>

        {/* Bloque derecho - Información del juego */}
        <div className="w-full md:w-1/2 space-y-8">
          {/* Título y disponibilidad */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full ${game.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-gray-300">
                {game.isAvailable ? 'Disponible' : 'No disponible'} - {game.stock} unidades
              </span>
            </div>
          </div>

          {/* Selectores de plataforma y edición */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Plataforma</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                {game.platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Edición</label>
              <select
                value={selectedEdition}
                onChange={(e) => setSelectedEdition(e.target.value as 'standard' | 'premium')}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="standard">Estándar</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          {/* Precios */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 line-through">
                ${game.platformPrices[selectedPlatform][selectedEdition].toFixed(2)}
              </span>
              {game.discount > 0 && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">
                  -{game.discount}%
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-white">
              ${calculateFinalPrice().toFixed(2)}
            </div>
          </div>

          {/* Botón de añadir al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={!game.isAvailable}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              game.isAvailable
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {game.isAvailable ? 'Añadir al carrito' : 'No disponible'}
          </button>

          {/* Información adicional */}
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-gray-400 text-sm">Desarrollador</h3>
              <p className="text-white">{game.developer}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Distribuidor</h3>
              <p className="text-white">{game.publisher}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Fecha de lanzamiento</h3>
              <p className="text-white">{new Date(game.releaseDate).toLocaleDateString('es-ES')}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span key={genre} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <h3 className="text-gray-400 text-sm">Puntuación</h3>
              <div className={`w-12 h-12 rounded-full border-4 ${getRatingColor(game.rating)} flex items-center justify-center font-bold`}>
                {game.rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de galería */}
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold text-white mb-6">Galería</h2>

        {/* Vídeo promocional */}
        {game.trailer && (
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <video
              src={game.trailer}
              controls
              className="w-full h-full object-cover"
              poster={game.image}
            />
          </div>
        )}

        {/* Galería de imágenes */}
        {game.images && game.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Imagen principal */}
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={game.images[0]}
                alt={`${game.title} - Imagen 1`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Cuadrícula de imágenes */}
            <div className="grid grid-cols-2 gap-4">
              {game.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative h-[140px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${game.title} - Imagen ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sección de requisitos */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Requisitos del sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Requisitos mínimos */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Mínimos</h3>
            <div className="text-gray-300">
              {renderRequirements(game.requirements.minimum)}
            </div>
          </div>

          {/* Requisitos recomendados */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recomendados</h3>
            <div className="text-gray-300">
              {renderRequirements(game.requirements.recommended)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 