'use client'

import Link from "next/link";
import Nav from "./Nav";
import useUserStore from "@/store/userStore";
import { Coffee } from "lucide-react";
import useNavStore from "@/store/navStore";
import { MouseEvent, useEffect } from "react";
import Wrapper from "../Wrapper";

interface Props {
  localeText: {
    favCoffee: string
    about: string
    mobileApp: string
    cta: string
    signIn: string;
    registration: string;
    signOut: string;
    menu: string
  }
}

const buttonStyle = "action block py-2.5 px-2.5 min-w-[200px] text-center border border-(--color-border-second) rounded-[100px] cursor-pointer"
const linkStyle = "flex max-w-fit items-center gap-2 relative transition-colors after:absolute after:top-9 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"

export default function MobileNav({ localeText }: Props) {
  const { isAuth, signout } = useUserStore((state) => state)
  const { isOpened, toggle } = useNavStore((state) => state)

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    toggle()
  }

  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpened])

  return (
    <div onClick={(e) => handleClick(e)}
      className={`${isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
    fixed
    backdrop-blur-xl
    inset-0
    bg-black/70
    text-(--color-text-second)
    transition-opacity
    duratin 300
    z-40 px-4 py-15 
    flex items-start 
    lg:hidden`}>
      <Wrapper styles="**:text-4xl! flex flex-col items-start justify-center gap-10 max-w-fit">
        <nav>
          <ul className="flex flex-col gap-10">
            <li>
              <Link href='/#favorite' className={linkStyle}>{localeText.favCoffee}</Link>
            </li>
            <li>
              <Link href='/#about' className={linkStyle}>{localeText.about}</Link>
            </li>
            <li>
              <Link href='/#mobile-app' className={linkStyle}>{localeText.mobileApp}</Link>
            </li>
            <li>
              <Link href='#contacts' className={linkStyle}>{localeText.cta}</Link>
            </li>
          </ul>
        </nav>
        <Link href='/menu' className={linkStyle}>{localeText.menu}<Coffee width={30} height={30} /></Link>
        {isAuth
          ?
          <button onClick={signout} className={buttonStyle}>{localeText.signOut}</button>
          :
          <>
            <Link href='/auth/signin' className={buttonStyle}>{localeText.signIn}</Link>
            <Link href='/auth/register' className={buttonStyle}>{localeText.registration}</Link>
          </>}
      </Wrapper>
    </div>
  )
}