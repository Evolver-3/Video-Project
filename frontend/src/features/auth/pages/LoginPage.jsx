import React,{useState} from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const {handleLogin}=useAuth()

   const [email,setEmail]=useState(null)
   const [password,setPassword]=useState(null)

   const navigate=useNavigate()

   const handleClick=async(e)=>{
    e.preventDefault()

    const success=await handleLogin({email,password})

    if(success){
      navigate("/")
    }
   }
  return (
     <main>
      <div className='rounded-sm bg-black/25 flex flex-col items-center justify-center h-full w-1/2 gap-3 mx-5'>

      <form onSubmit={handleClick} className='h-1/2 w-full flex flex-col justify-around  items-center bg-neutral-700 rounded-xl py-5 px-4 '>

       <LabelData text={"Email"} placeholder={"Enter Your Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}/>

        <LabelData text={"Password"} placeholder={"Enter Your password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>

        <button className='bg-green-400 text-neutral-100 rounded-md px-2 py-1 font-semibold '>Sign Up</button>

      </form>
      </div>

      </main>
      
  )
}

export default LoginPage


const LabelData=({text,placeholder,onChange,type})=>{
  return(
    <div className='w-full text-white bg-neutral-800 flex justify-around rounded-md px-2 py-1 shadow-md hover:ring-1 hover:ring-rose-300 outline-none text-sm hover:bg-neutral-600 transition-colors duration-300 '>
    
    <input
    className='outline-none w-full'
    type={type} name={text} placeholder={placeholder} onChange={onChange}></input>
    </div>
  )
}