import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ADD */
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name);

      if (existing) {
        return prev.map((p) =>
          p.name === item.name
            ? { ...p, quantity: Math.max(1, p.quantity + item.quantity) }
            : p
        );
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  /* REMOVE */
  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  };

  /* CLEAR */
  const clearCart = () => {
    setCart([]);
  };

  /* TOTAL */
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* HOOK */
export function useCart() {
  return useContext(CartContext);
}
