import React, { useEffect } from 'react'
import { useVideo } from '../hooks/useVideo'
import TopNav  from './TopNav'
import Wrapper from './Wrapper'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const {videoData,loading,errorMessage,handleVideoGetAll}=useVideo()

  const navigate=useNavigate()

  useEffect(()=>{
    console.log("It's working")
    handleVideoGetAll()
  },[])

  console.log(videoData)
  
  const handleSwitch=(data_id)=>{

    console.log(data_id)
    if(data_id){
      let videoId=data_id

      navigate(`/${videoId}`)
      
    }
  }
  
  return (
    <Wrapper>
      <div className='text-white'>
      
        <div className='grid grid-cols-2 px-4 pt-5 gap-x-3'>
          {videoData?.map((data,idx)=>(
            <div key={data._id}
            onClick={()=>{
              console.log(data._id)
              handleSwitch(data._id)}}
            className="hover:bg-neutral-900 rounded-xl p-4 transition-transform duration-300 delay-150">
              
              <div className='flex flex-col gap-2' >
                <video 
                src={data?.videoUrl}
                controls 
                preload
                onClick={(e)=>e.stopPropagation()}
                className="w-full rounded-lg">
                </video>
                <div className='flex gap-2 text-neutral-100'>
                  <img src={data?.owner?.avatar} alt="owner-profile"
                  className='w-10 h-10 rounded-full shadow-lg ring-1 ring-neutral-500'
                  />
                  <div className='flex-1'>
                    <h2 className=' text-sm font-semibold'>{data.title}</h2>
                    <h3 className='text-xs'>{data?.owner?.username}</h3>

                    <div>
                      <h3 >{data.views} views</h3>
                      <h3 >{data.updatedAt}</h3>
                    </div>
                  </div>

                  
                  
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Wrapper>
  )
}

export default HomePage