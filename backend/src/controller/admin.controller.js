import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all files" });
        }

        const { title, artist, albumId, duration, genre, keywords } = req.body;

        if (!genre) {
            return res.status(400).json({ message: "Genre is required" });
        }

        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
            genre,
            keywords: keywords ? JSON.parse(keywords) : [],
        });

        await song.save();

        // if song belongs to an album, update the album's songs array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }

        res.status(201).json(song);
    } catch (error) {
        console.log("Error in createSong", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);

        // if song belongs to an album, update the album's songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id },
            });
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum", error);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log("Error in deleteAlbum", error);
        next(error);
    }
};

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const checkAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "Нет токена" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        const isAdmin = user.email === process.env.ADMIN_EMAIL;

        res.status(200).json({ admin: isAdmin });
    } catch (error) {
        console.error("Ошибка проверки админа:", error);
        res.status(500).json({ message: "Ошибка при проверке прав администратора" });
    }
};
