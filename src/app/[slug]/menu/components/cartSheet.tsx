import React, { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../context/cart";

const CartSheet = () => {
  const { isOpen, toggleCart } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>AAAA</SheetTitle>
          <SheetDescription> AAAAAA</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
