import ProductDetailContent from "@/components/products/ProductDetailContent";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
