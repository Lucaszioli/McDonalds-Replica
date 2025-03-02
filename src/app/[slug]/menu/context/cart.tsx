"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface iCartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageURL"> {
  quantity: number;
}

export interface iCartContext {
  total: number;
  isOpen: boolean;
  products: iCartProduct[];
  toggleCart: () => void;
  addProduct: (product: iCartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  cleanCart: () => void;
}

export const CartContext = createContext<iCartContext>({
  total: 0,
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  cleanCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProduct] = useState<iCartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

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

  const decreaseProductQuantity = (productId: string) => {
    setProduct((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId && prevProduct.quantity > 1) {
          return { ...prevProduct, quantity: prevProduct.quantity - 1 };
        }
        return prevProduct;
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProduct((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProduct((prevProducts) => {
      return prevProducts.filter((prevProduct) => {
        if (prevProduct.id != productId) {
          return prevProduct;
        }
      });
    });
  };

  const cleanCart = () => {
    setProduct(() => []);
  };

  return (
    <CartContext.Provider
      value={{
        total,
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
