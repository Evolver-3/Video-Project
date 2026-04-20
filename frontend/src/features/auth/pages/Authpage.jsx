import React from 'react'
import RegisterPage from './RegisterPage'

const Authpage = ({text,children}) => {
  return (
    <div className="flex  md:justify-center min-h-screen flex-col gap-5 items-center justify-center">
      <div className='pl-4'>
        <h2 className='text-xl md:text-2xl  font-semibold'>{text}</h2>
      </div>
      <div className=' md:rounded-xl w-full md:w-3/4 container min-h-screen'>
      
      {children}

      </div>
    </div>
  )
}

export default Authpage