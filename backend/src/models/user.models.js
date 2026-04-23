import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema=new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      unique:true,
      required:true
    },
    avatar:{
      type:String,
    },
    coverImage:{ 
      type:String
    },
    handle:{
      type:String,
      unique:true,
      required:true
    },
    description:{
      type:String
    },
    links:[
      {
        title:String,
        url:String
      }
    ],
    contactInfo:{
      email:String,
      phone:String
    },
    subscribedTo:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    subscribers:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    refreshToken:{
      type:String
    }
  },
  {
    timestamps:true
  }
)

UserSchema.pre("save",async function(){
  if(!this.isModified("password"))return
   
  this.password=await bcrypt.hash(this.password,10)
  
})

UserSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
    {
      _id:this.id
    },
    process.env.REFRESH_TOKEN_SECRET,{
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User=mongoose.model("User",UserSchema)