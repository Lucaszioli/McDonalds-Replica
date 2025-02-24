"use client";

import { Prisma, StatusOrder } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";

const getStatusLabel = (status: StatusOrder) => {
  if (status === StatusOrder.FINISHED) return "Finalizado";
  if (status === StatusOrder.IN_PREPARATION) return "Em preparação";
  if (status === StatusOrder.PENDING) return "Pendente";
};

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarURL: true;
        };
      };
      orderProduct: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card key={order.id}>
      <CardContent className="space-y-4 p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${order.status === StatusOrder.FINISHED ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={order.restaurant.avatarURL}
              alt={order.restaurant.name}
              fill
              className="rounded-sm"
            ></Image>
          </div>
          <p className="text-sm font-semibold">{order.restaurant.name}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          {order.orderProduct.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                {orderProduct.quantity}
              </div>
              <p className="text-sm">{orderProduct.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
