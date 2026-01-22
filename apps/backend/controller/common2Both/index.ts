import { Router } from "express";
import { prisma } from "@repo/db/client";

const common = Router();


common.get('/get', async(req, res) => {
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


export default common;