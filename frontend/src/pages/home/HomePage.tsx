import Topbar from "@/components/Topbar";
import {useMusicStore} from "@/stores/useMusicStore";
import {useEffect, useMemo} from "react";
import FeaturedSection from "./components/FeaturedSection.tsx";
import {ScrollArea} from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import {usePlayerStore} from "@/stores/usePlayerStore";
import PlaylistSection from "@/components/PlaylistSection.tsx";
import {cn} from "@/lib/utils.ts";

const HomePage = () => {
    const {
        fetchFeaturedSongs,
        fetchMadeForYouSongs,
        fetchTrendingSongs,
        fetchUserPlaylists,
        isLoading,
        madeForYouSongs,
        featuredSongs,
        trendingSongs,
        searchText,
        genres,
        selectedGenre,
        setSelectedGenre,
    } = useMusicStore();

    const {initializeQueue} = usePlayerStore();

    useEffect(() => {
        fetchFeaturedSongs();
        fetchMadeForYouSongs();
        fetchTrendingSongs();
        fetchUserPlaylists();
    }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchUserPlaylists]);

    useEffect(() => {
        if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
            initializeQueue(allSongs);
        }
    }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

    const searchedSongs = useMemo(() => {
        const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];

        if (!searchText && !selectedGenre) return [];

        const lowerSearch = searchText.toLowerCase();

        const filtered = allSongs.filter((song) => {
            const matchesSearch =
                !searchText ||
                song.title.toLowerCase().includes(lowerSearch) ||
                song.artist.toLowerCase().includes(lowerSearch) ||
                song.genre.toLowerCase().includes(lowerSearch) ||
                song.keywords.some((kw) => kw.toLowerCase().includes(lowerSearch));

            const matchesGenre = !selectedGenre || song.genre === selectedGenre;

            return matchesSearch && matchesGenre;
        });

        const uniqueSongs = Array.from(new Map(filtered.map((s) => [s._id, s])).values());

        return uniqueSongs;
    }, [searchText, selectedGenre, featuredSongs, madeForYouSongs, trendingSongs]);

    return (
        <main
            className="rounded-md overflow-hidden h-full bg-background text-foreground transition-colors duration-300">
            <Topbar/>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm font-medium border",
                                    selectedGenre === genre ? "bg-primary text-white" : "bg-background border-border"
                                )}
                                onClick={() => setSelectedGenre(selectedGenre === genre ? "" : genre)} // снимаем фильтр при повторном клике
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    {searchedSongs.length > 0 ? (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Searched Songs</h2>
                            <SectionGrid songs={searchedSongs} title="" isLoading={isLoading}/>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
                            <FeaturedSection/>
                            <PlaylistSection/>

                            <div className="space-y-8">
                                <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
                                <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
                            </div>
                        </>
                    )}
                </div>
            </ScrollArea>
        </main>
    );
};

export default HomePage;
