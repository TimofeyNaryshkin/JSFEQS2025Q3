import Menu from "@/components/menu/Menu";
import { productsService } from "@/services/product-service";

export default function MenuPage() {
  const products = productsService()

  return <Menu products={products}/>;
}
