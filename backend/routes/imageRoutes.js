import { Router } from "express";
import upload from '../middlewares/multer.js'
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadImage , getImageByFolder , searchImage } from "../controllers/imageController.js";

const route = Router();

route.post('/upload/:folderId', verifyToken, upload.single('image'), uploadImage);
route.get('/folder/:folderId', verifyToken, getImageByFolder);
route.get('/search', verifyToken, searchImage);

export default route;