import './src/utils/config.js'
import { app } from "./src/app.js";
import { connectDB } from "./src/db/db.js";

connectDB().then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
  }
  )
}).catch((error)=>{
  console.error("failed to connect to the database", error)
})