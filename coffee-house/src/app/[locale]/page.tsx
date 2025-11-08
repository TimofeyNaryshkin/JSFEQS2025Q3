import About from "@/components/layout/About";
import FavoriteCoffee from "@/components/layout/FavoriteCoffee";
import Hero from "@/components/layout/Hero";
import MobileApp from "@/components/layout/MobileApp";
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
