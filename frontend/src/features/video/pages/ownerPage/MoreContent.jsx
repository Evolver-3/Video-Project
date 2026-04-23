import React,{useRef, useState,useEffect} from 'react'

const MoreContent = ({user}) => {
    const [openTab,setOpenTab]=useState(false) 

    const tabRef=useRef(null)

    useEffect(()=>{
      const handleClickOutside=(e)=>{
        if(tabRef.current && !tabRef.current.contains(e.target)){
          setOpenTab(false)
        }
      }
      document.addEventListener("mousedown",handleClickOutside)

      return()=>{document.removeEventListener("mousedown",handleClickOutside
      )}
    },[])

  return (
    <div
    ref={tabRef}>
      <h2
      onClick={()=>{setOpenTab(prev=>!prev)}}
      className='relative text-[12px] text-foreground cursor-pointer'>More about this channel
        <span className=''> ...more</span>
      </h2>

      {openTab &&(<>

        <div
        onClick={()=>setOpenTab(false)}
        className='fixed inset-0 backdrop-brightness-50'/>

        <div className='absolute  -translate-1/2 left-1/2 top-4/9 bg-videohover w-sm h-50 rounded-2xl p-5 shadow-weird'>

          <div className='text-foreground text-lg font-semibold '>

            <h2 className=''>{user?.username}</h2>

            <h2>More info</h2>
            <div className='text-xs mt-6'>
              
            <h2>Joined {user?.createdAt}</h2>
            </div>

          </div>


          

        </div>
      </>)}
    </div>
  )
}

export default MoreContent