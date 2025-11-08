import { Product } from "@/types/product";
import Image from "next/image";

interface Props {
  product: Product
}

export default function MenuProductCard({ product }: Props) {
  return (
    <div className="cursor-pointer w-[310px] h-[506px] flex flex-col text-start border border-(--color-border) rounded-[40px] overflow-hidden group">
      <div className="relative w-[310px] h-[310px] rounded-[40px] overflow-hidden">
        <Image src={`/img/${product.category}-${product.id}.png`} alt={`${product.name} image`} fill
          className="object-cover scale-110 transition-transform duration-300 group-hover:scale-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3>{product.name}</h3>
        <p className="medium my-3">{product.description}</p>
        <div className="flex gap-2 mt-auto">
          <h3>${product.discountPrice}</h3>
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  )
}