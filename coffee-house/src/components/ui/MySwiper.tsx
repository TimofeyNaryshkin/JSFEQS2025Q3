'use client'

import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { use } from "react";
import SwiperCard from "./SwiperCard";

interface Props {
  items: Promise<Product[]>
}

export default function MySwiper({ items }: Props) {
  const products = use(items)

  if (!products.length) {
    return (
      <h3 className="text-center">Something went wrong. Please, refresh the page</h3>
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