import type {Song} from "@/types";
import PlayButton from "./PlayButton";
import AddToPlaylist from "@/components/AddToPlaylist.tsx";

type SectionGridProps = {
    title: string;
    songs: Song[];
    isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
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
                        className="bg-card/40 p-4 rounded-md group relative cursor-pointer overflow-hidden hover:bg-card-hover/40 transition-colors duration-300"
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

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <AddToPlaylist song={song} />
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
