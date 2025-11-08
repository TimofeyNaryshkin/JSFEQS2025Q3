'use client'

import translate from "@/i18n/langSwitcher";
import { Category, Product } from "@/types/product";
import { useLocale } from "next-intl";
import { Suspense, useState } from "react";
import CategoryButtons from "./CategoryButtons";
import Loader from "../ui/Loader";
import MenuProducts from "./MenuProducts";

interface Props {
  products: Promise<Product[]>
}

export default function Menu({ products }: Props) {
  const categories: Category[] = ['coffee', 'tea', 'dessert']
  const [category, setCategory] = useState<Category>(categories[0]);

  const locale = useLocale()
  const { menuPage: t } = translate(locale)
  return (
    <section className="mb-[100px]">
      <div className="wrapper">
        <h2 className="max-w-[800px] text-center mx-auto mb-10">{t.menuHeading}<i>{t.menuHeadingAccent}</i></h2>
        <CategoryButtons categories={categories} currentCategory={category} localeText={t} onClick={setCategory} />
        <Suspense fallback={<Loader />}>
          <MenuProducts items={products} />
        </Suspense>
      </div>
    </section>
  )
}