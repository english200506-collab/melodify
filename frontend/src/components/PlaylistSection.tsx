import { useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Button } from "@/components/ui/button";
import PlaylistCard from "@/components/PlaylistCart.tsx";

const PlaylistsSection = () => {
    const { userPlaylists, createPlaylist } = useMusicStore();
    const [newTitle, setNewTitle] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        if (!newTitle.trim()) return;
        setIsCreating(true);
        await createPlaylist(newTitle);
        setNewTitle("");
        setIsCreating(false);
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">My Playlists</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New playlist title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-2 rounded-md border border-muted/50 bg-card text-foreground"
                    />
                    <Button onClick={handleCreate} disabled={isCreating}>
                        {isCreating ? "Создание..." : "+"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {userPlaylists.map((pl) => (
                    <PlaylistCard key={pl._id} playlist={pl} />
                ))}
            </div>
        </div>
    );
};

export default PlaylistsSection;
