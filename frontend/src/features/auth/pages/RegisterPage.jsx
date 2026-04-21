import React, { useState,useRef,useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import ButtonComp from '../../video/pages/uploadData/ButtonComp.jsx'
import Authpage from './Authpage.jsx'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

  const {errorMessage,loading,handleRegister}=useAuth()

  const [username,setUserName]=useState(null)
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)

  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

  const avatarRef=useRef()

  const navigate=useNavigate()

  const handleClick=async(e)=>{
    e.preventDefault()
    
    const avatar=avatarRef.current.files[0]

    if(!username || !email || !password){
      setError("No entries should be empty")
      setSuccess("")
      return;
    }

    if(!avatar){
      setError("No avatar selected")
      setSuccess("")
      return;
    }

    if(!avatar.type.startsWith("image/")){
      setError("Please upload a valid avatar image")
      setSuccess("")
      return;
    }

    
    
    try{
      const success=await handleRegister({username,email,password,avatar})

      if(success){
      navigate("/login")
      }

      setError("")
      setSuccess("Registration successfully !!")
      

    }catch(error){
      setError("Registration failed. Try again !!")
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

      <Authpage text={"Register"}>

        <AnimatePresence>
          {error &&(
          <Message text={error} type="error"/>
        )}
        
          {success &&(
          <Message text={success} type="success"/>
        )}
        </AnimatePresence>
     
        <form onSubmit={handleClick} className='formItem'>

        <LabelData text={"Username"} placeholder={"Enter Your username"} type={"text"} onChange={(e)=>{setUserName(e.target.value)}} />

        <LabelData text={"Email"} placeholder={"Enter Your Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}/>

        <LabelData text={"Password"} placeholder={"Enter Your password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>

        <div className='bg-blue-100  px-5 py-1 rounded-xl text-sm text-neutral-600 font-semibold ring-1 ring-blue-200 shadow-inset'>
          <label>
            <h2>Avatar</h2>
          <input hidden type='file' ref={avatarRef} accept="image/*"/>
          </label>
        </div>

        <ButtonComp text={"Sign Up"} loading={loading} nextText={"Registering..."}/>
       
        </form>


          <h2 className='text-xs text-center  pt-5 text-foreground'>
          Already have an account?
          <Link
          className='text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-2' to={"/login"}> Sign In</Link> to continue</h2>
   
      </Authpage>
        

  )
}

export default RegisterPage

const LabelData=({text,placeholder,onChange,type})=>{
  return(
    <div className=' flex flex-col w-4/5 px-4 gap-1 py-1 rounded-xs'>
    <label className='text-sm md:text-md lg:text-lg font-semibold text-foreground'>{text}</label>
    <input
    className='outline-none w-full hover:shadow-inset rounded-md p-2 bg-gray-200 text-slate-500 text-sm md:text-md'
    type={type} name={text} placeholder={placeholder} onChange={onChange}></input>
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
    className={`absolute right-5 top-10 px-4 rounded-md text-sm ${type === "error"? "bg-red-100 border border-red-300 text-red-500" : "bg-green-100 border border-green-300 text-green-500"}`}>
      <h2 className=''>{text}</h2>
    </motion.div>
  )
}