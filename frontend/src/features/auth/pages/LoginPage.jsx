import React,{useEffect, useState} from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import Authpage from './Authpage.jsx'
import ButtonComp from '../../video/pages/uploadData/ButtonComp.jsx'
import  Wrapper from './../../video/pages/Wrapper.jsx'
import { motion ,AnimatePresence} from 'motion/react'

const LoginPage = () => {

  const {handleLogin,loading}=useAuth()

   const [email,setEmail]=useState(null)
   const [password,setPassword]=useState(null)

   const navigate=useNavigate()

   const [success,setSuccess]=useState("")
   const [error,setError]=useState("")

   const handleClick=async(e)=>{
    e.preventDefault()

    if(!email || !password){
      setError("No entries should be empty")
      setSuccess("")
      return;
    }

    try{
      const success=await handleLogin({email,password})

      if(success){
      navigate("/")
      }
      setError("")
      setSuccess("Sign In successfully !!")
    
    }catch(error){
      setError("Login failed. Try again.")
      setSuccess("")
    }
   }

   useEffect(()=>{
    if(success || error){
      const timer=setTimeout(()=>{
        setSuccess("")
        setError("")
      },4000)

      return()=>clearTimeout(timer)
    }
   },[success,error])
  return (
    <Wrapper>

        <AnimatePresence>
          {error &&(
          <Message text={error} type="error"/>
        )}
        
          {success &&(
          <Message text={success} type="success"/>
        )}
        </AnimatePresence>

      <Authpage text={"Log In"}>
      <form onSubmit={handleClick} className='formItem'>

       <LabelData text={"Email"} placeholder={"Enter Your Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}/>

        <LabelData text={"Password"} placeholder={"Enter Your password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>

          <ButtonComp loading={loading} text={"Log In"}/>

      </form>
      </Authpage> 
    </Wrapper>
  )
}

export default LoginPage


const LabelData=({text,placeholder,onChange,type})=>{
  return(
    <div className='mainlabel'>
    <input
    className='outline-none w-full'
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
    className={`absolute right-5 top-18 px-4 rounded-md text-sm ${type === "error"? "bg-red-100 border border-red-300 text-red-500" : "bg-green-100 border border-green-300 text-green-500"}`}>
      <h2 className=''>{text}</h2>
    </motion.div>
  )
}