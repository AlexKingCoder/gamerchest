'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 1, name: 'Acción', image: '/images/categories/accion.png', genre: 'acción' },
  { id: 2, name: 'Aventura', image: '/images/categories/aventura.png', genre: 'aventura' },
  { id: 3, name: 'Deportes', image: '/images/categories/deportes.png', genre: 'deportes' },
  { id: 4, name: 'Estrategia', image: '/images/categories/estrategia.png', genre: 'estrategia' },
  { id: 5, name: 'Arcade', image: '/images/categories/arcade.png', genre: 'arcade' },
  { id: 6, name: 'FPS', image: '/images/categories/fps.png', genre: 'fps' },
  { id: 7, name: 'Lucha', image: '/images/categories/lucha.png', genre: 'lucha' },
  { id: 8, name: 'RPG', image: '/images/categories/rpg.png', genre: 'rpg' },
  { id: 9, name: 'Terror', image: '/images/categories/terror.png', genre: 'terror' },
  { id: 10, name: 'MOBA', image: '/images/categories/moba.png', genre: 'moba' },
  { id: 11, name: 'Un solo jugador', image: '/images/categories/un-solo-jugador.png', genre: 'un solo jugador' },
  { id: 12, name: 'VR', image: '/images/categories/vr.png', genre: 'vr' },
];

export default function Categories() {
  const router = useRouter();

  const handleCategoryClick = (genre: string) => {
    router.push(`/search?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.genre)}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors w-full cursor-pointer"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 