import { Router } from "express";
import * as controllers from "../../controllers/admin/upload.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/upLoadCloud.middleware";

const upload = multer();

const router: Router = Router();

router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controllers.index
);

export const routerUpload: Router = router;
