'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '@/types/game';

interface CartContextType {
  cartItems: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  isInCart: (gameId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Game[]>([]);

  // Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (game: Game) => {
    setCartItems(prevItems => {
      // Verificar si el juego ya está en el carrito
      if (prevItems.some(item => item._id === game._id)) {
        return prevItems;
      }
      return [...prevItems, game];
    });
  };

  const removeFromCart = (gameId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== gameId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (gameId: string) => {
    return cartItems.some(item => item._id === gameId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 