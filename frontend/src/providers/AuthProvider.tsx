import { useEffect, useState, createContext, useContext } from "react";
import { axiosInstance } from "@/lib/axios.ts";
import { Loader } from "lucide-react";

interface AuthContextType {
    user: { email: string; id: string; fullName: string } | null;
    token: string;
    login: (token: string, userData: { email: string; id: string; fullName: string }) => void;
    logout: () => void;
    updateUser: (newData: { fullName?: string; email?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ email: string; id: string; fullName: string } | null>(null);
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            updateApiToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (jwt: string, userData: { email: string; id: string; fullName: string }) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        updateApiToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        updateApiToken(null);
    };

    const updateUser = (newData: { fullName?: string; email?: string }) => {
        if (!user) return;
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
