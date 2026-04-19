import React from 'react'
import { motion } from 'motion/react'

const UploadSpan = ({videoUpload,videoRef}) => {

  const handleClick=()=>{

  }
  return (

     <div className=' text-lg font-semibold  rounded-3xl px-10 py-1 relative z-50 overflow-hidden shadow-inset hover:scale-98 active:scale-100 transition-all duration-300 bg-rose-100'>

      <label className=' bg-[linear-gradient(30deg,red_10%,blue_10%,purple_10%,green_63%)] bg-size-[200%_100%] bg-position-[-200%_0] bg-clip-text text-transparent animate-[shimmer_2s_linear_infinite] cursor-pointer'>Select Video
      
      <input hidden type="file" ref={videoRef}
      accept='video/*' />
      </label>
      
   </div>
  )
}

export default UploadSpan

