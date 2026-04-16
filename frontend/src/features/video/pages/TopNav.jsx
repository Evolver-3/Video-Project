import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

const TopNav = () => {
  const {user,loading,errorMessage,}=useAuth()
  console.log(user)
  
  return (
    <div className='w-full bg-white'>
      <img
      src={user?.avatar } alt="profile" className='w-10 h-10 rounded-full ring-1 ring-blue-500 shadow-md cursor-pointer'/>
    </div>
  )
}

export default TopNav