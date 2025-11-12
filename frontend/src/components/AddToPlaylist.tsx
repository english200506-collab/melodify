import { useMusicStore } from "@/stores/useMusicStore";
import type { Song } from "@/types";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddToPlaylistProps {
    song: Song;
}

const AddToPlaylist = ({ song }: AddToPlaylistProps) => {
    const { userPlaylists, addSongToPlaylist } = useMusicStore();
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

    const handleAdd = async () => {
        if (!selectedPlaylist) return;
        await addSongToPlaylist(selectedPlaylist, song);
        setSelectedPlaylist("");
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors duration-200">
                    +
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-60 p-2">
                {userPlaylists.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Нет плейлистов</p>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Select onValueChange={setSelectedPlaylist} value={selectedPlaylist}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите плейлист" />
                            </SelectTrigger>
                            <SelectContent>
                                {userPlaylists.map((pl) => (
                                    <SelectItem key={pl._id} value={pl._id}>
                                        {pl.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedPlaylist && (
                            <Button variant="default" onClick={handleAdd} className="w-full">
                                Добавить
                            </Button>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default AddToPlaylist;
