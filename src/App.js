import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './Pages/Home';
import { EditPostImage } from './Pages/EditPostImage';
import { CreatePost } from './Pages/CreatePost';
import { ViewProfile } from './Pages/ViewProfile';
import { ViewProfiles } from './Pages/ViewProfiles';
import { Register } from './Pages/Register';
import AllUsers from './Pages/AllUsers';


function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/allusers', element: <AllUsers /> },
    { path: '/allusers/:likedusers', element: <AllUsers /> },
    { path: '/home/:id', element: <Home /> },
    { path: '/home/:id/:viewuserpost', element: <Home /> },
    { path: '/editpostimage/:postid', element: <EditPostImage /> },
    { path: '/createpost/:userid', element: <CreatePost /> },
    { path: '/viewprofile/:userid', element: <ViewProfile /> },
    { path: '/viewprofiles/:fArray', element: <ViewProfiles /> },
  ])

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
