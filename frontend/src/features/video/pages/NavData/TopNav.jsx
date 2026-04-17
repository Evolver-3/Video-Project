import React from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import NavTab from './NavTab'



const TopNav = () => {
  const {user,loading,errorMessage,}=useAuth()

  
  return (
    <div className='w-full bg-background flex items-center justify-between px-3 py-2 shadow-finta fixed'>

       <NavTab/>

      <div className='avatarDiv'>
        <img
      src={user?.avatar } alt="profile" className='avatarImg'/>
      </div>

     
    </div>
 
  )
}

export default TopNav


