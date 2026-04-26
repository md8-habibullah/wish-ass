import type { Request, Response } from "express";
import { aiService } from "./ai.service";

const chat = async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const response = await aiService.chatWithAI(message, history || []);
    res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const aiController = {
  chat,
};
