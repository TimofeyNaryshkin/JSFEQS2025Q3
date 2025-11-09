'use client'

import useCartStore from "@/store/cartStore"
import CartItem from "./CartItem"
import { useMemo } from "react";

interface Props {
  localeText: {
    total: string;
    address: string;
    payBy: string;
  }
}

export default function Cart({ localeText: t }: Props) {
  const { items, removeFromCart, cleanCart } = useCartStore((state) => state)

  const totalPrice = useMemo(() =>
    items.reduce((prev, cur) =>
      ({ original: prev.original + parseFloat(cur.price), discount: prev.discount + parseFloat(cur.discountPrice) }),
      { original: 0, discount: 0 }),
    [items])

  return (
    <>
      <div className="flex flex-col gap-3 my-10">
        {items.map((i) => <CartItem key={crypto.randomUUID()} item={i} onClick={() => removeFromCart(i)} />)}
      </div>
      <div className="mt-10 ml-12 flex justify-between">
        <h3>{t.total}:</h3>
        <div className="flex gap-5">
          <h3>${totalPrice.original.toFixed(2)}</h3>
          <h3>${totalPrice.discount.toFixed(2)}</h3>
        </div>
      </div>
      <div className="ml-12">
        <div className="flex justify-between">
          <h3>{t.address}:</h3>
          <h3></h3>
        </div>
        <div className="flex justify-between">
          <h3>{t.payBy}:</h3>
          <h3></h3>
        </div>
      </div>
    </>
  )
}