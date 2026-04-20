import React from 'react'
import RegisterPage from './RegisterPage'

const Authpage = ({text,children}) => {
  return (
    <main className="flex items-center justify-center ">
      <div className='py-10 flex flex-col gap-6'>
        <div className=' px-16 md:px-26'>
          <h2 className='text-2xl md:text-3xl  font-semibold'>{text}</h2>
        </div>
        <div className=' '>
          {children}
        </div>
      </div>
    </main>
  )
}

export default Authpage