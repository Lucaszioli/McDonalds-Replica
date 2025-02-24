import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";

import { CartContext, iCartProduct } from "../context/cart";

interface CartItemProps {
  product: iCartProduct;
}

const CartProduct = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  const handleColor = (quantity: number) => {
    if (quantity > 1) {
      return "destructive";
    }
    return "outline";
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-[5rem] w-[5.5rem] rounded-xl bg-gray-100">
          <Image src={product.imageURL} alt={product.name} fill></Image>
        </div>
        <div className="w-[6rem] space-y-1">
          <p className="truncate text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price * product.quantity)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <div className="h-7 w-7">
              <Button
                onClick={() => decreaseProductQuantity(product.id)}
                variant={handleColor(product.quantity)}
                className="h-7 w-7 rounded-xl"
              >
                <ChevronLeftIcon size={14} />
              </Button>
            </div>
            <p className="w-8 text-xs">{product.quantity}</p>
            <div className="h-7 w-7">
              <Button
                onClick={() => increaseProductQuantity(product.id)}
                variant="destructive"
                className="h-7 w-7 rounded-xl"
              >
                <ChevronRightIcon size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => removeProduct(product.id)}
        className="h-7 w-7 rounded-lg"
        variant="outline"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProduct;
