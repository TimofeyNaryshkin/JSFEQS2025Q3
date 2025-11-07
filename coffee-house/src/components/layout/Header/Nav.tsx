import translate from "@/i18n/langSwitcher";
import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function Nav() {

  const locale = await getLocale()
  const { nav: t } = translate(locale)

  return (
    <nav>
      <ul className="flex gap-10">
        <li>
          <Link href='/#favorite' className="relative transition-colors after:absolute after:top-5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">{t.favCoffee}</Link>
        </li>
        <li>
          <Link href='/#about' className="relative transition-colors after:absolute after:top-5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">{t.about}</Link>
        </li>
        <li>
          <Link href='/#mobile-app' className="relative transition-colors after:absolute after:top-5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">{t.mobileApp}</Link>
        </li>
        <li>
          <Link href='#contact' className="relative transition-colors after:absolute after:top-5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">{t.cta}</Link>
        </li>
      </ul>
    </nav>
  )
}