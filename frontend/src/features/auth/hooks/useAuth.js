import { useContext,useEffect,useRef } from "react";
import { AuthContext } from "../auth.context.jsx";
import {Login,Register,Profile} from '../services/auth.api.js'

export const useAuth=()=>{

  const context=useContext(AuthContext)

  const {user,setUser,loading,setLoading,errorMessage,setErrorMessage}=context

  const hasFetched=useRef(false)

  const handleRegister=async({email,username,password,avatar})=>{

    setLoading(true)
    try{

      const data=await Register({email,password,username,avatar})
      console.log(data)
      setUser(data)
      return true

    }catch(error){

      setErrorMessage(error)
      console.log("error in registering",error)
      return false

    }finally{
      setLoading(false)
    }
  }

  const handleLogin=async({email,password})=>{

    setLoading(true)
    try{
      const data=await Login({email,password})

      console.log("Login data:",data)
      setUser(data)
      setLoading(false)
      return true
    }catch(error){
      setErrorMessage(error)

      console.error("Error registering user:",error)

      setLoading(false)
      return false
    }
  }

  useEffect(()=>{
    if(hasFetched.current) return 
    hasFetched.current=true

    if(user) return

    const getAndSetUser=async()=>{
      try{
        setLoading(true)
        const data=await Profile()
        if(data?.user){
          setUser(data.user)
        }
      }catch(error){
        console.error("Error fetching user profile:", error)
      }finally{
        setLoading(false)
      }
      
    }
   getAndSetUser()
  },[])

  return {user,loading,handleRegister,handleLogin,errorMessage}
}