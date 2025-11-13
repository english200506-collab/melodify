import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        artist: {type: String, required: true},
        imageUrl: {type: String, required: true},
        releaseYear: {type: Number, required: true},
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

export const Album = mongoose.model("Album", albumSchema);