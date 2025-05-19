import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';

export async function GET() {
  try {
    await connectDB();
    const games = await Game.find({});
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los juegos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Datos recibidos:', body);
    
    await connectDB();

    // Validar que se hayan seleccionado plataformas
    if (!body.platforms || body.platforms.length === 0) {
      return NextResponse.json(
        { error: 'Debe seleccionar al menos una plataforma' },
        { status: 400 }
      );
    }

    // Validar que se hayan seleccionado géneros
    if (!body.genres || body.genres.length === 0) {
      return NextResponse.json(
        { error: 'Debe seleccionar al menos un género' },
        { status: 400 }
      );
    }

    // Validar que se hayan proporcionado los requisitos
    if (!body.requirements) {
      return NextResponse.json(
        { error: 'Los requisitos del sistema son obligatorios' },
        { status: 400 }
      );
    }

    // Convertir platformPrices a Map si es necesario
    const platformPricesMap = new Map(Object.entries(body.platformPrices));
    
    // Preparar los datos del juego
    const gameData = {
      ...body,
      platformPrices: platformPricesMap,
      image: body.image || null,
      images: body.images || [],
      trailer: body.trailer || null
    };

    console.log('Datos procesados:', gameData);
    
    const game = await Game.create(gameData);
    console.log('Juego creado:', game);
    
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error('Error al crear el juego:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al crear el juego' },
      { status: 500 }
    );
  }
} 