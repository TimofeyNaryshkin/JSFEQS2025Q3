import { Coffee } from "lucide-react"
import Link from "next/link"
import Wrapper from "../layout/Wrapper"

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
      <Wrapper styles="relative">
        <video className="object-cover rounded-[40px] w-full h-full min-h-[552px] md:min-h-[644px] " src='/video/hero-video.mp4' autoPlay muted loop>
          Oops something went wrong
        </video>
        <div className="absolute top-0 mx-4 my-15 max-w-[316px] md:m-[100px]  md:max-w-[530px]">
          <h1 className="font-semibold text-[2.625rem]/[115%] md:text-[4.5rem]/[105%]"><i>{t.enjoyHeadingAcccent}</i>{t.enjoyHeading}</h1>
          <p className="medium my-10">{t.enjoyText}</p>
          <Link href='/menu' className="flex gap-2 py-5 max-w-[200px] bg-(--color-bg) justify-center rounded-[100px]">
            {t.menu}
            <Coffee width={20} height={20} />
          </Link>
        </div>
      </Wrapper>
    </section>)
}