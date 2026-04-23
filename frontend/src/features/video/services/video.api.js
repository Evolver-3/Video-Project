import axios from "axios";

const api=axios.create({
  baseURL:"http://localhost:3000/api/v1/video",
  withCredentials:true
})

export async function VideoPost({title,description,videoUrl}){

  try{
    const formData=new FormData()

    formData.append("title",title)
    formData.append("description",description)
    
    if(videoUrl)formData.append("videoUrl",videoUrl)

    const response=await api.post("/uploadVideo",formData)

    console.log("Video upload response:", response.data.data)

    return response.data.data

  }catch(error){
  
    console.log("Video upload Error:",error)
    throw error

  }
}

export async function VideoGetAll(){
  try{
    const response=await api.get("/allVideos")

    return response.data.data

  }catch(error){
    console.log("Getting all videos error:",error)
    throw error
  }
}

export async function VideoById(videoId){
  try{
    const response=await api.get(`/${videoId}`)

    return response.data

  }catch(error){
    console.log("error on api getting video by id",error)
    throw error
  }
}

export async function PublishFlag(videoId){
  try{

    const response=await api.patch(`/${videoId}/publish`)

    console.log(response.data)
    return response.data
  }catch(error){
    console.log("Publish api error:",error)
    throw error
  }
}

export async function LikeFlag(videoId){
  try{
    const response=await api.post(`/${videoId}/like`)

    console.log(response.data)

    return response.data

  }catch(error){
    console.log("Flag api error:",error)
    throw error
  }
}

export async function OwnerAllData(userId){

  try{

    const response=await api.get(`/user/${userId}`)

    return response.data.data

  }catch(error){
    console.log("Owner data error:",error)

    throw error
  }
}
