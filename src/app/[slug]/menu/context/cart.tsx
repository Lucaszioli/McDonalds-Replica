"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface iCartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<iCartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProduct] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
