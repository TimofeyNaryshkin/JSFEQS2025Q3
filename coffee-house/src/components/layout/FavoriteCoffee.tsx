import { favoriteProductsService } from "@/services/product-service"
import { Suspense } from "react"
import MySwiper from "../ui/MySwiper"

interface Props {
  localeText: {
    chooseCoffeeHeading1: string
    chooseCoffeeHeadingAccent: string
    chooseCoffeeHeading2: string
  }
}

export default function FavoriteCoffee({ localeText: t }: Props) {
  const favoriteProducts = favoriteProductsService();

  return (
    <section id="favorite">
      <div className="wrapper">
        <h2 className="text-center mb-10">
          {t.chooseCoffeeHeading1}
          <i>{t.chooseCoffeeHeadingAccent}</i>
          {t.chooseCoffeeHeading2}
        </h2>
        <Suspense fallback>
          <MySwiper items={favoriteProducts}/>
        </Suspense>
      </div>
    </section>
  )
}