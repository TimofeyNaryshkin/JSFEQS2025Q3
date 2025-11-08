import { productByIdService } from "@/services/product-service"
import { ProductDetails } from "@/types/product"
import { useEffect, useState } from "react"
import Loader from "../ui/Loader"
import Image from "next/image"
import { useLocale } from "next-intl"
import translate from "@/i18n/langSwitcher"
import ModalButton from "../ui/ModalButton"

interface Props {
  productId: number
  onClick: () => void
}

export default function MenuModal({ onClick, productId }: Props) {
  const [product, setProduct] = useState<ProductDetails>()
  const [isLoading, setIsLoading] = useState(true)

  const locale = useLocale()
  const { modal: t, messages: m } = translate(locale)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    productByIdService(productId).then(data => {
      setProduct(data)
      setIsLoading(false)
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
              <div className="max-w-[458px] pl-5">
                <h3>{product.name}</h3>
                <p className="medium mt-3 mb-5">{product.description}</p>
                <p className="medium mb-2">{t.size}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(product.sizes).map((s) => <ModalButton key={s[0]} size={s} />)}
                </div>
                <p className="medium mb-2">{t.additives}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(product.additives).map((a) => <ModalButton key={a[0]} additive={a} />)}
                </div>
                <div className="flex justify-between mb-5">
                  <h3>{t.total}</h3>
                  <h3>${product.price}</h3>
                </div>
                <button className="border py-2.5 max-w-[438px] w-full rounded-[100px] cursor-pointer action">{t.addToCart}</button>
              </div>
            </>
        }
      </div>
    </div>
  )
}