import Cart from "@/components/cart/Cart";
import translate from "@/i18n/langSwitcher";
import { getLocale } from "next-intl/server";

export default async function CartPage() {

  const locale = await getLocale()
  const { cartPage: t } = translate(locale)

  return (
    <section className="pt-5 pb-[100px]">
      <div className="wrapper">
        <h2 className="text-center">{t.cartHeading}</h2>
        <Cart localeText={t}/>
      </div>
    </section>
  );
}
