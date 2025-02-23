"use client";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarURL: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleColor = () => {
    if (quantity > 1) {
      return "destructive";
    }
    return "outline";
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl p-5">
        <div className="flex-auto">
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarURL}
              alt={product.restaurant.name}
              width={16}
              height={16}
            />
            <p className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                onClick={() => {
                  handleDecreaseQuantity();
                }}
                variant={handleColor()}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                onClick={() => {
                  handleIncreaseQuantity();
                }}
                variant="destructive"
                className="h-8 w-8 rounded-xl"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1.5">
              <ChefHatIcon />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.ingredients}
            </p>
          </div>
        </div>
        <Button className="mt-6 w-full rounded-full">Adicionar à sacola</Button>
      </div>
    </>
  );
};

export default ProductDetails;
