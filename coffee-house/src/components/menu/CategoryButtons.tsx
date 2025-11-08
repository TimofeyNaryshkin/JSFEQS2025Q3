'use client'

import { Category } from "@/types/product"
import CategoryButton from "../ui/CategoryButton"

interface Props {
  categories: Category[]
  currentCategory: Category
  localeText: Record<Category, string>
  onClick: (category: Category) => void
}

export default function CategoryButtons({ categories, currentCategory, localeText, onClick }: Props) {

  return (
    <div className="flex gap-4 justify-center">
      {categories.map((c) =>
        <CategoryButton
          key={c}
          category={currentCategory}
          c={c}
          text={localeText[c]}
          onClick={() => onClick(c)} />
      )}
    </div>
  )
}