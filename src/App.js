import { Login } from './pages/login';
// import { Navbar } from './components/navbar';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home';
import { Regis } from './pages/regis';
import { Acount } from './pages/acount';
import { Verify } from './pages/verify';
import { useDispatch } from "react-redux";
import  Axios  from 'axios';
import { useEffect } from 'react';
import { setValue } from './redux/acountSlice';
import { ForgetPass } from './pages/forgetPass';
import { Blog} from './pages/blog';
import { ChangePassword } from './pages/changepassword';
import { ChangeProfile } from './pages/changeprofile';
import { CreateBlog } from './pages/createblog';
import { Trending } from './pages/trending';
import { ResetPassword } from './pages/resetpassword';
import { NotFound } from './pages/notFound';
import { MyBlog } from './pages/myblog';
import { SearchPage } from './pages/search';



function App() {

  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const keepLogin = async () => {
    try {
      const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/auth/`,{
        headers:{
          Authorization: `Bearer ${token}` 
        }
      })
      dispatch(setValue(response.data))

    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    keepLogin()
  },[])

  const router = createBrowserRouter([
    {path:"/", element:<Home />},
    {path:"/Login", element:<Login />},
    {path:"/signUp", element:<Regis />},
    {path:"/acount", element:<Acount />},
    {path:"/Verify", element:<ForgetPass />},
    {path:"/verification/:token", element:<Verify />},
    {path:"/verification-change-email/:token", element:<Verify />},
    {path:"/blog/:id", element:<Blog />},
    {path:"/changepassword", element:<ChangePassword />},
    {path:"/profileSetting", element:<ChangeProfile />},
    {path:"/createBlog", element:<CreateBlog />},
    {path:"/trending", element:<Trending />},
    {path:"/reset-password/:token", element:<ResetPassword />},
    {path:"/Sorry:(", element:<NotFound />},
    {path:"/myblog", element:<MyBlog />},
    {path:"/search", element:<SearchPage />}



  ])
  return (
    <div className="App">
      <RouterProvider router={router}>
        
      </RouterProvider>
    </div>
  );
}

export default App;
