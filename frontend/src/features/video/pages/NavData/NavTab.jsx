import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import DarkBtn from '../../../auth/pages/DarkBtn'
import {AnimatePresence, motion} from 'motion/react'
import { useAuth } from '../../../auth/hooks/useAuth'

const NavTab = () => {
    const [openTab,setOpenTab]=useState(false)

    const {handleLogout}=useAuth()
  
  
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
          className='fixed inset-0 backdrop-brightness-50 x-40'
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}/>

          <motion.div
          initial={{x:"-100%"}}
          animate={{x:0}}
          transition={{type:"tween",duration:0.2}}
          exit={{x:"-100%"}}
          className='inset-0 absolute w-1/3 h-screen shadow-finta  py-3.5 px-3  bg-white '>

        <div 
          className="mb-6 rounded-full p-1 hover:bg-hober transition-colors duration-200 w-fit"
          onClick={()=>setOpenTab(false)}>
          <TabSvg />
        </div>
  
            
            <TabData ><Link to={"/"}>Home</Link></TabData>
            <TabData>You</TabData>
            

          

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

const TabData=({children,onClick})=>{
  return(
    <div className='text-md text-foreground  rounded-lg px-2 py-2 w-full hover:bg-hober transition-colors duration-300 font-semibold visited:bg-neutral-200'
    onClick={onClick}>
      <h2 className=''>{children}</h2>
    </div>
  )
}