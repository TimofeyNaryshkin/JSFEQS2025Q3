import { productByIdService } from "@/services/product-service"
import { Additive, ProductDetails, Size } from "@/types/product"
import { useEffect, useState } from "react"
import Loader from "../ui/Loader"
import Image from "next/image"
import { useLocale } from "next-intl"
import translate from "@/i18n/langSwitcher"
import ModalButton from "../ui/ModalButton"
import { ModalItem, TCartItem } from "@/types/cart"

interface Props {
  productId: number
  onClick: () => void
}

export default function MenuModal({ onClick, productId }: Props) {
  const [product, setProduct] = useState<ProductDetails>()
  const [isLoading, setIsLoading] = useState(true)
  const [cartItem, setCartItem] = useState<ModalItem>({
    id: 0,
    name: '',
    categoty: '',
    size: {
      size: '',
      price: '',
      discountPrice: ''
    },
    extras: [],
    price: '',
    discountPrice: ''
  })

  const selectSize = (size: Size) => {
    const newPrice = parseFloat(cartItem.price) - parseFloat(cartItem.size.price) + parseFloat(size.price)
    const extrasDiscountPrice = cartItem.extras.reduce((prev, cur) => {
      if (cur.discountPrice) {
        return parseFloat(cur.discountPrice) + prev
      }
      return parseFloat(cur.price) + prev
    }, 0)
    const newDiscountPrice = extrasDiscountPrice + (size.discountPrice ? parseFloat(size.discountPrice) : parseFloat(size.price))

    setCartItem({ ...cartItem, size, price: newPrice.toFixed(2), discountPrice: newDiscountPrice.toFixed(2) })
  }
  const toggleAdditive = (additive: Additive) => {
    if (cartItem.extras.includes(additive)) {
      const newDiscountPrice = additive.discountPrice ? parseFloat(cartItem.discountPrice) - parseFloat(additive.discountPrice) : parseFloat(cartItem.discountPrice) - parseFloat(additive.price)
      const newPrice = parseFloat(cartItem.price) - parseFloat(additive.price)
      setCartItem({ ...cartItem, price: newPrice.toFixed(2), discountPrice: newDiscountPrice.toFixed(2), extras: cartItem.extras.filter((a) => a !== additive) })
    } else {
      const newDiscountPrice = additive.discountPrice ? parseFloat(cartItem.discountPrice) + parseFloat(additive.discountPrice) : parseFloat(cartItem.discountPrice) + parseFloat(additive.price)
      const newPrice = parseFloat(cartItem.price) + parseFloat(additive.price)
      setCartItem({ ...cartItem, price: newPrice.toFixed(2), discountPrice: newDiscountPrice.toFixed(2), extras: [...cartItem.extras, additive] })
    }
  }

  const locale = useLocale()
  const { modal: t, messages: m } = translate(locale)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    productByIdService(productId).then(data => {
      setProduct(data)
      setIsLoading(false)
      if (data) {
        const { id, name, category, sizes: { s } } = data
        setCartItem(prev => ({
          ...prev,
          id,
          name,
          category,
          size: s,
          price: s.price,
          discountPrice: s.discountPrice || s.price
        }))
      }
    })

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [productId])

  return (
    <div onClick={onClick} className="
    flex 
    justify-center 
    items-center 
    top-0 left-0 
    w-full h-full 
    fixed inset-0 
    bg-linear-to-b
     from-black/30
     to-black/60 z-40"
    >
      <div onClick={(e) => e.stopPropagation()} className="flex relative w-[800px] h-[492px] p-4 rounded-[40px] bg-(--color-bg)">
        <button className="
        absolute 
        -top-11 right-0 
        w-11 h-11 
        rounded-full 
        border border-(--color-border) 
        cursor-pointer
        bg-[url(/icons/close.svg)]
        bg-no-repeat
        bg-center"
          onClick={onClick}>
        </button>
        {isLoading
          ? <Loader />
          : !product
            ? <h3 className="text-center m-auto">{m.smthWentWrongTryAgain}</h3>
            : <>
              <div className="relative w-[310px] h-[310px] ">
                <Image src={`/img/${product.category}-${product.id}.png`} alt={`${product.name} image`} fill className="rounded-[40px]" />
              </div>
              <div className="flex flex-col justify-between max-w-[458px] pl-5">
                <h3>{product.name}</h3>
                <p className="medium mt-3 mb-5">{product.description}</p>
                <p className="medium mb-2">{t.size}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(product.sizes).map((s) => <ModalButton cartItem={cartItem} selectSize={() => selectSize(s[1])} key={s[0]} size={s} />)}
                </div>
                <p className="medium mb-2">{t.additives}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(product.additives).map((a) => <ModalButton cartItem={cartItem} toggleAdditive={() => toggleAdditive(a[1])} key={a[0]} additive={a} />)}
                </div>
                <div className="flex justify-between mb-5">
                  <h3>{t.total}</h3>
                  <h3>${cartItem.price}</h3>
                  <h3>${cartItem.discountPrice}</h3>
                </div>
                <button onClick={onClick} className="border py-2.5 max-w-[438px] w-full rounded-[100px] cursor-pointer action">{t.addToCart}</button>
              </div>
            </>
        }
      </div>
    </div>
  )
}