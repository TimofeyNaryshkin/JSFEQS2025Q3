import { Category, Product } from "@/types/product"
import MenuProductCard from "./MenuProductCard"
import { useMemo } from "react"

interface Props {
  products: Product[]
  currentCategory: Category
}

export default function MenuProducts({ products, currentCategory }: Props) {

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === currentCategory)
  }, [products, currentCategory])

  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {filteredProducts.map((p) => <MenuProductCard key={p.id} product={p} />)}
    </div>
  )
}