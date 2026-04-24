import React, { useState ,useRef} from 'react'
import { motion } from 'motion/react'

const HoverEffect = ({children,className}) => {

  const [position,setPosition]=useState({x:0,y:0})
  const [isHovered,setIsHovered]=useState(false)

 
  const containerRef=useRef(null)

  const handleMouseMove=(e)=>{

    if(!containerRef.current) return

    const rect=containerRef.current.getBoundingClientRect()

    setPosition({
      x:e.clientX-rect.left,
      y:e.clientY-rect.top
    })
  }

  return (
    <div
    ref={containerRef}
    onMouseMove={handleMouseMove}
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    className=' w-full relative overflow-hidden rounded-xl'>

       <div className={`relative z-10  ${className}`}>
          {children}
        </div>

      <motion.div className='pointer-events-none absolute rounded-xl'
      animate={{
        width:isHovered? 1000:0,
        height:isHovered? 1000:0,
        opacity:isHovered? 1:0
      }}
      transition={{
        type:"spring",
        stiffness:200,
        damping:20
      }}
      style={{
        left:`${position.x}px`,
        top:`${position.y}px`,
        transform:"translate(-50%,-50%)",
        background:"radial-gradient(circle, rgba(256,256,256,0.1) 20%, transparent 70%)",
        zIndex:20,
      }}/>
    </div>
  )
}

export default HoverEffect