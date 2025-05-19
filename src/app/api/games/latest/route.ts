import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';

export async function GET() {
  try {
    await connectDB();
    
    // Verificar todos los juegos en la base de datos
    const allGames = await Game.find({});
    console.log('Todos los juegos en la base de datos:', allGames.map(g => ({
      _id: g._id,
      title: g.title,
      isAvailable: g.isAvailable
    })));
    
    const games = await Game
      .find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .select('_id title image discount platformPrices');

    console.log('Juegos disponibles encontrados:', games.map(g => ({
      _id: g._id,
      title: g.title
    })));

    if (!games || games.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron juegos disponibles' },
        { status: 404 }
      );
    }

    return NextResponse.json(games);
  } catch (error) {
    console.error('Error al obtener los juegos más recientes:', error);
    return NextResponse.json(
      { error: 'Error al obtener los juegos más recientes', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 