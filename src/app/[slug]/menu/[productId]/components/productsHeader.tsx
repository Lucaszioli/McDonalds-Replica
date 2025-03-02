"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
  product: Pick<Product, "name" | "imageURL">;
}

const ProductsHeader = ({ product }: ProductsHeaderProps) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");
  const seeOrders = () => {
    router.push(`/${slug}/orders/?consumptionMethod=${consumptionMethod}`);
  };
  return (
    <div className="relative min-h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={router.back}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageURL}
        alt={product.name}
        fill
        className="object-contain"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={seeOrders}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductsHeader;
