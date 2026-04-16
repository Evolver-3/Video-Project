import axios from 'axios'


const api=axios.create({
  baseURL:"http://localhost:3000/api/v1/users",
  withCredentials:true
})

export async function Register({username,email,password,avatar}){ 

  try{
    const formData=new FormData()

    formData.append("username",username)
    formData.append("email",email)
    formData.append("password",password)
    if(avatar)formData.append("avatar",avatar)

    const response=await api.post("/register",formData)

    console.log("Response from the backend to frontend:", response.data.data)
    return response.data.data


  }catch(error){

    console.log("Error :",error.response?.data ||error.message)
    throw error

  }
}

export async function Login({email,password}){
  try{

    const response=await api.post("/login",{email,password})

    console.log(response.data.data)

    return response.data.data

  }catch(error){

    console.log("Error :",error.response?.data ||error.message)
    throw error

  }
}

export async function Profile(){
  try{
    const response=await api.get("/profile")
    return response.data.data
  }catch(error){
    
    console.log("Error :",error.response?.data ||error.message)
    throw error
  }
}