import { TCartItem } from "@/types/cart"
import { Trash } from "lucide-react"
import Image from "next/image"

interface Props {
  item: TCartItem
  onClick: () => void
}

export default function CartItem({ item, onClick }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <Trash onClick={onClick} className="min-w-6 cursor-pointer"/>
        <div className="relative w-25 min-w-25 h-25">
          <Image src={`/img/${item.category}-${item.id}.png`} alt={`${item.name} image`} fill className="rounded-[20px]"/>
        </div>
        <div className="text-start">
          <h3>{item.name}</h3>
          <p className="medium">{[item.size, ...item.extras].join(', ')}</p>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h3>${item.price}</h3>
        <h3>${item.discountPrice}</h3>
      </div>
    </div>
  )
}