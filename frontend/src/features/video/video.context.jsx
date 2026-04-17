import { useState,createContext } from "react";

export const VideoContext=createContext()

export const VideoProvider=({children})=>{

  const [videoData,setVideoData]=useState([])
  const [videoDataById,setVideoDataById]=useState(null)
  const [ownerData,setOwnerData]=useState([])
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState(null)

  return(
    <VideoContext.Provider value={{videoData,setVideoData,videoDataById,setVideoDataById,loading,setLoading,errorMessage,setErrorMessage,ownerData,setOwnerData}}>
      {children}
    </VideoContext.Provider>
  )
}