import { notFound } from "next/navigation";
import React from "react";

import { getProductById } from "@/data/get-product-by-id";

import ProductsHeader from "./components/productsHeader";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await getProductById(productId);
  if (!product) {
    return notFound();
  }
  return <ProductsHeader product={product} />;
};

export default ProductPage;
