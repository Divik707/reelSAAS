import { Router } from "express";
import { foodPartnerLogin, foodPartnerRegister } from "@repo/model/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db/client";

const foodP: Router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "random";

foodP.post('/register', async(req, res) => {
    try {
        const zodifiedD = foodPartnerRegister.safeParse(req.body);
        if (!zodifiedD.success) {        
            console.log("Validation errors:", zodifiedD.error.errors);
            console.log("Validation failed:", zodifiedD.error.flatten());
            
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: zodifiedD.error.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
        }
        else {
            const userExist = await prisma.foodPartner.findFirst({
                where: {
                    email: zodifiedD.data.email
                }
            })
            if(userExist) {
                res.json({
                    message: "user already registered"
                })
            } else {
                await prisma.foodPartner.create({
                    data: {
                        fullName: zodifiedD.data.fullName,
                        email: zodifiedD.data.email,
                        password: await bcrypt.hash(zodifiedD.data.password, 10)
                    }
                });
                res.json({
                    message: "food partner registered"
                })
            }
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
})

foodP.post('/login', async(req, res) => {
    try {
        const zodifiedD = foodPartnerLogin.safeParse(req.body);
        if (!zodifiedD.success) {          
            console.log("Validation errors:", zodifiedD.error.errors);
          
            console.log("Validation failed:", zodifiedD.error.flatten());
            
            
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: zodifiedD.error.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
        }
        else {
            const userT = await prisma.foodPartner.findFirst({
                where:  { 
                    email: zodifiedD.data.email
                }
            }) 
            if(userT) {
                if(await bcrypt.compare(zodifiedD.data.password, userT.password)) {
                    
                    const token = jwt.sign({id: userT.id}, JWT_SECRET, {expiresIn: '5d'});
                    res.json({
                        message: "food partner login",
                        token : token
                    })
                } else  {
                    res.json({
                        message: "incorrect password"
                    })
                }
            } else  {
                res.json({
                    message: "food partner not registered"
                })
            }
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
})

export default foodP;