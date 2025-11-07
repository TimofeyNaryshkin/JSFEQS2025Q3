import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href='/'>
      <Image src='/icons/logo.svg' alt="logo" width={100} height={60}/>
    </Link>
  )
}