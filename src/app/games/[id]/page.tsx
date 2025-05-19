import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import GameDetails from '@/components/GameDetails';
import Footer from '@/components/Footer';

async function getGame(id: string) {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL || '';

    const res = await fetch(`${baseUrl}/api/games/${id}`, {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Error al cargar el juego');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error al cargar el juego:', error);
    return null;
  }
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGame(params.id);

  if (!game) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-gray-900 min-h-screen">
        <GameDetails game={game} />
      </main>
      <Footer />
    </>
  );
} 