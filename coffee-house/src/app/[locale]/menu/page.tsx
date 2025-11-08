import Menu from "@/components/menu/Menu";
import Loader from "@/components/ui/Loader";
import { productsService } from "@/services/product-service";
import { Suspense } from "react";

export default function MenuPage() {
  const products = productsService()

  return (
    <section className="mb-[100px] min-h-[300px] flex items-center justify-center">
      <div className="wrapper">
        <Suspense fallback={<Loader />}>
          <Menu products={products} />
        </Suspense>
      </div>
    </section>
  );
}
