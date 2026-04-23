import React, { useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import { Link } from 'react-router-dom'
import DarkBtn from '../../../auth/pages/DarkBtn'

const LeftNavTab = ({user})=> {
    const [open,setOpen]=useState(false)
    const {handleLogout}=useAuth()

  

  return(<>
    <div 
     className='avatarDiv relative'
    onClick={()=>setOpen(!open)}>
      <img
      src={user?.avatar } alt="profile" className='avatarImg'/>
    </div>

    {open && (
      <div className='absolute rounded-xl bg-navbg top-0 right-20 shadow-finta  py-2 flex flex-col gap-3 text-foreground'>

        <div className='flex gap-3 items-center px-2'>
          <img
          className='w-13 h-13 rounded-full'
          src={user?.avatar} alt="user-avatar"/>

            <h2 className='text-sm'>{user?.username}</h2>
        </div>

        <div className='border h-px w-full border-neutral-200 '/>

        <div>
          <TabData onClick={handleLogout} text={"Sign out"} tag={<LoggedOutSvg/>}/>

          <TabData text={<DarkBtn/>}
          tag={<PallateSvg/>}/>

          <TabData 
          text={<Link to={"/upload"}>Upload</Link>}
          tag={<UploadSvg/>}/>
            

        </div>
      </div>)}
    </>
  )
}

export default LeftNavTab

const LoggedOutSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">

<path d="M9 13h7v-2H9V7l-6 5 6 5z"></path><path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
</svg>
  )
}

const TabData=({text,onClick,tag})=>{
  return(
    <div className='flex text-foreground cursor-pointer items-center gap-4 px-2 hover:bg-hoverbg py-1.5 text-xs'
    onClick={onClick}>
      <span>{tag}</span>
      <h2 className=''>{text}</h2>
    </div>
  )
}

const UploadSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24" >

<path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4v-2H4v-8h16v8h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 6H4V5h16z"></path><path d="M14 6h2v2h-2zm3 0h2v2h-2zm-5 7-4 4h3v4h2v-4h3z"></path>
</svg>
  )
}

const PallateSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24">
<path d="M13.4 2.1c-3.16-.43-6.24.6-8.47 2.83S1.67 10.25 2.1 13.4c.53 3.89 3.46 7.21 7.29 8.25.86.23 1.74.35 2.62.35h.14c1.03-.02 1.97-.55 2.52-1.43.54-.88.6-1.95.15-2.88l-.2-.42c-.45-.94-.1-1.8.39-2.28s1.34-.84 2.28-.39l.41.2c.93.45 2 .39 2.88-.15a3 3 0 0 0 1.43-2.52c.01-.92-.1-1.85-.35-2.76-1.04-3.83-4.35-6.75-8.25-7.29Zm6.12 10.86c-.3.18-.65.2-.96.05l-.41-.2a3.96 3.96 0 0 0-4.56.78 3.96 3.96 0 0 0-.78 4.56l.2.42c.15.31.13.66-.05.96-.19.3-.49.47-.84.48-.74.02-1.48-.08-2.21-.28-3.06-.83-5.4-3.48-5.83-6.59-.34-2.53.48-5 2.27-6.79a7.96 7.96 0 0 1 5.66-2.34c.37 0 .75.03 1.13.08 3.11.42 5.75 2.76 6.59 5.83.2.73.29 1.47.28 2.21 0 .35-.18.66-.48.84Z"></path><path d="M7.33 12.76a1 1 0 1 0 0 2 1 1 0 1 0 0-2m.07-3.83a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 1 0 0-2.24m2.81-2.87a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5m4.06.11a1.38 1.38 0 1 0 0 2.76 1.38 1.38 0 1 0 0-2.76"></path>
</svg>
  )
}