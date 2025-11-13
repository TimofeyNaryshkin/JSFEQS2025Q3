'use client'

import { Menu } from "lucide-react";

export default function BurgerIcon() {
  return (
    <button className="md:hidden w-11 h-11 flex items-center justify-center border-solid">
      <Menu width={20} height={20} />
    </button>
  )
}