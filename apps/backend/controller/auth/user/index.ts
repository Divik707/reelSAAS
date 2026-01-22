import { Router } from "express";
import { userSchema } from "@repo/model/schema"; 
import { userLoginSchema } from "@repo/model/schema";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "heheh";

const authC: Router = Router();

authC.post('/register', async(req, res) => {
    try {
        const zodifiedD = userSchema.safeParse(req.body);

        if (zodifiedD.error) {
            res.json({ message: "error in zodification" })
        }
         else {
            const { fullName, email, password } = zodifiedD.data;
            const userExistT = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if(userExistT) {
                res.status(400).json({
                    message: "user Already exist"
                })
            } else {
                await prisma.user.create({
                    data: {
                        fullName,
                        email,
                        password: await bcrypt.hash(password, 10)
                    }
                })
                res.status(200).json({
                    message: "user registered"
                })
            }
        }
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
          message: "internal server error"
        });
    }
})

authC.post('/user/login', async(req, res) => {
    try {
        const zodifiedD = userLoginSchema.safeParse(req.body);
        if(zodifiedD.error) {
            console.log(zodifiedD.error.message)
            res.status(400).json({
                message: "error"
            })
        } else {
            const { email, password } = zodifiedD.data;
            const userT = await prisma.user.findFirst({
                where: { email }
            })
            if(userT) {
                if(await bcrypt.compare(password, userT.password)) {
                    const token = jwt.sign({id: userT.id}, JWT_SECRET, { expiresIn: '5d'});
                  res.json({
                    message: "user signed in",
                    token: token
                })
                } else {
                    res.json({
                        message : "wrong password"
                    })
                }
            }
            else {
                res.json({
                    message: "user not registered"
                })
            }
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
          message: "internal server error"
        });
    }
})

authC.get('/logout', async(req, res) => {
    try {
        
    } catch (error) {
        
    }
})

export default authC;