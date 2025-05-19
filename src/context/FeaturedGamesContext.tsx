'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '@/types/game';
import { FEATURED_GAMES } from '@/constants/games';

interface FeaturedGamesContextType {
  featuredGames: Game[];
  loading: boolean;
  error: string | null;
}

const FeaturedGamesContext = createContext<FeaturedGamesContextType>({
  featuredGames: [],
  loading: true,
  error: null,
});

export const useFeaturedGames = () => useContext(FeaturedGamesContext);

export const FeaturedGamesProvider = ({ children }: { children: ReactNode }) => {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Solo hacemos la llamada si no tenemos juegos en caché
        if (featuredGames.length === 0) {
          console.log('Buscando juegos destacados:', FEATURED_GAMES);
          
          const gamesPromises = FEATURED_GAMES.map(async (title: string) => {
            console.log(`Buscando juego: ${title}`);
            const response = await fetch(`/api/games/search?title=${encodeURIComponent(title)}`);
            if (!response.ok) {
              console.error(`Error en la respuesta para ${title}:`, response.status, response.statusText);
              return null;
            }
            const data = await response.json();
            console.log(`Resultados para ${title}:`, data);
            return data[0];
          });

          const gamesData = await Promise.all(gamesPromises);
          console.log('Resultados de todos los juegos:', gamesData);
          
          const validGames = gamesData.filter((game: Game | null) => {
            const isValid = game && game._id && game.title && game.image && game.discount !== undefined;
            if (!isValid) {
              console.log('Juego inválido:', game);
            }
            return isValid;
          }) as Game[];
          
          console.log('Juegos válidos encontrados:', validGames.map(g => g.title));
          setFeaturedGames(validGames);
        }
      } catch (error) {
        setError('Error al cargar los juegos destacados');
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <FeaturedGamesContext.Provider value={{ featuredGames, loading, error }}>
      {children}
    </FeaturedGamesContext.Provider>
  );
}; 