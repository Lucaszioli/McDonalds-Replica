import React, { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/formatCurrency";

import { CartContext } from "../context/cart";
import CartProduct from "./cartProduct";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderIsOpen, setFinishOrderIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex flex-auto flex-col gap-5">
            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={() => setFinishOrderIsOpen(true)}
            className="w-full rounded-full"
          >
            Finalizar Pedido
          </Button>
          <FinishOrderDialog
            open={finishOrderIsOpen}
            onOpenChange={setFinishOrderIsOpen}
          ></FinishOrderDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
