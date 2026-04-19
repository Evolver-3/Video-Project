import React, { useEffect ,useState} from 'react'
import { useVideo } from '../hooks/useVideo'
import TopNav  from './NavData/TopNav'
import Wrapper from './Wrapper'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import HoverEffect from './Comp/HoverEffect'

const HomePage = () => {

  const {videoData,loading,errorMessage,handleVideoGetAll}=useVideo()

  const navigate=useNavigate()

  useEffect(()=>{
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

        <div className='grid md:grid-cols-2 px-4  gap-x-5 gap-y-8 pt-25'>

          {videoData?.map((data,idx)=>(
          
            <div 
            key={data._id}
            className="rounded-xl p-3 duration-300 delay-200 hover:bg-pink-100 transition-colors cursor-pointer">
              
              <div
              className='flex flex-col gap-2.5 '>
                <video 
                src={data?.videoUrl}
                poster={data?.thumbnail}
                preload="true"
                onClick={()=>{handleSwitch(data._id)}}
                className="w-full rounded-xl">
                </video>

                <div className='flex gap-2 text-neutral-100'>

                  <div>
                    <Link to={`/user/${data?.owner?._id}`}>
                    <img src={data?.owner?.avatar} alt="owner-profile"
                    className='size-10 rounded-full shadow-lg '
                    />
                    </Link>
                  </div>

                  <div className='flex-1 text-black '>
                    <h2 className=' text-md font-semibold'>{data.title}</h2>
                    <h3 className='text-xs text-neutral-600 font-sans'>{data?.owner?.username}</h3>

                    <div className='flex gap-1  text-xs text-neutral-600'>
                      <h3 >{data.views} views</h3>
                      <span>.</span>
                      <h3 >{new Date(data.updatedAt).toLocaleDateString()}</h3>
                    </div>
                  </div>

                  
                  
                </div>
              </div>
            </div>
           
          ))}
        </div>


    </Wrapper>

  )
}

export default HomePage