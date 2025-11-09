'use client'

import useCartStore from "@/store/cartStore"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

interface Props {
  className: string
}

export default function CartIcon({ className }: Props) {
  const { items } = useCartStore((state) => state)

  return (
    <Link href='/cart' className={className}><ShoppingBag width={20} height={20} />{items.length && items.length}</Link>
  )
}