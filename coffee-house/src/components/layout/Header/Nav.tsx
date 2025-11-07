import translate from "@/i18n/langSwitcher";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Nav() {

  const locale = useLocale()
  const { nav: t } = translate(locale)

  return (
    <nav>
      <ul className="flex gap-10">
        <li>
          <Link href='/#favorite'>{t.favCoffee}</Link>
        </li>
        <li>
          <Link href='/#about'>{t.about}</Link>
        </li>
        <li>
          <Link href='/#mobile-app'>{t.mobileApp}</Link>
        </li>
        <li>
          <Link href='#contact'>{t.cta}</Link>
        </li>
      </ul>
    </nav>
  )
}