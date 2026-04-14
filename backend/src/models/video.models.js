import mongoose from 'mongoose'

const videoSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
      trim:true
    },
    description:{
      type:String,
      required:true,
      trim:true
    },
    videoUrl:{
      type:String,
      required:true
    },
    duration:{
      type:Number
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    thumbnail:{
      type:String,
      required:true
    },
    views:{
      type:Number,
      default:0
    },
    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    // comments:[
    //   {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Comment"
    //   }
    // ],
    isPublished:{
      type:Boolean,
      default:true
    }

  },
  {
    timestamps:true
  }
)

export const Video=mongoose.model("Video",videoSchema)