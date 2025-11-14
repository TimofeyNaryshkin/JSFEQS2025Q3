import { Product } from "@/types/product";
import Image from "next/image";

interface Props {
  product: Product
}

export default function SwiperCard({ product: { id, name, description, price } }: Props) {
  return (
    <div className="max-w-[480px] h-[660px] text-center m-auto">
      <div className="relative w-[480px] h-[480px]">
        <Image src={`/img/coffee-${id}.png`} alt="favorite coffee swiper image" fill/>
      </div>
      <div className="flex flex-col justify-end">
        <h3>{name}</h3>
        <p className="medium my-4">{description}</p>
        <h3>${price}</h3>
      </div>
    </div>
  )
}