"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverURL">;
}
const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const seeOrders = () => {
    router.push(`/${slug}/orders`);
  };
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 z-50 rounded-full"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
        <Image
          src={restaurant.coverURL}
          alt={restaurant.name}
          fill
          className="object-cover"
        ></Image>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full"
          onClick={seeOrders}
        >
          <ScrollTextIcon />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantHeader;
