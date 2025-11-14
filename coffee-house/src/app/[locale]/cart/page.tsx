import Cart from "@/components/cart/Cart";
import Wrapper from "@/components/layout/Wrapper";
import translate from "@/i18n/langSwitcher";
import { getLocale } from "next-intl/server";

export default async function CartPage() {

  const locale = await getLocale()
  const { cartPage, basic } = translate(locale)

  return (
    <section className="pt-5 pb-[100px]">
      <Wrapper>
        <h2 className="text-center">{cartPage.cartHeading}</h2>
        <Cart localeText={{ cartPage, basic }} />
      </Wrapper>
    </section>
  );
}
