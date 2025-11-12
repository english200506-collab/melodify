import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Library, List as PlaylistIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading, userPlaylists, fetchUserPlaylists } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchUserPlaylists();
    }, [fetchAlbums, fetchUserPlaylists]);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="flex-1 rounded-lg bg-card p-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                    <Link to="/">
                        <div className="flex gap-2 items-center text-foreground transition-colors duration-300">
                            <img src="/spotify.png" className="size-8" alt="Spotify logo" />
                            Melodify
                        </div>
                    </Link>
                    <div className="flex items-center text-foreground px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Albums/Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            <>
                                {/* Albums */}
                                {albums.map((album: any) => (
                                    <Link
                                        to={`/albums/${album._id}`}
                                        key={album._id}
                                        className="p-2 rounded-md flex items-center gap-3 group cursor-pointer hover:bg-card-hover transition-colors duration-300"
                                    >
                                        <img
                                            src={album.imageUrl}
                                            alt="Album img"
                                            className="size-12 rounded-md flex-shrink-0 object-cover"
                                        />
                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <p className="font-medium truncate text-foreground">{album.title}</p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                Album • {album.artist}
                                            </p>
                                        </div>
                                    </Link>
                                ))}

                                {albums.length > 0 && userPlaylists.length > 0 && (
                                    <div className="my-2 border-t border-white/10" />
                                )}

                                {/* Playlists */}
                                {userPlaylists.map((pl) => (
                                    <Link
                                        to={`/playlists/${pl._id}`}
                                        key={pl._id}
                                        className="p-2 rounded-md flex items-center gap-3 group cursor-pointer hover:bg-card-hover transition-colors duration-300"
                                    >
                                        {/* Иконка плейлиста */}
                                        <div className="w-12 h-12 flex-shrink-0 rounded-md bg-purple-500 flex items-center justify-center">
                                            <PlaylistIcon className="w-6 h-6 text-white" />
                                        </div>

                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <p className="font-medium truncate text-foreground">{pl.title}</p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                Playlist • {pl.songs.length} songs
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default LeftSidebar;
