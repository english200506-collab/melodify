import { Playlist } from "../models/playlist.model.js";

// Создание нового плейлиста
export const createPlaylist = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId; // берём из middleware

        const playlist = await Playlist.create({ title, userId, songs: [] });
        res.status(201).json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Добавление песни в плейлист
export const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        if (playlist.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Доступ запрещён" });
        }

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        }

        const populatedPlaylist = await Playlist.findById(playlistId).populate("songs");

        res.json(populatedPlaylist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Удаление песни из плейлиста
export const removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        if (playlist.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Доступ запрещён" });
        }

        playlist.songs = playlist.songs.filter((s) => s.toString() !== songId);
        await playlist.save();

        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Удаление плейлиста
export const deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        if (playlist.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Доступ запрещён" });
        }

        await playlist.remove();
        res.json({ message: "Playlist deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Получение всех плейлистов пользователя
export const getUserPlaylists = async (req, res) => {
    try {
        const userId = req.userId;
        const playlists = await Playlist.find({ userId }).populate("songs");
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
