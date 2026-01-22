import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { foodPartnerAuth } from "../../middleware";
import { foodUploadSchema } from "@repo/model/schema";
import { prisma } from "@repo/db/client";
import { uploadFile } from "../../api/storage.services";

import type { Request, Response } from "express";
import { success } from "zod";

const foodRouter = Router();

export interface AuthenticatedRequest extends Request {
  foodPartner?: {
    id: string;
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024, 
  },
});

foodRouter.post(
  "/post",
  foodPartnerAuth,
  upload.single("video"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const foodPartner = req.foodPartner;
      if (!foodPartner?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed - food partner ID missing",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No video file uploaded. Field name must be 'video'.",
        });
      }

      const parseResult = foodUploadSchema.safeParse(req.body);
      if (!parseResult.success) {
        console.log("Validation error:", parseResult.error.format());
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: parseResult.error.flatten().fieldErrors,
        });
      }

      const { title, description } = parseResult.data;

      const mimeType = req.file.mimetype;
      let extension = "mp4";

      if (mimeType.startsWith("video/")) {
        extension = mimeType.split("/")[1] || "mp4";
      } else if (mimeType === "application/octet-stream") {
        extension = "mp4";
      }

      const fileName = `${uuidv4()}.${extension}`;

      const uploadResult = await uploadFile(req.file.buffer, fileName);

      if (!uploadResult?.url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload video to storage",
        });
      }

      const videoUrl = uploadResult.url;

      const newPost = await prisma.food.create({
        data: {
          foodPartnerId: foodPartner.id,
          video: videoUrl,         
          title,
          description: description ?? null,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Video posted successfully",
        post: {
          id: newPost.id,
          videoUrl: newPost.video,   
          title: newPost.title,
          description: newPost.description,
          createdAt: newPost.createdAt?.toISOString(),
        },
      });
    } catch (err: any) {
      console.error("Error in /foodpartner/post:", {
        message: err.message,
        stack: err.stack?.split("\n").slice(0, 3),
        body: req.body,
        file: req.file ? `${req.file.originalname} (${req.file.size} bytes)` : null,
      });

      return res.status(500).json({
        success: false,
        message: "Server error while creating post",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  }
);

foodRouter.get('/get', async(req, res) => {
    try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

        const posts = await prisma.food.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },select: {
                id : true,
                video : true,
                title : true,
                description: true,
                createdAt: true,
            }
        })
        const total = await prisma.food.count();

        res.json({
            data: posts.map(post => {
                post.id,
                post.title,
                post.video,
                post.createdAt
            }),
            pagination: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
})

export default foodRouter;