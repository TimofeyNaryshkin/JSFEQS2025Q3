import About from "@/components/layout/About";
import translate from "@/i18n/langSwitcher";
import { Coffee } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const locale = await getLocale()
  const { mainPage: t } = translate(locale)

  return (
    <>
      <section className="hero mb-[100px]">
        <div className="wrapper relative">
          <video className="rounded-[40px]" src='/video/hero-video.mp4' autoPlay muted loop>
            Oops something went wrong
          </video>
          <div className="absolute m-[100px] top-0 max-w-[530px]">
            <h1><i>{t.enjoyHeadingAcccent}</i>{t.enjoyHeading}</h1>
            <p className="medium my-10">{t.enjoyText}</p>
            <Link href='/menu' className="flex gap-2 py-5 max-w-[200px] bg-(--color-bg) justify-center rounded-[100px]">Menu<Coffee width={20} height={20} /></Link>
          </div>
        </div>
      </section>
      <About localeText={t}/>
    </>
  );
}
