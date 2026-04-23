import { useContext,useEffect,useRef } from "react";
import { AuthContext } from "../auth.context.jsx";
import {Login,Register,Profile, Logout} from '../services/auth.api.js'

export const useAuth=()=>{

  const context=useContext(AuthContext)

  const {user,setUser,loading,setLoading,errorMessage,setErrorMessage}=context

  const hasFetched=useRef(false)

  const handleRegister=async({email,username,password,avatar,coverImage})=>{

    setLoading(true)
    try{

      const data=await Register({email,password,username,avatar,coverImage})
  
      setUser(data.user) 
      return true

    }catch(error){

      const message=error?.response?.data?.message || "Registration failed"
      console.log("error in registering",message)
      
      throw message

    }finally{
      setLoading(false)
    }
  }

  const handleLogin=async({email,password})=>{

    setLoading(true)
    try{
      const data=await Login({email,password})

      console.log("Login data:",data.user)
      setUser(data.user)
    
      return true
    }catch(error){

      const message=error?.response?.data?.message || "Login failed"

      console.error("Error loggin in:",message)
      throw message
     }finally{
      setLoading(false)
     }
  }

  const handleLogout=async()=>{

    setLoading(true)
    try {
      await Logout()
      setUser(null)
      
    } catch (error) {
      console.error("Error logging out:",error)

    }finally{
      setLoading(false)
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
        if(data){
          setUser(data)
        }
      }catch(error){
        console.error("Error fetching user profile:", error)
      }finally{
        setLoading(false)
      }
      
    }
   getAndSetUser()
  },[])

  return {user,loading,handleRegister,handleLogin,handleLogout,errorMessage}
}