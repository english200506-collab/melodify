import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { useTheme } from "@/providers/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Sun, Moon } from "lucide-react";
import { axiosInstance } from "@/lib/axios.ts";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFullName(user.fullName || "");
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { data } = await axiosInstance.put("/auth/profile", {
                fullName,
                password: password || undefined,
            });

            updateUser({ fullName: data.fullName });
            setSuccess("Профиль успешно обновлен!");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Ошибка обновления профиля");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background text-foreground transition-colors duration-300">
            <form
                onSubmit={handleSave}
                className="bg-card p-8 rounded-md w-full max-w-md space-y-6 shadow-lg transition-colors duration-300"
            >
                <h1 className="text-2xl font-bold text-center">Профиль</h1>

                {error && <p className="text-destructive text-sm">{error}</p>}
                {success && <p className="text-accent text-sm">{success}</p>}

                <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <Input type="email" placeholder="Email" value={email} disabled />
                <Input
                    type="password"
                    placeholder="Новый пароль (оставьте пустым, если не хотите менять)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader className="animate-spin size-5 mx-auto" /> : "Сохранить"}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={toggleTheme}
                >
                    {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Выйти
                </Button>
            </form>
        </div>
    );
};

export default ProfilePage;
