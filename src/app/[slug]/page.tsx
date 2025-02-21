import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import { getRestaurantBySlug } from "@/data/get-restaurants-by-slug";

import ConsumptionMehtodOption from "./consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarURL}
          alt={restaurant?.name}
          width={82}
          height={82}
        ></Image>
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja Bem Vindo</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Oferecemos praticidade e
          sabor em cada detalhe
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMehtodOption
          option={ConsumptionMethod.DINE_IN}
          imageAlt="Para comer aqui"
          imageURL="/dine_in.png"
          buttonText="Para comer aqui"
          slug={slug}
        ></ConsumptionMehtodOption>
        <ConsumptionMehtodOption
          option={ConsumptionMethod.TAKE_AWAY}
          imageAlt="Para levar"
          imageURL="/take_away.png"
          buttonText="Para levar"
          slug={slug}
        ></ConsumptionMehtodOption>
      </div>
    </div>
  );
};

export default RestaurantPage;
