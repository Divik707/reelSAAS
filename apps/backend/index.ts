import "dotenv/config";

import express from "express";
import userAuth from "./routes/userRoutes";
import foodPartnerR from "./routes/foodPartnerRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// user routes
app.use('/api1/ve', userAuth);

//foodpartner routes
app.use('/api1/ve', foodPartnerR);

app.get('/test', (req, res) => {
    res.json({
        message: "test route"
    })
})

app.listen(port, () => {
    console.log(`Server on port ${port}`)

})