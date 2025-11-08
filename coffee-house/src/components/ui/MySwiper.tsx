'use client'

import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { use } from "react";
import SwiperCard from "./SwiperCard";

interface Props {
  items: Promise<Product[]>
}

export default function MySwiper({ items }: Props) {
  const products = use(items)


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
      {products.map((p) => <SwiperSlide ><SwiperCard product={p} /></SwiperSlide>)}
    </Swiper>
  )
}