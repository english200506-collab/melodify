import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useParams } from "react-router-dom";
import { Clock, Play, Pause } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Music } from 'lucide-react';
import {useEffect, useState} from "react";

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const { userPlaylists } = useMusicStore();
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    const [playlist, setPlaylist] = useState<any>(null);

    // Обновляем локальный плейлист при изменении userPlaylists
    useEffect(() => {
        const pl = userPlaylists.find((p) => p._id === playlistId);
        if (pl) setPlaylist(pl);
    }, [userPlaylists, playlistId]);

    if (!playlist) return <div>Playlist not found</div>;

    const handlePlayPlaylist = () => {
        if (!playlist.songs?.length) return;
        const isCurrent = playlist.songs.some((s: any) => s._id === currentSong?._id);
        if (isCurrent) togglePlay();
        else playAlbum(playlist.songs, 0);
    };

    const handlePlaySong = (index: number) => {
        if (!playlist.songs?.length) return;
        playAlbum(playlist.songs, index);
    };

    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                <div className="relative min-h-full">
                    {/* Header */}
                    <div className="flex p-6 gap-6 pb-8">
                        <Music className="w-[240px] h-[240px] shadow-xl rounded"/>
                        <div className="flex flex-col justify-end">
                            <p className="text-sm font-medium">Playlist</p>
                            <h1 className="text-7xl font-bold my-4">{playlist.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-zinc-100">
                                <span>• {playlist.songs.length} songs</span>
                            </div>
                        </div>
                    </div>

                    {/* Play button */}
                    <div className="px-6 pb-4 flex items-center gap-6">
                        <Button
                            onClick={handlePlayPlaylist}
                            size="icon"
                            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                        >
                            {isPlaying &&
                            playlist.songs.some((song: any) => song._id === currentSong?._id) ? (
                                <Pause className="h-7 w-7 text-black" />
                            ) : (
                                <Play className="h-7 w-7 text-black" />
                            )}
                        </Button>
                    </div>

                    {/* Songs Table */}
                    <div className="bg-black/20 backdrop-blur-sm">
                        {/* Table header */}
                        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                            <div>#</div>
                            <div>Title</div>
                            <div>Artist</div>
                            <div>
                                <Clock className="h-4 w-4" />
                            </div>
                        </div>

                        {/* Songs list */}
                        <div className="px-6">
                            <div className="space-y-2 py-4">
                                {playlist.songs.map((song: any, index: any) => {
                                    const isCurrentSong = currentSong?._id === song._id;
                                    return (
                                        <div
                                            key={song._id}
                                            onClick={() => handlePlaySong(index)}
                                            className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                                        >
                                            <div className="flex items-center justify-center">
                                                {isCurrentSong && isPlaying ? (
                                                    <div className="text-green-500">♫</div>
                                                ) : (
                                                    <span className="group-hover:hidden">{index + 1}</span>
                                                )}
                                                {!isCurrentSong && (
                                                    <Play className="h-4 w-4 hidden group-hover:block" />
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={song.imageUrl || "/default-song.png"}
                                                    alt={song.title}
                                                    className="size-10"
                                                />
                                                <div>
                                                    <div className="font-medium text-white">{song.title}</div>
                                                    <div>{song.artist}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">{song.artist}</div>
                                            <div className="flex items-center">{formatDuration(song.duration)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default PlaylistPage;
