import { TCartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: TCartItem[];
  addToCart: (item: TCartItem) => void;
  removeFromCart: (item: TCartItem) => void;
  cleanCart: () => void;
}
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
      removeFromCart: (item) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.id !== item.id && i.price !== item.price
          ),
        })),
      cleanCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
