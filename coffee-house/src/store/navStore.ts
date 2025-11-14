import { RegistrationResponseData } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavState {
  isOpened: boolean;
  toggle: () => void;
}
const useNavStore = create<NavState>((set) => ({
  isOpened: false,
  toggle: () => set((state) => ({
    isOpened: !state.isOpened
  }))
}));

export default useNavStore;
