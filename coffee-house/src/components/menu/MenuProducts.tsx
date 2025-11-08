import { Category, Product } from "@/types/product"
import MenuProductCard from "./MenuProductCard"
import { useMemo, useState } from "react"
import MenuModal from "./MenuModal"

interface Props {
  products: Product[]
  currentCategory: Category
}

export default function MenuProducts({ products, currentCategory }: Props) {
  const [modal, setModal] = useState({ opened: false, productId: 0 })
  const openModal = (productId: number) => setModal({ opened: true, productId })
  const closeModal = () => setModal({ opened: false, productId: 0 })

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === currentCategory)
  }, [products, currentCategory])

  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center">
        {filteredProducts.map((p) => <MenuProductCard key={p.id} product={p} onClick={() => openModal(p.id)} />)}
      </div>
      {modal.opened && <MenuModal productId={modal.productId} onClick={closeModal} />}
    </>
  )
}