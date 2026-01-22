import { Router } from "express";
import { foodPartnerAuth } from "../../middleware";
import { foodUploadSchema } from "@repo/model/schema";
import type { Request, Response } from "express";
import multer from "multer";
import { prisma } from "@repo/db/client";


const foodRouter :Router = Router();
export interface AuthenticatedRequest extends Request {
    foodPartner?: {
      id: string;
    };
  }
const uploads = multer({
    storage: multer.memoryStorage()
})
//potected route only food partner can post reel 
// user can only see those reels

foodRouter.post('/post', foodPartnerAuth, uploads.single("vedio"), async(req:AuthenticatedRequest, res: Response) => {
    try {
        const zodifiedD = foodUploadSchema.safeParse(req.body);
        if(zodifiedD.error) {
            console.log(zodifiedD.error.message)
        } else {
           const foodPartner = req.foodPartner;

           if (!foodPartner?.id) {
            return res.status(401).json({
              success: false,
              message: "Authenticated food partner ID not found",
            });
          }

           await prisma.food.create({
            data :{
                foodPartnerId: {
                    connect : {
                        id: foodPartner.id
                    }
                },
                vedio: zodifiedD.data.vedio,
                description: zodifiedD.data.description
            }
           })
           res.json({
            message: "vedio uploaded"
           })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
})

export default foodRouter;