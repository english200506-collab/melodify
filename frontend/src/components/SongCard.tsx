import { useMusicStore } from "@/stores/useMusicStore";
import {type ReactNode, useState} from "react";
import type {Song} from "@/types";

interface SongCardProps {
    song: Song;
    children: ReactNode;
}

const SongCard = ({ song, children }: SongCardProps) => {
    const { userPlaylists, addSongToPlaylist } = useMusicStore();
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

    const handleAdd = () => {
        if (!selectedPlaylist) return alert("Выберите плейлист!");
        addSongToPlaylist(selectedPlaylist, song);
    };

    return (
        <div className="relative">
            {children}
            <div className="absolute top-2 right-2 flex gap-1 items-center">
                <select
                    value={selectedPlaylist}
                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                    className="p-1 border rounded bg-white text-black"
                >
                    <option value="">Плейлист</option>
                    {userPlaylists.map((pl) => (
                        <option key={pl._id} value={pl._id}>{pl.title}</option>
                    ))}
                </select>
                <button
                    className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SongCard;
