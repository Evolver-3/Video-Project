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
    handleOwnerPage()
    }
  },[userId])
  console.log(userId)
  console.log(ownerData)

  return (
        <Wrapper>
          <div className='px-10 pt-10 flex gap-4'>
            <div className='w-20 h-20 '>
              <img src={ownerData[0]?.owner?.avatar} alt="owner-avatar"
              className='rounded-full'/>
            </div>

            <div className="flex-1 text-foreground">
              <h1>{ownerData[0]?.owner?.username}</h1>

             
            </div>
            
          </div>
          
          <div>
            <h2>Videos</h2>
            
          </div>
        </Wrapper>
  )
}

export default OwnerPage