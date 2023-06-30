import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create()(
  persist(
    (set) => ({
      username: null,
      user: null,
      setUsername: (name) => set(() => ({ username: name })),
      setUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["user"].includes(key))
        ),
    }
  )
);
