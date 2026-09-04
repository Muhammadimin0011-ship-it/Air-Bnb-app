import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create()(
    persist((set) => ({
        accessToken: null, user: null,
        
        setAccessToken: (token) =>
            set((state) => ({ ...state, accessToken: token })),
        setUser: (user) => set((state) => ({ ...state, user }))
    }), { name: "auth" }),

);