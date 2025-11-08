'use client'

import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { use } from "react";
import SwiperCard from "./SwiperCard";
import { useLocale } from "next-intl";
import translate from "@/i18n/langSwitcher";

interface Props {
  items: Promise<Product[]>
}

export default function MySwiper({ items }: Props) {
  const products = use(items)

  const locale = useLocale()
  const { messages: m } = translate(locale)

  if (!products.length) {
    return (
      <h3 className="text-center">{m.smthWentWrongReload}</h3>
    )
  }

  return (
    <Swiper
      centeredSlides
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ pauseOnMouseEnter: true }}
      pagination={{
        type: 'progressbar',
        clickable: true
      }}
      navigation
      loop
    >
      {products.map((p) => <SwiperSlide key={p.id}><SwiperCard product={p} /></SwiperSlide>)}
    </Swiper>
  )
}