import { useState,createContext } from "react";

export const VideoContext=createContext()

export const VideoProvider=({children})=>{

  const [videoData,setVideoData]=useState(null)
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState(null)

  return(
    <VideoContext.Provider value={{videoData,setVideoData,loading,setLoading,errorMessage,setErrorMessage}}>
      {children}
    </VideoContext.Provider>
  )
}