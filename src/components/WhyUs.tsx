'use client';

import Image from 'next/image';

export default function WhyUs() {
  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-xl p-8 border-2 border-dashed border-white">
          {/* Título principal */}
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ¿Por qué somos los mejores?
          </h2>

          {/* Contenedor de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 relative p-2">
                  <Image
                    src="/images/ban1.png"
                    alt="¡Al toque mi rey!"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl italic text-white mb-4">
                  ¡Al toque mi rey!
                </h3>
                <p className="text-gray-300">
                  Descarga tus juegos a la velocidad del rayo para jugarlos al instante.
                </p>
              </div>
            </div>

            {/* Característica 2 */}
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 relative p-2">
                  <Image
                    src="/images/ban2.png"
                    alt="Tu juego ideal"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl italic text-white mb-4">
                  Tu juego ideal
                </h3>
                <p className="text-gray-300">
                  Entre los 10.000 juegos de nuestro catálogo, ¡seguro que tenemos el perfecto para ti!
                </p>
              </div>
            </div>

            {/* Característica 3 */}
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 relative p-2">
                  <Image
                    src="/images/ban3.png"
                    alt="Estamos ahí, siempre"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl italic text-white mb-4">
                  Estamos ahí, siempre
                </h3>
                <p className="text-gray-300">
                  Soporte al momento, 24 horas, todos los días del año.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 