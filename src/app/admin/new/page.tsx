'use client';

import { useRouter } from 'next/navigation';
import GameForm from '@/components/GameForm';

export default function CreateGamePage() {
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el juego');
      }

      router.push('/admin');
    } catch (err) {
      console.error('Error al crear el juego:', err);
    }
  };

  return <GameForm onSubmit={handleSubmit} />;
} 