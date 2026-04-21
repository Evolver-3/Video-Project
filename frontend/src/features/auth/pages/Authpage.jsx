import React from 'react'
import RegisterPage from './RegisterPage'

const Authpage = ({text,children}) => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className='py-10 flex flex-col gap-6 h-full'>
        <div className=' px-16 md:px-26'>
          <h2 className='text-2xl md:text-3xl  font-semibold text-foreground'>{text}</h2>
        </div>
        <div className='h-auto'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default Authpage