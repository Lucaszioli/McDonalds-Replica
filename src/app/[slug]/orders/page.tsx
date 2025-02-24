import React from "react";

import { db } from "@/lib/prisma";

import EmailForm from "./components/emailForm";
import OrderList from "./components/orderList";

interface OrdersPageProps {
  searchParams: Promise<{ email: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { email } = await searchParams;
  if (!email) {
    return <EmailForm />;
  }

  const orders = await db.order.findMany({
    where: {
      customerEmail: email,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarURL: true,
        },
      },
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;
