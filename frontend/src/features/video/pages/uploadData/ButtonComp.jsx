import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import {AnimatePresence, motion} from 'motion/react'

const MotionSpinner=motion(FaSpinner)
const ButtonComp = ({loading,text,className}) => {
  return (
    <motion.button 
    className={` w-1/2 px-2 py-2 rounded-lg bg-blue-400 text-sm  flex items-center justify-center gap-2 font-semibold text-white text-shadow-2xs hover:scale-95 transition-transform duration-300 active:scale-x-100 ease-in-out hover:ring-1 hover:ring-blue-500 shadow-finta disabled:opacity-55 hover:shadow-weird ${className}`} 
    disabled={loading}>
     
    <AnimatePresence mode="wait">
      {loading && (
        <MotionSpinner
        key="Spinner"
        initial={{opacity:0,scale:0.2}}
        animate={{opacity:1,scale:1}}
        exit={{opacity:0,scale:0.5}}
        className='animate-spin text-white'/>
         )}
    </AnimatePresence>
       <motion.span
       key={loading? "loading" :"text"}
       initial={{opacity:0}}
       animate={{opacity:1}}>
        {loading? "Uploading...":text}
       </motion.span>
    </motion.button>
    )
}

export default ButtonComp