import React, { useState } from 'react'

const LeftNavTab = ({user})=> {
    const [open,setOpen]=useState(false)

  return(<>
    <div 
     className='avatarDiv relative'
    onClick={()=>setOpen(!open)}>
      <img
      src={user?.avatar } alt="profile" className='avatarImg'/>
    </div>

    {open && (
      <div className='absolute rounded-xl bg-neutral-50 w-1/3 h-xl right-20 shadow-finta'>
        Hello
      </div>)}
    </>
  )
}

export default LeftNavTab