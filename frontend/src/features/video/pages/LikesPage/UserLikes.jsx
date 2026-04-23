import React, { useEffect } from 'react'
import { useVideo } from '../../hooks/useVideo'

const UserLikes = () => {

  const {handleLike,liked,likeCount,errorMessage,videoDataById,loading}=useVideo()

  console.log(videoDataById?.data?._id)
  console.log(liked)
  console.log(likeCount)

  useEffect(()=>{
    if(loading){
    handleLike()
    }
  },[loading])

  return (
    <div>

      {errorMessage && (
        <p className='text-red-500 text-sm'>{errorMessage}</p>
      )}
      <button
      onClick={()=>handleLike(videoDataById?.data?._id)}
      className={`px-2 py-1.5 rounded-full transtion-all  bg-uploadbg`}
      >
        {liked ?(<ClickBtn/>):(<ClickBtn/>)} 
      </button>
 
    </div>
  )
}

export default UserLikes


const ClickBtn=({})=>{
  return(
    <div className='flex gap-6 px-1'>
      <LikeButton/>
      <DisLikeButton/>
    </div>

  )
}

const LikeButton=()=>{
  return(
    <svg 
    className='inne'
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
      <path d="M20 8h-5.61l1.12-3.37c.2-.61.1-1.28-.27-1.8-.38-.52-.98-.83-1.62-.83h-1.61c-.3 0-.58.13-.77.36L6.54 8H4.01c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13.31a2 2 0 0 0 1.87-1.3l2.76-7.35c.04-.11.06-.23.06-.35v-2c0-1.1-.9-2-2-2ZM6 19H4v-9h2zm14-7.18L17.31 19H8V9.36L12.47 4h1.15l-1.56 4.68a1.01 1.01 0 0 0 .95 1.32h7v1.82Z"></path>
</svg>
  )
}

const DisLikeButton=()=>{
  return(
    <svg
    className=''
    xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24" >

    <path d="M20 3H6.69a2 2 0 0 0-1.87 1.3l-2.76 7.35c-.04.11-.06.23-.06.35v2c0 1.1.9 2 2 2h5.61l-1.12 3.37c-.2.61-.1 1.28.27 1.8.38.52.98.83 1.62.83h1.61c.3 0 .58-.13.77-.36l4.7-5.64h2.53c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-4 11.64L11.53 20h-1.15l1.56-4.68a1.01 1.01 0 0 0-.95-1.32h-7v-1.82L6.68 5h9.31v9.64Zm4-.64h-2V5h2z"></path>
</svg>
  )
}