import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

const getAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { active: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch announcements" });
    }
};

const createAnnouncement = async (req: Request, res: Response) => {
    try {
        const { title, content, type } = req.body;
        const announcement = await prisma.announcement.create({
            data: { title, content, type }
        });
        res.status(201).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create announcement" });
    }
};

const updateAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const announcement = await prisma.announcement.update({
            where: { id },
            data
        });
        res.status(200).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update announcement" });
    }
};

const deleteAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.announcement.delete({ where: { id } });
        res.status(200).json({ success: true, message: "Announcement deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete announcement" });
    }
};

export const announcementController = {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
