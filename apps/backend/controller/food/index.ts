import { Router } from "express";
import { foodPartnerAuth } from "../../middleware";
import { foodUploadSchema } from "@repo/model/schema";
import type { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid"; 
import { prisma } from "@repo/db/client";
import { uploadFile } from "../../api/storage.services";

const foodRouter: Router = Router();

export interface AuthenticatedRequest extends Request {
  foodPartner?: {
    id: string;
  };
}

const uploads = multer({
  storage: multer.memoryStorage(),
});

foodRouter.post(
  "/post",
  foodPartnerAuth,
  uploads.single("video"), // ← fixed typo from "vedio"
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const parsed = foodUploadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
          errors: parsed.error.errors,
        });
      }

      const foodPartner = req.foodPartner;
      if (!foodPartner?.id) {
        return res.status(401).json({
          success: false,
          message: "Authenticated food partner ID not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No video file uploaded",
        });
      }

      const extension = req.file.mimetype.split("/")[1] || "mp4";
      const fileName = `${uuidv4()}.${extension}`;

      const uploadRes = await uploadFile(req.file.buffer, fileName);

      if (!uploadRes) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload video file",
        });
      }

      await prisma.food.create({
        data: {
          video: uploadRes.url,           
          title: parsed.data.title,
          description: parsed.data.description,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Video posted successfully",
        videoUrl: uploadRes.url,
      });
    } catch (error: any) {
      console.error("Post creation error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to post video",
        error: error.message || "Unknown error",
      });
    }
  }
);

export default foodRouter;