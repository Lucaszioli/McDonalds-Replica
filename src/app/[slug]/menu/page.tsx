import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import { getRestaurantBySlug } from "@/data/get-restaurants-by-slug";

import RestaurantCategories from "./components/categories";
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
  const restaurant = await getRestaurantBySlug(slug);

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
