import { usePlayerStore } from "@/stores/usePlayerStore";
import { Button } from "@/components/ui/button";
import type { Playlist } from "@/types";
import { Play, Pause } from "lucide-react";

interface PlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

    if (playlist.songs.length === 0) return null;

    const firstSong = playlist.songs[0];
    const isCurrentSong = currentSong?._id === firstSong._id;

    const handlePlay = () => {
        if (isCurrentSong) togglePlay();
        else setCurrentSong(firstSong);
    };

    return (
        <div className="bg-card/40 p-4 rounded-md hover:bg-card-hover/40 cursor-pointer group relative overflow-hidden">
            <p className="font-medium mb-2 truncate">{playlist.title}</p>
            <p className="text-sm text-muted-foreground truncate">{playlist.songs.length} songs</p>

            <Button
                onClick={handlePlay}
                size="icon"
                className={`
                    absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 
                    opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 
                    transition-all duration-200
                `}
            >
                {isCurrentSong && isPlaying ? (
                    <Pause className="size-5 text-black" />
                ) : (
                    <Play className="size-5 text-black" />
                )}
            </Button>
        </div>
    );
};

export default PlaylistCard;
