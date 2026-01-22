import { Router } from "express";
import authC from "../../controller/auth/user";

const userAuth = Router();

userAuth.use('/reeler/user',  authC);
export default userAuth;