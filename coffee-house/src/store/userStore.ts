import { RegistrationResponseData } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  data: RegistrationResponseData | undefined;
  isAuth: boolean;
  signin: (data: RegistrationResponseData) => void;
  signout: () => void;
}
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      data: undefined,
      isAuth: false,
      signin: (data) => set({ data, isAuth: true }),
      signout: () => set({ data: undefined, isAuth: false }),
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
