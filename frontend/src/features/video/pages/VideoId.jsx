import React,{useState,useEffect} from 'react'
import Wrapper from './Wrapper'
import { useVideo } from '../hooks/useVideo'
import { useParams } from 'react-router-dom'

const VideoId = () => {

  const {videoDataById,handleVideoGetById,loading,}=useVideo()


  const {videoId}=useParams()
 
   useEffect(()=>{
      if(!videoId) return 

        handleVideoGetById(videoId)
      
    },[videoId])
    console.log(videoDataById)

    if(loading) return <p className='text-white h-screen '>Loading ....</p>
  return (
    <Wrapper>
      <div>
        <video 
          src={videoDataById?.data.videoUrl}
                controls 
                preload
                className="w-full rounded-lg">
                </video>
      
      </div>
    </Wrapper>
  )
}

export default VideoId