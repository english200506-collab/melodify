import { Router } from "express";
import {
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    getUserPlaylists,
} from "../controller/playlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getUserPlaylists);
router.post("/", protectRoute, createPlaylist);
router.put("/add-song", protectRoute, addSongToPlaylist);
router.put("/remove-song", protectRoute, removeSongFromPlaylist);
router.delete("/:playlistId", protectRoute, deletePlaylist);

export default router;
