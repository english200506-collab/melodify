import type { Song } from "@/types";
import PlayButton from "./PlayButton";
import AddToPlaylist from "@/components/AddToPlaylist.tsx";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

type SectionGridProps = {
    title: string;
    songs: Song[];
    isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
    const [open, setOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = (song: Song) => {
        setSelectedSong(song);
        const existingComment = song.reviews?.[0]?.comment || "";
        setComment(existingComment);
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!comment.trim() || !selectedSong) {
            toast.error("Введите текст отзыва");
            return;
        }

        setIsSubmitting(true);
        try {
            await axiosInstance.post(`/users/songs/${selectedSong._id}/review`, { comment });
            toast.success(selectedSong.reviews?.length ? "Отзыв обновлён!" : "Отзыв добавлен!");

            selectedSong.reviews = [{ comment }];
            setOpen(false);
        } catch (error: any) {
            console.error("Ошибка при добавлении отзыва:", error);
            toast.error(error.response?.data?.message || "Не удалось добавить отзыв");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <div
                        key={song._id}
                        className="bg-card/40 p-4 rounded-xl group relative cursor-pointer overflow-hidden hover:bg-card-hover/40 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <div className="relative mb-4">
                            <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                                <img
                                    src={song.imageUrl}
                                    alt={song.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayButton song={song} />
                            </div>

                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <AddToPlaylist song={song} />

                                {/* 💬 Кнопка для отзыва */}
                                <Dialog open={open && selectedSong?._id === song._id} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full shadow hover:scale-105 transition-transform"
                                            onClick={() => handleOpen(song)}
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg font-semibold text-foreground">
                                                Отзыв о песне
                                            </DialogTitle>
                                        </DialogHeader>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {song.title} — {song.artist}
                                        </p>
                                        <Textarea
                                            placeholder="Оставьте отзыв..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700 text-sm mb-4"
                                        />
                                        <Button
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Отправка..." : "Сохранить отзыв"}
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <h3 className="font-medium mb-2 truncate text-foreground">{song.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionGrid;
