import React from 'react'
import { motion } from 'motion/react'

const UploadSpan = ({videoUpload,videoRef}) => {

  const handleClick=()=>{

  }
  return (

     <div className=' text-lg font-semibold  rounded-3xl px-10 py-1 relative z-50 overflow-hidden  hover:scale-98 active:scale-100 transition-all duration-300 bg-avr shadow-finta hover:text-shadow-xs'>

      <label className=' text-foreground cursor-pointer'>Select Video
      
      <input hidden type="file" ref={videoRef}
      accept='video/*' />
      </label>
      
   </div>
  )
}

export default UploadSpan

