// import mongoose from "mongoose";
// import { Song } from "../models/song.model.js";
// import { Album } from "../models/album.model.js";
// import { config } from "dotenv";
//
// config();
//
// const seedDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//
//         // Clear existing data
//         await Album.deleteMany({});
//         await Song.deleteMany({});
//
//         // First, create all songs
//         const createdSongs = await Song.insertMany([
//             {
//                 title: "City Rain",
//                 artist: "Urban Echo",
//                 imageUrl: "/cover-images/7.jpg",
//                 audioUrl: "/songs/7.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 39, // 0:39
//             },
//             {
//                 title: "Neon Lights",
//                 artist: "Night Runners",
//                 imageUrl: "/cover-images/5.jpg",
//                 audioUrl: "/songs/5.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 36, // 0:36
//             },
//             {
//                 title: "Urban Jungle",
//                 artist: "City Lights",
//                 imageUrl: "/cover-images/15.jpg",
//                 audioUrl: "/songs/15.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 36, // 0:36
//             },
//             {
//                 title: "Neon Dreams",
//                 artist: "Cyber Pulse",
//                 imageUrl: "/cover-images/13.jpg",
//                 audioUrl: "/songs/13.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 39, // 0:39
//             },
//             {
//                 title: "Summer Daze",
//                 artist: "Coastal Kids",
//                 imageUrl: "/cover-images/4.jpg",
//                 audioUrl: "/songs/4.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 24, // 0:24
//             },
//             {
//                 title: "Ocean Waves",
//                 artist: "Coastal Drift",
//                 imageUrl: "/cover-images/9.jpg",
//                 audioUrl: "/songs/9.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 28, // 0:28
//             },
//             {
//                 title: "Crystal Rain",
//                 artist: "Echo Valley",
//                 imageUrl: "/cover-images/16.jpg",
//                 audioUrl: "/songs/16.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 39, // 0:39
//             },
//             {
//                 title: "Starlight",
//                 artist: "Luna Bay",
//                 imageUrl: "/cover-images/10.jpg",
//                 audioUrl: "/songs/10.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 30, // 0:30
//             },
//             {
//                 title: "Stay With Me",
//                 artist: "Sarah Mitchell",
//                 imageUrl: "/cover-images/1.jpg",
//                 audioUrl: "/songs/1.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 46, // 0:46
//             },
//             {
//                 title: "Midnight Drive",
//                 artist: "The Wanderers",
//                 imageUrl: "/cover-images/2.jpg",
//                 audioUrl: "/songs/2.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 41, // 0:41
//             },
//             {
//                 title: "Moonlight Dance",
//                 artist: "Silver Shadows",
//                 imageUrl: "/cover-images/14.jpg",
//                 audioUrl: "/songs/14.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 27, // 0:27
//             },
//             {
//                 title: "Lost in Tokyo",
//                 artist: "Electric Dreams",
//                 imageUrl: "/cover-images/3.jpg",
//                 audioUrl: "/songs/3.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 24, // 0:24
//             },
//             {
//                 title: "Neon Tokyo",
//                 artist: "Future Pulse",
//                 imageUrl: "/cover-images/17.jpg",
//                 audioUrl: "/songs/17.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 39, // 0:39
//             },
//             {
//                 title: "Purple Sunset",
//                 artist: "Dream Valley",
//                 imageUrl: "/cover-images/12.jpg",
//                 audioUrl: "/songs/12.mp3",
//                 plays: Math.floor(Math.random() * 5000),
//                 duration: 17, // 0:17
//             },
//         ]);
//
//         // Create albums with references to song IDs
//         const albums = [
//             {
//                 title: "Urban Nights",
//                 artist: "Various Artists",
//                 imageUrl: "/albums/1.jpg",
//                 releaseYear: 2024,
//                 songs: createdSongs.slice(0, 4).map((song) => song._id),
//             },
//             {
//                 title: "Coastal Dreaming",
//                 artist: "Various Artists",
//                 imageUrl: "/albums/2.jpg",
//                 releaseYear: 2024,
//                 songs: createdSongs.slice(4, 8).map((song) => song._id),
//             },
//             {
//                 title: "Midnight Sessions",
//                 artist: "Various Artists",
//                 imageUrl: "/albums/3.jpg",
//                 releaseYear: 2024,
//                 songs: createdSongs.slice(8, 11).map((song) => song._id),
//             },
//             {
//                 title: "Eastern Dreams",
//                 artist: "Various Artists",
//                 imageUrl: "/albums/4.jpg",
//                 releaseYear: 2024,
//                 songs: createdSongs.slice(11, 14).map((song) => song._id),
//             },
//         ];
//
//         // Insert all albums
//         const createdAlbums = await Album.insertMany(albums);
//
//         // Update songs with their album references
//         for (let i = 0; i < createdAlbums.length; i++) {
//             const album = createdAlbums[i];
//             const albumSongs = albums[i].songs;
//
//             await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
//         }
//
//         console.log("Database seeded successfully!");
//     } catch (error) {
//         console.error("Error seeding database:", error);
//     } finally {
//         mongoose.connection.close();
//     }
// };
//
// seedDatabase();

