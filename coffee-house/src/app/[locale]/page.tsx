import About from "@/components/main/About";
import FavoriteCoffee from "@/components/main/FavoriteCoffee";
import Hero from "@/components/main/Hero";
import MobileApp from "@/components/main/MobileApp";
import translate from "@/i18n/langSwitcher";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale()
  const { mainPage: t } = translate(locale)

  return (
    <>
      <Hero localeText={t} />
      <FavoriteCoffee localeText={t} />
      <About localeText={t} />
      <MobileApp localeText={t} />
    </>
  );
}
