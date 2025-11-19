import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
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
import {useEffect, useState} from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import {useAuth} from "@/providers/AuthProvider.tsx";

const FeaturedSection = () => {
    const { isLoading, featuredSongs: storeSongs, error } = useMusicStore();
    const { user} = useAuth();
    const [open, setOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState<any>(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [allUsers, setAllUsers] = useState<any>([]);
    const [featuredSongs, setFeaturedSongs] = useState(storeSongs);

    const handleOpen = (song: any) => {
        setSelectedSong(song);
        const myReview = song.reviews?.find((r: any) => r.userId === user?.id);
        setComment(myReview?.comment || "");
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!comment.trim() || !selectedSong) {
            toast.error("Введите текст отзыва");
            return;
        }

        setIsSubmitting(true);

        try {
            const existing = selectedSong.reviews?.find((r: any) => r.userId === user?.id);

            const { data: updatedReviews } = await axiosInstance.post(
                `/users/songs/${selectedSong._id}/review`,
                { comment }
            );

            setSelectedSong({
                ...selectedSong,
                reviews: updatedReviews
            });

            setFeaturedSongs((prev: any[]) =>
                prev.map((s) =>
                    s._id === selectedSong._id ? { ...s, reviews: updatedReviews } : s
                )
            );

            toast.success(existing ? "Отзыв обновлён!" : "Отзыв добавлен!");
            setOpen(false);

        } catch (error: any) {
            console.error("Ошибка при добавлении отзыва:", error);
            toast.error(error.response?.data?.message || "Не удалось добавить отзыв");
        } finally {
            setIsSubmitting(false);
        }
    };


    const getUserName = (id: string) => {
        if (id === user?.id) return "Вы";
        return allUsers.find((u: any) => u._id === id)?.fullName || "Пользователь";
    };

    useEffect(() => {
        axiosInstance.get("/users")
            .then(res => setAllUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setFeaturedSongs(storeSongs); // синхронизация с хранилищем
    }, [storeSongs]);


    if (isLoading) return <FeaturedGridSkeleton />;
    if (error) return <p className="text-destructive mb-4 text-lg">{error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredSongs.map((song) => (
                <div
                    key={song._id}
                    className="flex items-center bg-card/50 rounded-md overflow-hidden hover:bg-card/70 transition-colors duration-300 group relative pb-8"
                >
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
                    />

                    <div className="flex-1 p-4">
                        <p className="font-medium text-foreground truncate">{song.title}</p>
                        <p className="text-muted-foreground text-sm truncate">{song.artist}</p>
                    </div>

                    {/* Правая панель с кнопками в один ряд */}
                    <div className="flex items-center gap-2 pr-3">
                        {/* 💬 Кнопка отзыва */}
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

                                <div className="space-y-3 mb-4">
                                    {selectedSong?.reviews?.length ? (
                                        selectedSong.reviews.map((review: any) => {
                                            const isMy = review.userId === user?.id;

                                            return (
                                                <div
                                                    key={review.userId}
                                                    className={`p-3 rounded-md border
                                ${isMy ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-700"}
                            `}
                                                >
                                                    <p className="text-sm text-foreground">{review.comment}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {isMy ? "Ваш отзыв" : `${getUserName(review.userId)}` || 'Пользователь'}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Отзывов пока нет</p>
                                    )}
                                </div>

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

                        {/* ▶️ Кнопка проигрывателя */}
                        <PlayButton song={song} />
                    </div>
                </div>
            ))}
        </div>

    );
};

export default FeaturedSection;


