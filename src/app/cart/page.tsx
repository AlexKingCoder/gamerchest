'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, game) => {
      const standardPrice = Object.values(game.platformPrices)[0]?.standard || 0;
      const finalPrice = game.discount > 0 
        ? standardPrice * (1 - game.discount / 100)
        : standardPrice;
      return total + finalPrice;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-xl mb-4">Tu carrito está vacío</p>
            <Link
              href="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Explorar Juegos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((game) => (
                <div
                  key={game._id}
                  className="bg-gray-800 rounded-xl overflow-hidden mb-4"
                >
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover"
                      />
                      {game.discount > 0 && (
                        <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                          -{game.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {game.platforms.map((platform) => (
                          <span
                            key={`${game._id}-${platform}`}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-right">
                          {game.discount > 0 ? (
                            <>
                              <span className="text-gray-400 line-through text-sm mr-2">
                                {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                              </span>
                              <span className="text-white font-bold">
                                {(Object.values(game.platformPrices)[0].standard * (1 - game.discount / 100)).toFixed(2)}€
                              </span>
                            </>
                          ) : (
                            <span className="text-white font-bold">
                              {Object.values(game.platformPrices)[0].standard.toFixed(2)}€
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => game._id && removeFromCart(game._id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{calculateTotal().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (21%)</span>
                    <span>{(calculateTotal() * 0.21).toFixed(2)}€</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{(calculateTotal() * 1.21).toFixed(2)}€</span>
                    </div>
                  </div>
                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors mt-4"
                    disabled={cartItems.length === 0}
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 