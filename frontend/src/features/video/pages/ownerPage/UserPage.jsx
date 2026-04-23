import React,{useState} from 'react'
import Wrapper from '../Wrapper'
import { useAuth } from '../../../auth/hooks/useAuth'
import MoreContent from './MoreContent'
import { Link } from 'react-router-dom'

const UserPage = () => {
  
  const {user,loading}=useAuth()


  console.log(user)
  return (
    <Wrapper>
      <div className='pt-18 px-5 flex flex-col gap-2'>
        
        <div className='flex gap-4'>
          <img
          className='size-[14vw] rounded-full '
          src={user?.avatar} alt="User-avatar"/>
 
          <h2 className='text-foreground text-2xl lg:text-3xl font-semibold'>{user?.username}</h2>
        </div>

        <MoreContent user={user}/>


        <div className='gap-5 flex'>

          <button
          className='rounded-full text-foreground text-sm w-full py-1.5 bg-videohover'>
            <Link to={"/user/userUpdate"}>Customize channel</Link>
          </button>

          <button className='rounded-full text-foreground text-sm w-full py-1.5 bg-videohover'>Manage videos</button>

        </div>


      </div>
    </Wrapper>
  )
}

export default UserPage

