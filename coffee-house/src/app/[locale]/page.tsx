import About from "@/components/layout/About";
import Hero from "@/components/layout/Hero";
import translate from "@/i18n/langSwitcher";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale()
  const { mainPage: t } = translate(locale)

  return (
    <>
      <Hero localeText={t} />
      <About localeText={t} />
    </>
  );
}
