import {Router} from 'express'
import upload from '../middlewares/multer.middleware.js'
import { getVideoById, videoController, changePublishStatus, getAllVideos, videoLikeCount } from '../controllers/video.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const videoRouter=Router()

videoRouter.route("/uploadVideo").post(verifyJWT,upload.single("videoUrl"),videoController)

videoRouter.route("/allVideos").get(getAllVideos)

videoRouter.route("/:videoId").get(getVideoById)

videoRouter.route("/:videoId/publish").patch(verifyJWT,changePublishStatus)



videoRouter.route("/:videoId/like").post(verifyJWT,videoLikeCount)


export {videoRouter}