import Link from "next/link";
import Logo from "./Logo";
import Nav from "./Nav";
import { Coffee, Menu, ShoppingBag } from "lucide-react";
import BurgerIcon from "./BurgerIcon";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <Nav />
      <div className="flex gap-8 items-center">
        <Link href='/cart' className="flex gap-2"><ShoppingBag width={20} height={20} /></Link>
        <Link href='/menu' className="flex gap-2">Menu<Coffee width={20} height={20} /></Link>
        <BurgerIcon />
      </div>
    </header>
  )
}