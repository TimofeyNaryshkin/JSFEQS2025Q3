import Link from "next/link";
import Logo from "./Logo";
import Nav from "./Nav";
import { Coffee, ShoppingBag } from "lucide-react";
import BurgerIcon from "./BurgerIcon";
import { getLocale } from "next-intl/server";
import translate from "@/i18n/langSwitcher";
import CartIcon from "./CartIcon";

export default async function Header() {
  const locale = await getLocale()
  const { mainPage, nav } = translate(locale)

  const linkStyle = "flex items-center gap-2 relative transition-colors after:absolute after:top-[24.5px] after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"

  return (
    <header className="my-5">
      <div className="wrapper flex justify-between items-center">
        <Logo />
        <Nav localeText={nav} />
        <div className="flex gap-8 items-center">
          <CartIcon className={linkStyle} />
          <Link href='/menu' className={linkStyle}>{mainPage.menu}<Coffee width={20} height={20} /></Link>
          <BurgerIcon />
        </div>
      </div>
    </header>
  )
}