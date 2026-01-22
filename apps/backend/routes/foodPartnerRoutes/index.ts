import { Router } from "express";
import foodP from "../../controller/auth/foodPartner";
import foodRouter from "../../controller/food";

const foodPartnerR: Router = Router();

foodPartnerR.use('/foodpartner', foodP)
foodPartnerR.use('/foodpartner', foodRouter)

export default foodPartnerR;