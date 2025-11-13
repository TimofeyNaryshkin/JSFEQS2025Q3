import Link from "next/link";

interface Props {
  localeText: {
    favCoffee: string
    about: string
    mobileApp: string
    cta: string
  }
}

export default function Nav({ localeText: t }: Props) {

  const linkStyle = "relative transition-colors after:absolute after:top-5 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"

  return (
    <nav>
      <ul className="hidden lg:flex gap-9">
        <li>
          <Link href='/#favorite' className={linkStyle}>{t.favCoffee}</Link>
        </li>
        <li>
          <Link href='/#about' className={linkStyle}>{t.about}</Link>
        </li>
        <li>
          <Link href='/#mobile-app' className={linkStyle}>{t.mobileApp}</Link>
        </li>
        <li>
          <Link href='#contacts' className={linkStyle}>{t.cta}</Link>
        </li>
      </ul>
    </nav>
  )
}