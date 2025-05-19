import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const genre = searchParams.get('genre');
    const query = searchParams.get('q');
    const title = searchParams.get('title');

    console.log('Search params:', { platform, genre, query, title }); // Debug log

    await connectDB();

    // Primero, veamos todos los géneros únicos que existen en la base de datos
    const uniqueGenres = await Game.distinct('genres');
    console.log('Géneros únicos en la base de datos:', uniqueGenres);

    let filter: any = {};

    // Filtrar por plataforma
    if (platform) {
      filter.platforms = platform;
    }

    // Filtrar por género
    if (genre) {
      // Primero intentamos con el género exacto
      filter.genres = genre;
      console.log('Intentando búsqueda con género exacto:', genre);
      
      let games = await Game.find(filter).lean();
      console.log('Resultados con búsqueda exacta:', games.length);
      
      if (games.length === 0) {
        // Si no hay resultados, intentamos con una búsqueda case-insensitive
        filter.genres = { $regex: new RegExp(genre, 'i') };
        console.log('Intentando búsqueda case-insensitive con:', genre);
        games = await Game.find(filter).lean();
        console.log('Resultados con búsqueda case-insensitive:', games.length);
      }

      if (games.length > 0) {
        console.log('Primer juego encontrado:', {
          title: games[0].title,
          genres: games[0].genres
        });
        return NextResponse.json(games);
      }
    }

    // Búsqueda por título exacto (para juegos destacados)
    if (title) {
      filter.title = title;
    }
    // Búsqueda por texto (para búsqueda general)
    else if (query) {
      filter.title = { $regex: query, $options: 'i' };
    }

    console.log('Final filter:', filter); // Debug log

    const games = await Game.find(filter)
      .sort({ releaseDate: -1 })
      .lean();

    console.log('Found games:', games.length); // Debug log
    if (games.length > 0) {
      console.log('Sample game:', {
        title: games[0].title,
        genres: games[0].genres
      }); // Debug log
    }

    return NextResponse.json(games);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return NextResponse.json(
      { error: 'Error al buscar juegos' },
      { status: 500 }
    );
  }
} 