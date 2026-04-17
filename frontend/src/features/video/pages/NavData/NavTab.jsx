import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import DarkBtn from '../../../auth/pages/DarkBtn'

const NavTab = () => {
    const [openTab,setOpenTab]=useState(false)
  
  
  return (
    <>
      <div 
      className="relative "
      onClick={()=>setOpenTab(!openTab)}>
        <TabSvg />
      </div>

      {openTab && (
        <div className='inset-0 absolute w-1/5 h-50 shadow-finta  py-4 px-3  bg-background'>

        <div 
          className="pb-6"
          onClick={()=>setOpenTab(false)}>
          <TabSvg />
        </div>
          
          <h2><Link to={"/upload"}>Upload</Link></h2>
          <h2>Sign Up</h2>
          <DarkBtn/>

        </div>
      )}
    </>
  )
}

export default NavTab


const TabSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" >

    <path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z"></path>
    </svg>
  )
}