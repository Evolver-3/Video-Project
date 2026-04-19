import {Router} from 'express'
import upload from '../middlewares/multer.middleware.js'
import { getVideoById, videoController, changePublishStatus, getAllVideos, videoLikeCount ,getAllByOwner} from '../controllers/video.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const videoRouter=Router()

// route for uploading videos need verification

videoRouter.route("/uploadVideo").post(verifyJWT,upload.single("videoUrl"),videoController)

//getting all videos for Home page

videoRouter.route("/allVideos").get(getAllVideos)

//getting all videos of a particular user with his details

videoRouter.route("/user/:userId").get(getAllByOwner)

//getting a details of a video by it's id

videoRouter.route("/:videoId").get(getVideoById)

//changing the visibility of a video either private or public

videoRouter.route("/:videoId/publish").patch(verifyJWT,changePublishStatus)

//router for like button

videoRouter.route("/:videoId/like").post(verifyJWT,videoLikeCount)


export {videoRouter}