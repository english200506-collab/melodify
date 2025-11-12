import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Library } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <div className="h-full flex flex-col gap-2">
            {/* Navigation menu */}

            {/* Library section */}
            <div className="flex-1 rounded-lg bg-card p-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-foreground px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album: any) => (
                                <Link
                                    to={`/albums/${album._id}`}
                                    key={album._id}
                                    className="p-2 rounded-md flex items-center gap-3 group cursor-pointer hover:bg-card-hover transition-colors duration-300"
                                >
                                    <img
                                        src={album.imageUrl}
                                        alt="Playlist img"
                                        className="size-12 rounded-md flex-shrink-0 object-cover"
                                    />

                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="font-medium truncate text-foreground">{album.title}</p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            Album • {album.artist}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default LeftSidebar;
