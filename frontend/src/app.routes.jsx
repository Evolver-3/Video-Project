import { createBrowserRouter } from "react-router-dom";

import HomePage from "./features/video/pages/HomePage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import VideoId from "./features/video/pages/VideoId.jsx";
import VideoUpload from "./features/video/pages/uploadData/VideoUpload.jsx";
import Protected from "./features/auth/pages/Protected.jsx";
import OwnerPage from "./features/video/pages/ownerPage/OwnerPage.jsx";
import UploadSkeleton from "./features/video/pages/uploadData/UploadSkeleton.jsx";


export const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<RegisterPage/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/:videoId",
    element:<VideoId/>
  },
  {
    path:"/upload",
    element:(
    <Protected fallback={<UploadSkeleton/>}>
      <VideoUpload/>
    </Protected>
    )
  },
  {
    path:"/user/:userId",
    element:<OwnerPage/>
  }
])