import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE
mongoose.connect(DB).then(cn => console.log("DB CONNECTED"))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server running on port ${port}`))