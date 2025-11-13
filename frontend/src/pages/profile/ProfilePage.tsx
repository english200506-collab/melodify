import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { useTheme } from "@/providers/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Sun, Moon } from "lucide-react";
import { axiosInstance } from "@/lib/axios.ts";
import { useNavigate } from "react-router-dom";
import {useMusicStore} from "@/stores/useMusicStore.ts";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";


const ProfilePage = () => {
    const {userPlaylists} = useMusicStore();
    const { user, logout, updateUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    console.log(userPlaylists);

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

    const handleDownloadPlaylist = async (playlist: any) => {
        if (!playlist?.songs?.length) return;

        const zip = new JSZip();

        // Добавляем все песни в zip
        for (const song of playlist.songs) {
            const response = await fetch(song.audioUrl);
            const blob = await response.blob();
            zip.file(`${song.title}.mp3`, blob);
        }

        // Генерируем zip и скачиваем
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${playlist.title}.zip`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            {/* Плейлисты */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Мои плейлисты</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {userPlaylists.map((playlist: any) => (
                        <div
                            key={playlist._id}
                            className="bg-card p-4 rounded-md shadow hover:shadow-lg transition-shadow w-64 flex flex-col"
                        >
                            <img
                                src={playlist.songs[0]?.imageUrl || "/default-cover.png"}
                                alt={playlist.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="font-semibold text-lg mb-2 text-center">{playlist.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 text-center">
                                {playlist.songs.length} {playlist.songs.length === 1 ? "песня" : "песен"}
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                className="mt-auto flex items-center justify-center gap-2"
                                onClick={() => handleDownloadPlaylist(playlist)}
                            >
                                <Download className="size-4" />
                                Скачать
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Форма профиля */}
            <div className="flex justify-center">
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
        </div>
    );
};

export default ProfilePage;
