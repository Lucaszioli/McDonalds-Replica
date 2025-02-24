"use client";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

import OrderItem from "./orderItem";

interface OrderListProp {
  orders: Prisma.OrderGetPayload<{
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
  }>[];
}

const OrderList = ({ orders }: OrderListProp) => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");
  const backHome = () => {
    router.push(`/${slug}/menu/?consumptionMethod=${consumptionMethod}`);
  };
  return (
    <div className="space-y-6 p-6">
      <Button
        onClick={backHome}
        size="icon"
        variant="secondary"
        className="rounded-full"
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export default OrderList;
