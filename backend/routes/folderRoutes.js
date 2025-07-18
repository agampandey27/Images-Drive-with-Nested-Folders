import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createFolder , getUserFolders ,getUserRootFolders , getParentsSubFolders} from "../controllers/folderController.js";

const route = Router();

route.post("/" , verifyToken , createFolder);
route.get("/" , verifyToken , getUserFolders);
route.get("/root" , verifyToken , getUserRootFolders);
route.get("/:parentId" , verifyToken , getParentsSubFolders);

export default route;