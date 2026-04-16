import React, { useState,useRef } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const {errorMessage,loading,handleRegister}=useAuth()

  const [username,setUserName]=useState(null)
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)

  const avatarRef=useRef()

  const navigate=useNavigate()

  const handleClick=async(e)=>{
    e.preventDefault()
    
    const avatar=avatarRef.current.files[0]
    
    const success=await handleRegister({username,email,password,avatar})

    if(success){
      navigate("/login")
    }

  }


  return (
    <main>
      <div className='rounded-sm bg-black/25 flex flex-col items-center justify-center h-full w-1/2 gap-3 mx-5'>

      <form onSubmit={handleClick} className='h-1/2 w-full flex flex-col justify-around  items-center bg-neutral-700 rounded-xl py-5 px-4 '>

        <LabelData text={"Username"} placeholder={"Enter Your username"} type={"text"} onChange={(e)=>{setUserName(e.target.value)}} />

        <LabelData text={"Email"} placeholder={"Enter Your Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}/>

        <LabelData text={"Password"} placeholder={"Enter Your password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>

        <div className='rounded-sm bg-gray-500 w-fit px-3 text-sm py-1 '>
          <label>
            <h2>Label</h2>
          <input hidden type='file' ref={avatarRef} accept="image/*"/>
          </label>
        </div>

        <button className='bg-green-400 text-neutral-400 rounded-md px-2 py-1 font-semibold '>Sign Up</button>
       
      </form>
        
      </div>
    </main>
  )
}

export default RegisterPage

const LabelData=({text,placeholder,onChange,type})=>{
  return(
    <div className='w-full text-white bg-neutral-800 flex justify-around rounded-md px-2 py-1 shadow-md hover:ring-1 hover:ring-rose-300 outline-none text-sm hover:bg-neutral-600 transition-colors duration-300 '>
    
    <input
    className='outline-none w-full'
    type={type} name={text} placeholder={placeholder} onChange={onChange}></input>
    </div>
  )
}