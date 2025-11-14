import { Category } from "@/types/product";

interface Props {
  category: Category
  onClick: () => void
  c: Category
  text: string
}

export default function CategoryButton({ category, onClick, c, text }: Props) {

  const isActive = category === c

  return (
    <button onClick={onClick} key={category}
      className={`flex items-center justify-center cursor-pointer h-[46px] py-2 pl-2 pr-4 gap-2 rounded-[100px] border border-(--color-border) action 
        ${isActive
          ? 'bg-(--color-bg-container) text-(--color-text-second)'
          : 'bg-(--color-bg)'}`}>
      <div className={
        `w-[30px] h-[30px] rounded-full bg-center bg-no-repeat  
        ${isActive
          ? 'bg-(--color-bg)'
          : 'bg-(--color-border)'}`
      }
        style={{ backgroundImage: `url(/img/${c.toLowerCase()}.png)` }}
      >
      </div>
      {text}
    </button>
  )
}