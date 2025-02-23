import { notFound } from "next/navigation";
import React from "react";

import { getProductById } from "@/data/get-product-by-id";

import ProductDetails from "./components/productDetails";
import ProductsHeader from "./components/productsHeader";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await getProductById(productId);
  if (
    !product ||
    product.restaurant.slug.toUpperCase() !== slug.toUpperCase()
  ) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductsHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
