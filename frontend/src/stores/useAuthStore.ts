import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: () => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Токен отсутствует");

            const response = await axiosInstance.get("/admin/check", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            set({ isAdmin: response.data.admin });
        } catch (error: any) {
            console.error("Ошибка проверки админа:", error);
            set({
                isAdmin: false,
                error: error.response?.data?.message || error.message,
            });
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => {
        set({ isAdmin: false, isLoading: false, error: null });
    },
}));
