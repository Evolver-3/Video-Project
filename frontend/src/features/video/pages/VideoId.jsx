import React,{useState,useEffect} from 'react'
import Wrapper from './Wrapper'
import { useVideo } from '../hooks/useVideo'
import { useParams } from 'react-router-dom'
import UserLikes from './LikesPage/UserLikes'

const VideoId = () => {

  const {videoDataById,handleVideoGetById,loading,}=useVideo()


  const {videoId}=useParams()

  console.log(videoDataById)
 
   useEffect(()=>{
      if(!videoId) return 

        handleVideoGetById(videoId)
      
    },[videoId])

    const videoDate=videoDataById?.data?.createdAt

  

    if(loading) return <p className='text-white h-screen bg-blue-400'>Loading ....</p>
  return (
    <Wrapper>
      <div className='pt-12.5'>
        <video 
          src={videoDataById?.data.videoUrl}
                controls 
                preload
                className="w-full py-1 bg-copeground ">
        </video>
        
        <div className='bg-background w-full h-screen p-2 flex flex-col gap-3'>
          <h2 className='text-foreground font-bold '>{videoDataById?.data?.title} | {videoDataById?.data?.owner?.username}</h2>

          <div className='flex gap-3 text-foreground'>
            <img src={videoDataById?.data?.owner?.avatar} alt="owner-pic"
            className="w-10 h-10 rounded-full"/>

            <h2 className='text-semibold '>{videoDataById?.data?.owner?.username}</h2>

          </div>
          <UserLikes/>

          <div className='bg-uploadbg rounded-lg p-2 text-foreground text-sm font-semibold flex flex-col gap-1'>
            <div className='flex gap-2'>
              <h2>{videoDataById?.data?.views} views</h2>
              <h2>{videoDataById?.data?.createdAt}</h2>
            </div>
            <p className='leading-tight'>{videoDataById?.data?.description}</p>

          </div>


            

        </div>
      
      </div>
    </Wrapper>
  )
}

export default VideoId