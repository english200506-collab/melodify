import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import {Song} from "../models/song.model.js";
import {Playlist} from "../models/playlist.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.user.id;
        const users = await User.find({ _id: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.user.id;
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: myId },
                { senderId: myId, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};

export const addAlbumReview = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        if (!comment) return res.status(400).json({ message: "Comment is required" });

        const album = await Album.findById(albumId);
        if (!album) return res.status(404).json({ message: "Album not found" });

        const existingReview = album.reviews.find(r => r.userId.toString() === userId);
        if (existingReview) {
            existingReview.comment = comment; // обновляем существующий отзыв
        } else {
            album.reviews.push({ userId, comment }); // добавляем новый
        }

        await album.save();
        res.status(200).json(album.reviews);
    } catch (error) {
        next(error);
    }
};

export const addSongReview = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        if (!comment) return res.status(400).json({ message: "Comment is required" });

        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ message: "Song not found" });

        const existingReview = song.reviews.find(r => r.userId.toString() === userId);
        if (existingReview) {
            existingReview.comment = comment;
        } else {
            song.reviews.push({ userId, comment });
        }

        await song.save();
        res.status(200).json(song.reviews);
    } catch (error) {
        next(error);
    }
};

export const addPlaylistReview = async (req, res, next) => {
    try {
        const { playlistId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        if (!comment) return res.status(400).json({ message: "Comment is required" });

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        const existingReview = playlist.reviews.find(r => r.userId.toString() === userId);
        if (existingReview) {
            existingReview.comment = comment;
        } else {
            playlist.reviews.push({ userId, comment });
        }

        await playlist.save();
        res.status(200).json(playlist.reviews);
    } catch (error) {
        next(error);
    }
};
