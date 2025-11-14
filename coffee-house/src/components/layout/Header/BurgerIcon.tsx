'use client'

import useNavStore from "@/store/navStore";
import { Menu } from "lucide-react";

export default function BurgerIcon() {
  const { toggle } = useNavStore((state) => state)

  return (
    <button onClick={toggle} className="lg:hidden w-11 h-11 flex items-center justify-center border-solid">
      <Menu width={20} height={20} />
    </button>
  )
}