import express from "express";
import { announcementController } from "./announcement.controller";
import { authVerify } from "../../middleware/authVerify";

const router = express.Router();

// Public: Get active announcements
router.get("/", announcementController.getAnnouncements);

// Admin only: Manage announcements
router.post("/", authVerify(["ADMIN"]), announcementController.createAnnouncement);
router.patch("/:id", authVerify(["ADMIN"]), announcementController.updateAnnouncement);
router.delete("/:id", authVerify(["ADMIN"]), announcementController.deleteAnnouncement);

export const announcementRouter = router;
