import { z } from "zod"

export const userSchema = z.object({
    fullName: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"}),
    email: z.string(),
    password: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"})
})

export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"})
})

export const foodPartnerRegister = z.object({
    fullName: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"}),
    email: z.string(),
    password: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"})
})

export const foodPartnerLogin = z.object({
    email: z.string(),
    password: z.string().max(10, {message: "character limit excessed"}).min(2, {message: "very small"})
})

export const foodUploadSchema = z.object({
    title: z.string(),
    description: z.string()
})