import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LatestGames from '@/components/LatestGames';
import WeeklyOffers from '@/components/WeeklyOffers';
import WhyUs from '@/components/WhyUs';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';

async function getLatestGames() {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL || '';

    const res = await fetch(`${baseUrl}/api/games/latest`, {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al cargar los juegos');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error al cargar los juegos:', error);
    return [];
  }
}

export default async function Home() {
  const games = await getLatestGames();
  console.log('Juegos cargados:', games); // Para depuración

  return (
    <main className="min-h-screen bg-gray-900">
      <Header />
      <Hero />
      {games.length > 0 ? (
        <>
          <LatestGames games={games} />
          <WhyUs />
          <WeeklyOffers />
          <Categories />
        </>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <p className="text-white text-center">No hay juegos disponibles en este momento.</p>
        </div>
      )}
      <Footer />
    </main>
  );
}
