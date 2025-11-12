import { axiosInstance } from "@/lib/axios";
import type {Album, Song, Stats} from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Playlist {
    _id: string;
    title: string;
    songs: Song[];
}

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    fetchUserPlaylists: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
    userPlaylists: Playlist[];

    createPlaylist: (title: string) => Promise<void>;
    addSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
    removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
    deletePlaylist: (playlistId: string) => Promise<void>;
    downloadPlaylist: (playlistId: string, filename?: string) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);

            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id),
            }));
            toast.success("Song deleted successfully");
        } catch (error: any) {
            console.log("Error in deleteSong", error);
            toast.error("Error deleting song");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) =>
                    song.albumId === id ? { ...song, albumId: null } : song
                ),
            }));
            toast.success("Album deleted successfully");
        } catch (error: any) {
            toast.error("Failed to delete album: " + error.message);
        } finally {
            set({ isLoading: false });
        }
    },


    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs");
            set({ songs: response.data });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/stats");
            set({ stats: response.data });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({ madeForYouSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({ trendingSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    userPlaylists: [],

    createPlaylist: async (title) => {
        try {
            const { data } = await axiosInstance.post("/playlists", { title });
            set((state) => ({ userPlaylists: [...state.userPlaylists, data] }));
            toast.success("Плейлист создан!");
        } catch (err) {
            toast.error("Ошибка при создании плейлиста");
        }
    },

    fetchUserPlaylists: async () => {
        try {
            const { data } = await axiosInstance.get("/playlists");
            set({ userPlaylists: data });
        } catch (err: any) {
            toast.error("Ошибка при загрузке плейлистов");
        }
    },

    addSongToPlaylist: async (playlistId: string, song: Song) => {
        try {
            const { data } = await axiosInstance.put(`/playlists/add-song`, {
                playlistId,
                songId: song._id
            });
            set((state) => ({
                userPlaylists: state.userPlaylists.map((pl) =>
                    pl._id === playlistId ? data : pl
                ),
            }));
            toast.success("Песня добавлена в плейлист!");
        } catch (err) {
            toast.error("Ошибка при добавлении песни");
        }
    },

    removeSongFromPlaylist: async (playlistId, songId) => {
        try {
            const { data } = await axiosInstance.put(`/playlists/${playlistId}/remove`, { songId });
            set((state) => ({
                userPlaylists: state.userPlaylists.map((pl) =>
                    pl._id === playlistId ? data : pl
                ),
            }));
            toast.success("Песня удалена из плейлиста!");
        } catch (err) {
            toast.error("Ошибка при удалении песни");
        }
    },

    deletePlaylist: async (playlistId) => {
        try {
            await axiosInstance.delete(`/playlists/${playlistId}`);
            set((state) => ({
                userPlaylists: state.userPlaylists.filter((pl) => pl._id !== playlistId),
            }));
            toast.success("Плейлист удалён!");
        } catch (err) {
            toast.error("Ошибка при удалении плейлиста");
        }
    },

    downloadPlaylist: (playlistId, filename = "playlist.json") => {
        const playlist = get().userPlaylists.find((pl) => pl._id === playlistId);
        if (!playlist) return toast.error("Плейлист не найден");

        try {
            const blob = new Blob([JSON.stringify(playlist.songs, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Плейлист скачан!");
        } catch (err) {
            toast.error("Ошибка при скачивании плейлиста");
        }
    },

}));