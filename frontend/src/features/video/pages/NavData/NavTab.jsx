import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import DarkBtn from '../../../auth/pages/DarkBtn'
import {AnimatePresence, motion} from 'motion/react'
import { useAuth } from '../../../auth/hooks/useAuth'

const NavTab = () => {
    const [openTab,setOpenTab]=useState(false)

    const {user,handleLogout}=useAuth()
    
  
  
  return (
    <>
      <div 
      className="relative "
      onClick={()=>setOpenTab(!openTab)}>
        <TabSvg />
      </div>

      <AnimatePresence>
        {openTab && (
          <>
          <motion.div
          className='fixed inset-0 backdrop-brightness-50'
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}/>

          <motion.div
          initial={{x:"-100%"}}
          animate={{x:0}}
          transition={{type:"tween",duration:0.2}}
          exit={{x:"-100%"}}
          className='inset-0 absolute w-3/7 md:w-1/3 h-screen shadow-finta  py-3.5   bg-background'>

        <div className='px-3 pb-3'>
          <h2
          className="mb-6 rounded-full p-1 hover:bg-hober transition-colors duration-200 w-fit"
          onClick={()=>setOpenTab(false)}>
          <TabSvg />
        </h2>
        <TabData svg={<HomeSvg/>}>
          <Link to={"/"}>Home</Link>
        </TabData>

        <TabData svg={<ProfileSvg/>}>
        <Link to={"/user/userPage"}>User</Link></TabData>
        </div>

        <div className='w-full h-px bg-avr'/>

        {user ?(""): (
          <div className=' py-5 pl-6 flex flex-col gap-4 text-foreground'>

          <h2 className='text-sm leading-tight'>Sign in to like videos,
            comment and subscribe.
          </h2>
          <Link
          to={"/login"}>
          <div className=' w-fit hover:bg-blue-100 cursor-pointer transition-colors duration-150 rounded-2xl flex gap-1.5 items-center justify-center text-blue-700 ring ring-neutral-200 px-2 py-1 hover:ring-0'
                  >
          <ProfileSvg/>
          
          <h2 className='text-sm '>Sign in</h2>
          </div>
          </Link>
        </div>
        )}

      
          
        </motion.div>
        </>
      )}
      </AnimatePresence>
    </>
  )
}

export default NavTab


const TabSvg=()=>{
  return(
    <svg
    className="text-foreground"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" >

    <path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z"></path>
    </svg>
  )
}

const TabData=({children,onClick,svg})=>{
  return(
    <div className='text-md text-foreground  rounded-lg px-2 py-2 w-full transition-colors duration-300 font-semibold hover:bg-hober flex gap-5'
    onClick={onClick}>
      <h2>{svg}</h2>
      <h2 className=''>{children}</h2>
    </div>
  )
}

const HomeSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >

<path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm7 7v-5h4v5zm2-15.59 6 6V20h-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5H6v-9.59z"></path>
</svg>
  )
}

const ProfileSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >

<path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
</svg>
  )
}