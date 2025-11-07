import Image from "next/image";

interface Props {
  localeText: {
    aboutHeading1: string
    aboutHeading2: string
    aboutHeadingAccent: string
  }
}

export default function About({ localeText: t }: Props) {
  return (
    <section id="about" className="mb-[100px]">
      <div className="wrapper">
        <h2>{t.aboutHeading1}<i>{t.aboutHeadingAccent}</i>{t.aboutHeading2}</h2>
        <div className="flex flex-col gap-10 flex-wrap max-h-[1060px] mt-10">
          <div className="relative w-[660px] h-[590px] overflow-hidden rounded-[20px] group">
            <Image
              src='/img/about-1.png'
              alt="about section image"
              fill
              className="object-cover scale-110 transition-transform duration-300 group-hover:scale-100"
            />
          </div>
          <div className="relative w-[660px] h-[430px] overflow-hidden rounded-[20px] group">
            <Image
              src='/img/about-3.png'
              alt="about section image"
              fill
              className="object-cover scale-110 transition-transform duration-300 group-hover:scale-100"
            />
          </div>
          <div className="relative w-[660px] h-[430px] overflow-hidden rounded-[20px] group">
            <Image
              src='/img/about-2.png'
              alt="about section image"
              fill
              className="object-cover scale-110 transition-transform duration-300 group-hover:scale-100"
            />
          </div>
          <div className="relative w-[660px] h-[590px] overflow-hidden rounded-[20px] group">
            <Image
              src='/img/about-4.png'
              alt="about section image"
              fill
              className="object-cover scale-110 transition-transform duration-300 group-hover:scale-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}