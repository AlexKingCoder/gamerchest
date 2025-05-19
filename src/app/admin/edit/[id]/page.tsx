'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import GameForm from '@/components/GameForm';

export default function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el juego');
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError('Error al cargar el juego');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el juego');
      }

      router.push('/admin');
    } catch (err) {
      setError('Error al actualizar el juego');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return <GameForm initialData={game} onSubmit={handleSubmit} isEditing={true} />;
} 