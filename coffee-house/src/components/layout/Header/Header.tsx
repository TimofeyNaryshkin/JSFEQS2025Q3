import Link from "next/link";
import Logo from "./Logo";
import Nav from "./Nav";
import { Coffee, Menu, ShoppingBag } from "lucide-react";
import BurgerIcon from "./BurgerIcon";

export default async function Header() {

  const linkStyle = "flex gap-2 relative transition-colors after:absolute after:top-5.5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"

  return (
    <header className="flex justify-between items-center">
      <Logo />
      <Nav />
      <div className="flex gap-8 items-center">
        <Link href='/cart' className={linkStyle}><ShoppingBag width={20} height={20} /></Link>
        <Link href='/menu' className={linkStyle}>Menu<Coffee width={20} height={20} /></Link>
        <BurgerIcon />
      </div>
    </header>
  )
}