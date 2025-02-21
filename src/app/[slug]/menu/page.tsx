import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (value: string) => {
  return [ConsumptionMethod.DINE_IN, ConsumptionMethod.TAKE_AWAY].includes(
    value.toUpperCase() as ConsumptionMethod,
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant) {
    return notFound();
  }

  return <RestaurantHeader restaurant={restaurant} />;
};

export default RestaurantMenuPage;
