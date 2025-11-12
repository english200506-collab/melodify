import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios.ts";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await axiosInstance.post("/auth/register", {
                fullName,
                email,
                password,
            });

            // Вход после регистрации
            login(data.token, { email, id: data.userId, fullName: data.fullName });


            // Перенаправляем на главную
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Ошибка регистрации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
            <form
                onSubmit={handleRegister}
                className="bg-zinc-800 p-8 rounded-md w-full max-w-md space-y-6"
            >
                <h1 className="text-2xl font-bold text-center">Регистрация</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader className="animate-spin size-5 mx-auto" /> : "Зарегистрироваться"}
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;
