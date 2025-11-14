import { ModalItem } from "@/types/cart"
import { Additive, Size } from "@/types/product"

interface Props {
  size?: [string, Size]
  additive?: [string, Additive]
  selectSize?: () => void
  toggleAdditive?: () => void
  cartItem: ModalItem
}

export default function ModalButton({ size, additive, selectSize, toggleAdditive, cartItem }: Props) {

  const isSelectedSize = cartItem.size.size === size?.[1].size
  const isSelectedAdditive = additive && cartItem.extras.includes(additive?.[1])
  const isActive = isSelectedSize || isSelectedAdditive

  return (
    <button
      onClick={selectSize || toggleAdditive}
      className={`flex items-center justify-center cursor-pointer h-[46px] py-2 pl-2 pr-4 gap-2 rounded-[100px] border border-(--color-border) action 
        ${isActive
          ? 'bg-(--color-bg-container) text-(--color-text-second)'
          : 'bg-(--color-bg)'}`}>
      <div className={
        `w-[30px] h-[30px] rounded-full bg-center bg-no-repeat  
        ${isActive
          ? 'bg-(--color-bg) text-(--color-text)'
          : 'bg-(--color-border)'}`
      }>
        {size ? size[0].toUpperCase() : additive ? +additive[0] + 1 : ''}
      </div>
      {size ? size[1].size : additive ? additive[1].name : ''}
    </button>
  )
}