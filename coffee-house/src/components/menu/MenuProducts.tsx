'use client'

import { Product } from "@/types/product"
import { use } from "react"

interface Props {
  items: Promise<Product[]>
}

export default function MenuProducts({ items }: Props) {
  const products = use(items)

  return (
    products.map((p) => '')
  )
}