'use client'

import translate from "@/i18n/langSwitcher";
import { Category, Product } from "@/types/product";
import { useLocale } from "next-intl";
import { use, useState } from "react";
import CategoryButtons from "./CategoryButtons";
import MenuProducts from "./MenuProducts";

interface Props {
  products: Promise<Product[]>
}

export default function Menu({ products }: Props) {
  const categories: Category[] = ['coffee', 'tea', 'dessert']
  const [category, setCategory] = useState<Category>(categories[0]);

  const menuProducts = use(products)

  const locale = useLocale()
  const { menuPage: t, messages: m } = translate(locale)

  if (!menuProducts.length) {
    return (
      <h3 className="text-center">{m.smthWentWrongReload}</h3>
    )
  }

  return (
    <>
      <h2 className="max-w-[800px] text-center mx-auto mb-10">{t.menuHeading}<i>{t.menuHeadingAccent}</i></h2>
      <CategoryButtons categories={categories} currentCategory={category} localeText={t} onClick={setCategory} />
      <MenuProducts products={menuProducts} currentCategory={category} />
    </>
  )
}