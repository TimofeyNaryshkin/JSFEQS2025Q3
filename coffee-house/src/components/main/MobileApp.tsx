import Image from "next/image"
import Link from "next/link"
import Wrapper from "../layout/Wrapper"

interface Props {
  localeText: {
    mobileAppHeading: string
    mobileAppHeadingAccent: string
    mobileAppText: string
    availableOn: string
  }
}

export default function MobileApp({ localeText: t }: Props) {


  const linkStyle = "flex gap-2 items-center w-[200px] outline-2 rounded-[100px] py-3 pr-[43px] pl-5"

  return (
    <section id="mobile-app" className="mb-[100px]">
      <Wrapper>
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="max-w-[630px]">
            <h2><i>{t.mobileAppHeadingAccent}</i>{t.mobileAppHeading}</h2>
            <p className="medium my-10">{t.mobileAppText}</p>
            <div className="flex justify-between max-w-[420px]">
              <Link href='https://www.apple.com/app-store/' target='_blank' className={linkStyle}>
                <div className="bg-[url(/icons/apple.svg)] w-9 h-9 bg-center bg-contain bg-no-repeat"></div>
                <div>
                  <p className="caption">{t.availableOn}</p>
                  <p>App Store</p>
                </div>
              </Link>
              <Link href='https://play.google.com/store' target='_blank' className={linkStyle}>
                <div className="bg-[url(/icons/google.svg)] w-9 h-9 bg-center bg-contain bg-no-repeat"></div>
                <div>
                  <p className="caption">{t.availableOn}</p>
                  <p>Google Play</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative w-[630px] h-[630px]">
            <Image src='/img/mobile-screens.png' alt="mobile app image" fill />
          </div>
        </div>
      </Wrapper>
    </section >
  )
}