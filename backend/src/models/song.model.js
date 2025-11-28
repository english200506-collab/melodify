import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        audioUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        albumId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            required: false,
        },
        genre: {
            type: String,
            required: true,
        },
        playCount: {
            type: Number,
            default: 0, // Начинаем с 0
        },
        keywords: [
            {
                type: String,
            },
        ],
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                comment: { type: String },
            }
        ],
    },
    { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);