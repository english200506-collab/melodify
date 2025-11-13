import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        songs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
        reviews: [
            {
                userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                comment: {type: String},
            }
        ]
    },
    {timestamps: true}
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