import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Очистка базы
        await Album.deleteMany({});
        await Song.deleteMany({});

        // Создание песен с жанрами и ключевыми словами
        const createdSongs = await Song.insertMany([
            {
                title: "City Rain",
                artist: "Urban Echo",
                imageUrl: "/cover-images/7.jpg",
                audioUrl: "/songs/7.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39,
                genre: "Lo-Fi",
                keywords: ["rain", "city", "chill", "lofi", "relax"],
            },
            {
                title: "Neon Lights",
                artist: "Night Runners",
                imageUrl: "/cover-images/5.jpg",
                audioUrl: "/songs/5.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36,
                genre: "Synthwave",
                keywords: ["retro", "neon", "night", "electric", "80s"],
            },
            {
                title: "Urban Jungle",
                artist: "City Lights",
                imageUrl: "/cover-images/15.jpg",
                audioUrl: "/songs/15.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36,
                genre: "Hip-Hop",
                keywords: ["city", "urban", "beat", "groove", "rhythm"],
            },
            {
                title: "Neon Dreams",
                artist: "Cyber Pulse",
                imageUrl: "/cover-images/13.jpg",
                audioUrl: "/songs/13.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39,
                genre: "Synthwave",
                keywords: ["dreams", "cyber", "future", "neon", "synth"],
            },
            {
                title: "Summer Daze",
                artist: "Coastal Kids",
                imageUrl: "/cover-images/4.jpg",
                audioUrl: "/songs/4.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24,
                genre: "Indie Pop",
                keywords: ["summer", "beach", "happy", "carefree", "pop"],
            },
            {
                title: "Ocean Waves",
                artist: "Coastal Drift",
                imageUrl: "/cover-images/9.jpg",
                audioUrl: "/songs/9.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28,
                genre: "Chillout",
                keywords: ["ocean", "waves", "relax", "calm", "chill"],
            },
            {
                title: "Crystal Rain",
                artist: "Echo Valley",
                imageUrl: "/cover-images/16.jpg",
                audioUrl: "/songs/16.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39,
                genre: "Ambient",
                keywords: ["rain", "dreamy", "soft", "nature", "slow"],
            },
            {
                title: "Starlight",
                artist: "Luna Bay",
                imageUrl: "/cover-images/10.jpg",
                audioUrl: "/songs/10.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 30,
                genre: "Indie Pop",
                keywords: ["stars", "night", "soft", "romantic", "dreamy"],
            },
            {
                title: "Stay With Me",
                artist: "Sarah Mitchell",
                imageUrl: "/cover-images/1.jpg",
                audioUrl: "/songs/1.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 46,
                genre: "Pop",
                keywords: ["love", "stay", "romance", "ballad", "emotion"],
            },
            {
                title: "Midnight Drive",
                artist: "The Wanderers",
                imageUrl: "/cover-images/2.jpg",
                audioUrl: "/songs/2.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 41,
                genre: "Rock",
                keywords: ["midnight", "drive", "road", "adventure", "freedom"],
            },
            {
                title: "Moonlight Dance",
                artist: "Silver Shadows",
                imageUrl: "/cover-images/14.jpg",
                audioUrl: "/songs/14.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 27,
                genre: "Jazz",
                keywords: ["moonlight", "dance", "romantic", "night", "smooth"],
            },
            {
                title: "Lost in Tokyo",
                artist: "Electric Dreams",
                imageUrl: "/cover-images/3.jpg",
                audioUrl: "/songs/3.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24,
                genre: "Electronic",
                keywords: ["tokyo", "future", "beats", "vibes", "travel"],
            },
            {
                title: "Neon Tokyo",
                artist: "Future Pulse",
                imageUrl: "/cover-images/17.jpg",
                audioUrl: "/songs/17.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39,
                genre: "Synthwave",
                keywords: ["neon", "tokyo", "lights", "cyber", "retro"],
            },
            {
                title: "Purple Sunset",
                artist: "Dream Valley",
                imageUrl: "/cover-images/12.jpg",
                audioUrl: "/songs/12.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 17,
                genre: "Lo-Fi",
                keywords: ["sunset", "purple", "chill", "aesthetic", "calm"],
            },
        ]);

        // Создание альбомов с привязкой песен
        const albums = [
            {
                title: "Urban Nights",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(0, 4).map((song) => song._id),
            },
            {
                title: "Coastal Dreaming",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(4, 8).map((song) => song._id),
            },
            {
                title: "Midnight Sessions",
                artist: "Various Artists",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(8, 11).map((song) => song._id),
            },
            {
                title: "Eastern Dreams",
                artist: "Various Artists",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2024,
                songs: createdSongs.slice(11, 14).map((song) => song._id),
            },
        ];

        const createdAlbums = await Album.insertMany(albums);

        // Обновляем у песен ссылку на их альбом
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        console.log("✅ Database seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
