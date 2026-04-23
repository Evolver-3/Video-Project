import React, { useState } from 'react'
import { useVideo } from '../../hooks/useVideo'
import Wrapper from '../Wrapper'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const OwnerPage = () => {
  const {userId}=useParams()
  const {handleOwnerPage,ownerData,loading,errorMessage}=useVideo()

  useEffect(()=>{
    if(userId){
    handleOwnerPage(userId)
    }
  },[userId])

  return (
        <Wrapper>
          <div className='px-8 pt-15 flex flex-col gap-4'>

            <img
            className='rounded-xl w-full h-16'
            src={ownerData[0]?.owner?.coverImage} alt="owner coverImage"/>

           <div className='flex gap-5'>
             <img src={ownerData[0]?.owner?.avatar} alt="owner-avatar"
            className='size-18 rounded-full'/>

            <div className="flex-1 text-foreground text-2xl capitalize">
              <h1>{ownerData[0]?.owner?.username}</h1>

            </div>
           </div>
            
          </div>
          
          <div>
            <h2>Videos</h2> 
            
          </div>
        </Wrapper>
  )
}

export default OwnerPage