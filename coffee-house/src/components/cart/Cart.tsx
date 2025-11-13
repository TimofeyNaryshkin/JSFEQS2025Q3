'use client'

import useCartStore from "@/store/cartStore"
import CartItem from "./CartItem"
import { useMemo } from "react";
import { LanguagesObjType } from "../../../messages/en";
import Link from "next/link";
import useUserStore from "@/store/userStore";

interface Props {
  localeText: Partial<LanguagesObjType>
}

export default function Cart({ localeText: { cartPage, basic } }: Props) {
  const { items, removeFromCart, cleanCart } = useCartStore((state) => state)
  const { isAuth, data } = useUserStore((state) => state)

  const totalPrice = useMemo(() =>
    items.reduce((prev, cur) =>
      ({ original: prev.original + parseFloat(cur.price), discount: prev.discount + parseFloat(cur.discountPrice) }),
      { original: 0, discount: 0 }),
    [items])

  const buttonStyle = "action block py-2.5 w-[200px] text-center border border-(--color-border-second) rounded-[100px] cursor-pointer"

  return (
    <>
      <div className="flex flex-col gap-3 my-10">
        {items.map((i) => <CartItem key={crypto.randomUUID()} item={i} onClick={() => removeFromCart(i)} />)}
      </div>
      <div className="ml-12 flex justify-between">
        <h3>{cartPage?.total}:</h3>
        <div className="flex gap-5">
          {isAuth
            ?
            <>
              <h3 className="line-through opacity-50">${totalPrice.original.toFixed(2)}</h3>
              <h3>${totalPrice.discount.toFixed(2)}</h3>
            </>
            :
            <h3>${totalPrice.original.toFixed(2)}</h3>
          }
        </div>
      </div>
      <div className="ml-12">
        {isAuth && <>
          <div className="flex justify-between">
            <h3>{cartPage?.address}:</h3>
            <h3>{[data?.user.city, data?.user.street, data?.user.houseNumber].join(', ')}</h3>
          </div>
          <div className="flex justify-between">
            <h3>{cartPage?.payBy}:</h3>
            <h3>{data?.user.paymentMethod}</h3>
          </div>
        </>}
      </div>
      <div className="flex justify-center gap-10 mt-10">
        {isAuth
          ? <button className={buttonStyle}>{basic?.confirm}</button >
          : <>
            <Link href='/auth/signin' className={buttonStyle}>{basic?.signIn}</Link>
            <Link href='/auth/register' className={buttonStyle}>{basic?.registration}</Link>
          </>
        }
      </div>
    </>
  )
}