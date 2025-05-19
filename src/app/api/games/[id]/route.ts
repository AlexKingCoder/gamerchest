import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Game from '@/models/Game';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const game = await Game.findOne({ _id: new ObjectId(params.id) });
    
    if (!game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    return NextResponse.json({ error: 'Error al obtener el juego' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    // Validaciones
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'Título, descripción e imagen son requeridos' },
        { status: 400 }
      );
    }

    if (!body.platforms || body.platforms.length === 0) {
      return NextResponse.json(
        { error: 'Debe seleccionar al menos una plataforma' },
        { status: 400 }
      );
    }

    if (!body.genres || body.genres.length === 0) {
      return NextResponse.json(
        { error: 'Debe seleccionar al menos un género' },
        { status: 400 }
      );
    }

    if (!body.requirements || !body.requirements.minimum || !body.requirements.recommended) {
      return NextResponse.json(
        { error: 'Los requisitos del sistema son requeridos' },
        { status: 400 }
      );
    }

    const result = await Game.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Juego actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
    return NextResponse.json({ error: 'Error al actualizar el juego' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const result = await Game.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Juego eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    return NextResponse.json({ error: 'Error al eliminar el juego' }, { status: 500 });
  }
} 