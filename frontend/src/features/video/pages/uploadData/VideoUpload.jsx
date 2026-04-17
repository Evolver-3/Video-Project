import { useVideo } from '../../hooks/useVideo'
import { useRef,useState } from 'react'
import Wrapper from '../Wrapper'

const VideoUpload = () => {

  const {handleVideoUpload,videoData}=useVideo()

  const [title,setTitle]=useState(null)
  const [desc,setDesc]=useState(null)
  
  const videoRef=useRef()

  const handleClick=async(e)=>{
    e.preventDefault()

    const videoUrl=videoRef.current.files[0]

    const success=await handleVideoUpload({title,description:desc,videoUrl})

    if(success){
      return <h2>perfect</h2>
    }
  }
  return (
    <Wrapper>
      <div className='center'>
        <form onSubmit={handleClick} className="formItem">

          <LabelData
          data={"Enter a title for the video"}
          text={"Title"}
          placeholder={"title"}
          onChange={(e)=>setTitle(e.target.value)}
          type={"text"}/>

          <LabelData
          data={"Enter a description for the video"}
          text={"Description"}
          placeholder={"Description"}
          onChange={(e)=>setDesc(e.target.value)}
          type={"text"}/>

          <div className='rounded-md bg-neutral-600 text-white  w-fit px-2 py-2 font='>
            <label>
              <h2>Select Video</h2>
              <input hidden type="file" ref={videoRef}
              accept='video/*'/>
            </label>
          </div>

          <button>Upload Video</button>
          
        </form>
      </div>
    </Wrapper>
  )
}

export default VideoUpload

const LabelData=({data,text,placeholder,onChange,type})=>{
  return(
    <div className=' mainlabel'>
    <label>{data}</label>
    
    <input
    className=' inputdata'
    type={type} name={text} placeholder={placeholder} onChange={onChange}></input>
    </div>
  )
}