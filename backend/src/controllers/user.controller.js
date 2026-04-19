import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { TokenBlock } from "../models/block.models.js";

const generateAccessTokenAndRefreshTokens=async(userId)=>{
  try{
    const user=await User.findById(userId)
    const accessToken=user.generateAccessToken()

    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken

    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}

  }catch(error){
    console.log("Error generating tokens:",error)
    throw new ApiError(500, "Something went wrong while generating tokens ")

  }

}

const registerController=asyncHandler(async(req,res)=>{

  const {username,email,password}=req.body

  if([username,email,password].some((field)=>String(field)?.trim()==="")){
    throw new ApiError(400,"All fields are required")
  }

  const avatarFile=req.file;

  if(!avatarFile){
    throw new ApiError(406, "Avatar file is required")
  }

  const avatar=await uploadToCloudinary(avatarFile.buffer)

  if(!avatar){
    throw new ApiError(500,"Something went wrong while uploading the avatar !!")
  }

  const existedUser=await User.findOne(
    {
      $or:[
        {email},
        {username}
      ]
    }
  )

  if(existedUser){
    throw new ApiError(409,"User with the same email or username already exists")
  }

  const user=await User.create(
    {
      username,email,password,avatar:avatar.secure_url
    }
  )
  const createdUser=await User.findById(user._id).select("-password -refreshToken")

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while creating the user !!")
  }

  console.log(createdUser)

  return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully "))
})

const loginController=asyncHandler(async(req,res)=>{
  const {email,password}=req.body

 
  if(!email || !password){
    throw new ApiError(400, "Both entries are required")
  }

  const existingUser=await User.findOne({email})

  if(!existingUser){
    throw new ApiError(404,"Invalid email or password")
  }

  const isPasswordCorrect=await existingUser.comparePassword(password)
  if(!isPasswordCorrect){
    throw new ApiError(401,"Password is incorrect")
  }

  const {accessToken,refreshToken}=await generateAccessTokenAndRefreshTokens(existingUser._id)

  const loggedInUser=await User.findById(existingUser._id).select("-password -refreshToken")

  const options={
    httpOnly:true,
    secure:false
  }
  
  console.log(loggedInUser)

  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(200,{
    user:loggedInUser
  },"User logged in successfully "))
  
})

const logoutUser=asyncHandler(async(req,res)=>{

  const token=req.cookies.accessToken

  if(token){
    await TokenBlock.create({token})
  }

   const options={
    httpOnly:true,
    secure:false
  }

  return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,null,"User logged out successfully !!"))
}
)


const refreshAccessToken=asyncHandler(async(req,res)=>{
  const incomingRefreshToken=req.cookies?.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken){
    throw new ApiError(400,"Refresh token is required")
  }

  try{
    const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

    const user=await User.findById(decodedToken?._id)

    if(!user){
      throw new ApiError(401,"Invalid refreshToken")
    }

    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401,"Refresh Token is expired")
    }

    const options={
    httpOnly:true,
    secure:false
  }

  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(new ApiResponse(200,{
    accessToken,refreshToken:newRefreshToken
  },"Access Token refreshed Successfully"))

  }catch(error){

    throw new ApiError(401,error?.message || "Invalid refreshToken")
  }
})

const getUserProfile=asyncHandler(async(req,res)=>{

  return res.status(200).json(new ApiResponse(200,req.user,"User profile fetched successfully"))
})

export {registerController,loginController,logoutUser,refreshAccessToken,getUserProfile} 