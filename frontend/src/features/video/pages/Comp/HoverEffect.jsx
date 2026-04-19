import React, { useState ,useRef} from 'react'

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
    className=' w-full relative overflow-hidden rounded-b-xl'>

       <div className={`relative delay-150 z-10 duration-200 ${isHovered? "bg-neutral-800 bg-opacity-25":""} ${className}`}>
          {children}
        </div>

      <div className='pointer-events-none absolute '
      style={{
        width:'200px',
        height:'200px',
        left:`${position.x}px`,
        top:`${position.y}px`,
        transform:"translate(-50%,-50%)",
        background:"radial-gradient(black,transparent 80%)",
        zIndex:20
      }}>

       

      </div>
    </div>
  )
}

export default HoverEffect