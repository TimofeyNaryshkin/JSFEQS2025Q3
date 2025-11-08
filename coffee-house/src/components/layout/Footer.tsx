import translate from "@/i18n/langSwitcher"
import { Clock, Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react"
import { getLocale } from "next-intl/server"
import Link from "next/link"

export default async function Footer() {
  const locale = await getLocale()
  const { footer: t } = translate(locale)

  const socialLinkStyle = "flex items-center justify-center w-15 h-15 border border-(--color-border) rounded-full"
  const iconColor = '#E1D4C9'
  const ctaLinkStyle = 'flex gap-2 max-w-fit mb-4 relative transition-colors after:absolute after:top-6 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'

  return (
    <footer className="footer mb-10">
      <section id="contacts" >
        <div className="wrapper">
          <div className="contacts-bg flex p-25 gap-25 rounded-[40px] justify-start items-center">
            <div className="flex flex-col max-w-[530px] gap-10">
              <h2>{t.footerHeading} <i>{t.footerHeadingAccent}</i></h2>
              <div className="flex justify-between max-w-[204px]">
                <Link href='https://x.com/' target='_blank' className={socialLinkStyle}>
                  <Twitter strokeWidth={1} stroke={iconColor} />
                </Link>
                <Link href='https://www.instagram.com/' target='_blank' className={socialLinkStyle}>
                  <Instagram strokeWidth={1} stroke={iconColor} />
                </Link>
                <Link href='https://www.facebook.com' target='_blank' className={socialLinkStyle}>
                  <Facebook strokeWidth={1} stroke={iconColor} />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-10">{t.cta}</h3>
              <Link
                className={ctaLinkStyle}
                target='_blank'
                href='https://www.google.com/maps/place/%D0%94%D0%BE%D0%BD%D0%B0/@41.7767485,42.3835043,9.12z/data=!4m6!3m5!1s0x4067875e4697da81:0xd4472ceb6b0fbe8b!8m2!3d41.6450015!4d41.6292529!16s%2Fg%2F11hdyflqpf?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D'>
                <MapPin strokeWidth={1.5} width={20} height={20} stroke={iconColor} />
                {t.address}
              </Link>
              <Link
                className={ctaLinkStyle}
                href='tel:+1(603)555-0123'>
                <Phone strokeWidth={1.5} width={20} height={20} stroke={iconColor} />
                +1 (603) 555-0123
              </Link>
              <Link
                className={ctaLinkStyle}
                href=''>
                <Clock strokeWidth={1.5} width={20} height={20} stroke={iconColor} />{t.workingHours}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}