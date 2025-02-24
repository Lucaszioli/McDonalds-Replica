"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface iCartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageURL"> {
  quantity: number;
}

export interface iCartContext {
  isOpen: boolean;
  products: iCartProduct[];
  toggleCart: () => void;
  addProduct: (product: iCartProduct) => void;
}

export const CartContext = createContext<iCartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProduct] = useState<iCartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: iCartProduct) => {
    const productOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (!productOnCart) {
      return setProduct((prev) => [...prev, product]);
    }
    setProduct((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
