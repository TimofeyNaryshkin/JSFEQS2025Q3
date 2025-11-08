import { Coffee } from "lucide-react"
import Link from "next/link"

interface Props {
  localeText: {
    enjoyHeadingAcccent: string
    enjoyHeading: string
    enjoyText: string
    menu: string
  }
}

export default function Hero({ localeText: t }: Props) {
  return (
    <section className="hero mb-[100px]">
      <div className="wrapper relative">
        <video className="rounded-[40px]" src='/video/hero-video.mp4' autoPlay muted loop>
          Oops something went wrong
        </video>
        <div className="absolute m-[100px] top-0 max-w-[530px]">
          <h1><i>{t.enjoyHeadingAcccent}</i>{t.enjoyHeading}</h1>
          <p className="medium my-10">{t.enjoyText}</p>
          <Link href='/menu' className="flex gap-2 py-5 max-w-[200px] bg-(--color-bg) justify-center rounded-[100px]">
            {t.menu}
            <Coffee width={20} height={20} />
          </Link>
        </div>
      </div>
    </section>)
}