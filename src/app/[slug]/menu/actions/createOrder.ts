"use server";

import { ConsumptionMethod, StatusOrder } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error();
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));
  console.log(input.consumptionMethod);
  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      status: StatusOrder.PENDING,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      orderProduct: {
        createMany: {
          data: productWithPricesAndQuantities,
        },
      },
      total: productWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    },
  });
  redirect(`/${input.slug}/orders/?email=${input.customerEmail}`);
};
