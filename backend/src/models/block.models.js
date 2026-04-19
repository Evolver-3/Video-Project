import mongoose from 'mongoose'

const blockSchema=new mongoose.Schema(
  {
    token:{
      type:String,
      required:[true,"Token is required to be added in block list !!"]
    }
  },
  {
    timestamps:true
  }
)

export const TokenBlock=mongoose.model("TokenBlock",blockSchema)