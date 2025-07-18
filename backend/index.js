//important imports
import { Port, MONGODB_URI } from "./config.js";
import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

//assigning variable there values
const app = express();
const PORT = Port || 8080;

//app usecases
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//setting routes
app.use("/api/auth", authRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/image", imageRoutes);

//tester route
app.get("/", (req, res) => {
  res.status(201).json({
    Name: "Agam Pandey",
  });
});

//server starting function
const startServer = () => {
  connectDB(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
  });
};

startServer();
