import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.models.js";

const videoController=asyncHandler(async(req,res)=>{

  console.log(req.body)
  console.log(req.file)

  const {title,description}=req.body 


  if(!title || !description){
    throw new ApiError(400,"All entries should be filled")
  }

  const videoFile=req.file 

  if(!videoFile){
    throw new ApiError(406,"video file is missing")
  }

  const video=await uploadToCloudinary(videoFile.buffer)

  if(!video){
    throw new ApiError(500,"Some error occured while uploading the video")
  }

  const videoData=await Video.create(
    {
      title,
      description,
      videoUrl:video.secure_url,
      duration:video.duration,
      thumbnail:video.secure_url.replace(".mp4", ".jpg"),
      owner:req.user?._id
    }
  )

  console.log(videoData)

  if(!videoData){
    throw new ApiError(500, "Something went wrong while creating the video Data")
  }

  return res.status(201).json(new ApiResponse(201,videoData,"Video uploaded successfully "))
})

const getVideoById=asyncHandler(async(req,res)=>{

  const {videoId}=req.params

  const videoData=await Video.findOne({_id:videoId}).populate("owner","username avatar")

  if(!videoData){
    throw new ApiError(404,"Video not found")
  }

  videoData.views +=1
  await videoData.save()

  res.status(200).json(
    new ApiResponse(200,videoData,"video at the given id")
  )

})

const changePublishStatus=asyncHandler(async(req,res)=>{

  const {videoId}=req.params

  const video=await Video.findById({_id:videoId})

  if(!video){
    throw new ApiError(404,"Video not found")
  }

  if(video.owner.toString() !== req.user._id.toString()){
    throw new ApiError(403,"Unauthorized")
  }

  video.isPublished=!video.isPublished

  await video.save()

  return res.status(200).json(new ApiResponse(200,{
    isPublished:video.isPublished
  },"Status updated"))

})

const getAllVideos=asyncHandler(async(req,res)=>{

  // const {isPublished}=req.params

  const videos=await Video.find({isPublished:true}).populate("owner","username avatar").sort({createdAt:-1})

  if(videos.length === 0){
    throw new ApiError(404,"No video is here")
  }

  return res.status(200).json(new ApiResponse(200,videos,"All videos are  here"))
})

const videoLikeCount=asyncHandler(async(req,res)=>{

  const {videoId}=req.params
  const userId = req.user._id 

  const video=await Video.findById(videoId)

  if(!video){
    throw new ApiError(404,"Video not found")
  }

  const isLiked=video.likes.includes(userId)

  if(isLiked){
    video.likes.pull(userId)
  }else{
    video.likes.push(userId)
  }
  await video.save()

  return res.status(200).json(
    new ApiResponse(200 ,{
      videoId:video._id,
      liked:!isLiked,
      likesCount:video.likes.length,
      video:video.toObject()
    },"likes count"))
})

const getAllByOwner=asyncHandler(async(req,res)=>{
  const {userId}=req.params

  if(!userId){
    throw new ApiError(400,"User ID is required")
  }

  const videos=await Video.find({owner:userId}).populate("owner","username avatar coverImage")

  res.status(200).json(
    new ApiResponse(200,videos,"User videos fetched")
  )

})

export {videoController,getVideoById,changePublishStatus,getAllVideos,videoLikeCount,getAllByOwner}