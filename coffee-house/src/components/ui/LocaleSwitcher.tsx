'use client'

import { Link, usePathname } from "@/i18n/navigation"
import { useLocale } from "next-intl"

enum Locales {
  En = 'en',
  Ru = 'ru'
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathName = usePathname()

  return (
    <div>
      {Object.values(Locales).map((l) =>
        <Link key={l} href={pathName}
          locale={l}
          className={`px-3 py-1 rounded flex items-center gap-2 ${locale === l
            ? 'bg-(--color-bg-container) text-(--color-text-second)'
            : 'bg-(--color-bg)'}`}
        >
          {l.toUpperCase()}
        </Link>)}
    </div>
  )
}