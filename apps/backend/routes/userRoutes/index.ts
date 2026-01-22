import { Router } from "express";
import authC from "../../controller/auth/user";
import common from "../../controller/common2Both";

const userAuth = Router();

userAuth.use('/reeler/user',  authC);
userAuth.use('/reeler', common)

export default userAuth;