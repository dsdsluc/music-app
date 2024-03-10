import { Router } from "express";
import * as controllers from "../../controllers/admin/songs.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/upLoadCloud.middleware";

const upload = multer();

const router: Router = Router();

router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controllers.createPost
);

router.get("/edit/:id", controllers.edit);

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controllers.editPost
);

export const routerSongs: Router = router;
