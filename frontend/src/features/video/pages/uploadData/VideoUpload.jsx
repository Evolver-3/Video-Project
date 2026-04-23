import { useVideo } from '../../hooks/useVideo'
import { useEffect, useRef,useState } from 'react'
import Wrapper from '../Wrapper'
import { AnimatePresence, motion } from 'motion/react'
import UploadSpan from './UploadSpan'
import ButtonComp from './ButtonComp'

const VideoUpload = () => {

  const {handleVideoUpload,videoData,loading}=useVideo()

  const [title,setTitle]=useState(null)
  const [desc,setDesc]=useState(null)
  
  const videoRef=useRef()
  const [videoUpload,setVideoUpload]=useState(false)

  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

  const handleClick=async(e)=>{
    e.preventDefault()

    const file=videoRef.current?.files[0]
  
    if(!file){
      setError("No file selected")
      setSuccess("")
      return;
    }
    if(!file.type.startsWith("video/")){
      setError("Please upload a valid video file")
      setSuccess("")
      return;
    }
  

    if(!title || !desc ){
      setError("No entries should be empty")
      setSuccess("")
      return;
    }

    try{
      const successData=await handleVideoUpload({title,description:desc,videoUrl:file})
    console.log(successData)
    setVideoUpload(true)

     
      setError("")
      setSuccess("Video Uploaded Successfully !!")
      setTitle("")
      setDesc("")
      videoRef.current.value=""
      
    
    }catch(err){
      setError("Upload failed. Try again.")
      setSuccess("")
    }
  }

  useEffect(()=>{
    if(success || error){
      const timer=setTimeout(() => {
        setSuccess("")
        setError("")
        
      }, 4000);
      return()=>clearTimeout(timer)
    }
  },[success,error])

  return (
    <Wrapper>
      <div className='center'>

        <AnimatePresence>
          {error &&(
          <Message text={error} type="error"/>
        )}
        
          {success &&(
          <Message text={success} type="success"/>
        )}
        </AnimatePresence>
     

        <form onSubmit={handleClick} className="formItem ">

           <LabelData
          data={"Title for the video"}
          text={"Title"}
          placeholder={"Title......."}
          onChange={(e)=>setTitle(e.target.value)}
          type={"text"}
          value={title}/>

          <LabelData
          data={"Description for the video"}
          text={"Description"}
          placeholder={"Description.........."}
          onChange={(e)=>setDesc(e.target.value)}
          type={"text"}
          value={desc}/>

          <UploadSpan videoUpload={videoUpload} setVideoUpload={setVideoUpload} videoRef={videoRef} 
          value={videoRef} loading={loading}/>
  
          <ButtonComp loading={loading} text={"Upload Video"} nextText={"Uploading..."}/>
          
        </form>
      </div>
    </Wrapper>
  )
}

export default VideoUpload

const LabelData=({data,text,placeholder,onChange,type,value})=>{
  return(
    <div className=' mainlabel'>
    <label className='font-varela'>{data}</label>
    
    <textarea
    type={type} name={text} placeholder={placeholder} onChange={onChange} value={value} ></textarea>
    </div>
  )
}

const Message=({text,type})=>{
  return (
    <motion.div
    initial={{opacity:0,x:30}}
    animate={{opacity:1,x:0}}
    transition={{type:"tween"}}
    exit={{opacity:0,x:30}}
    className={`absolute right-5 top-18 px-4 rounded-md text-sm ${type === "error"? "bg-red-100 border border-red-300 text-red-500" : "bg-green-100 border border-green-300 text-green-500"}`}>
      <h2 className=''>{text}</h2>
    </motion.div>
  )
}