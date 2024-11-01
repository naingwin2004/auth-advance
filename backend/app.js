import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // allow us to parse incomming requests : req.body
app.use(cookieParser()) // allow us to parse cookie
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port : ", PORT);
});
