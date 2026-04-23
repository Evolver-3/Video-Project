import { useContext } from "react";
import { VideoPost, VideoGetAll, VideoById, PublishFlag, LikeFlag, OwnerAllData } from "../services/video.api";
import { VideoContext } from "../video.context.jsx";
import {useParams} from 'react-router-dom'

export const useVideo=()=>{

  const context=useContext(VideoContext)

  const {videoId}=useParams()
  const {userId}=useParams()

    if(!context){
    throw new Error("does this even exist!!")
  }

  const {videoData,setVideoData,videoDataById,setVideoDataById,loading,setLoading,errorMessage,setErrorMessage,ownerData,setOwnerData,liked,setLiked,likeCount,setLikeCount}=context

   const handleVideoUpload=async({title,description,videoUrl})=>{

    setLoading(true)

    try {

      const res=await VideoPost({title,description,videoUrl})

      setVideoData(prev=>[res, ...prev])
      return true
      
    } catch (error) {
      setErrorMessage(error)
      console.log("error in uploading video:",error)
      return false
      
    }finally{
      setLoading(false)
    }

   }

   const handleVideoGetAll=async()=>{

    setLoading(true)
    try{
      const res=await VideoGetAll()
      setVideoData(res)

    }catch(error){
      setErrorMessage(error)
      console.log("Error getting videos:",error)
      return false

    }finally{
      setLoading(false)
    }}

   const handleVideoGetById=async(videoId)=>{

     setLoading(true)

    try{
      const res =await VideoById(videoId)
      setVideoDataById(res)

    }catch(error){

      setErrorMessage(error)

      console.log("Error getting videos by Id:",error)
      return false
    }finally{
      setLoading(false)
    }

   }

   const handlePublish=async(videoId)=>{

     setLoading(true)

    try{
      const res=await PublishFlag(videoId)
      
      setVideoData(res)

      console.log(res)

    }catch(error){

      setErrorMessage(error)
      console.log("Error changing Visibility state:",error)
      return false
    }finally{
      setLoading(false)
    }

   }
   
   const handleLike=async(id=videoId)=>{

     setLoading(true)
     setLiked(prev=>!prev)
     setLikeCount(prev=>liked?prev-1:prev+1)

    try{
      const res=await LikeFlag(id)

      setLikeCount(res.data.likesCount)
      setLiked(res.data.liked)
      console.log(res)

      return true
    }catch(error){
      setLiked(prev=>!prev)
      setLikeCount(prev=>liked? prev+1:prev-1)

      setErrorMessage(error?.res?.data?.message || "Like failed")
      console.log("Error toggling likes",error)
     
    }finally{
      setLoading(false)
    }

   }

   const handleOwnerPage=async(id=userId)=>{

    setLoading(true)
    try{
      const res=await OwnerAllData(id=userId)

      setOwnerData(res)

    }catch(error){
      setErrorMessage(error)
      console.log("Error getting owner info:",error)
      return false

    }finally{
      setLoading(false)
    }
   }

   return {handleVideoUpload,handleVideoGetAll,handleVideoGetById,handlePublish,handleLike,videoData,videoDataById,loading,errorMessage,ownerData,handleOwnerPage,liked,likeCount,setLiked,setLikeCount}
}