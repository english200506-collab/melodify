import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    addAlbumReview,
    addPlaylistReview,
    addSongReview,
    getAllUsers,
    getMessages
} from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);

router.post("/albums/:albumId/review", protectRoute, addAlbumReview);
router.post("/songs/:songId/review", protectRoute, addSongReview);
router.post("/playlists/:playlistId/review", protectRoute, addPlaylistReview);

export default router;