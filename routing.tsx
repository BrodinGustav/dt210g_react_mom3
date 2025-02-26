import { createBrowserRouter } from "react-router-dom";
import Layout from "./src/components/Layout";

import HomePage from "./src/pages/HomePage"
import AdminPage from "./src/pages/AdminPage"
import LoginPage from "./src/pages/LoginPage"


//Autentisiering
/*const authenticateUser = async () => {
    const token = localStorage.getItem('token');
 
    if(!token) {
        return redirect('/login');
    }
    return null;
};*/



//Konfigurera routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,    /*Övergripande komponent*/
        children: [

            {
                path: "/", 
                element: <HomePage />
            },
            {
                path:"/admin",
                element: <AdminPage />,
                //loader: authenticateUser
            },
            {
                path:"/login",
                element: <LoginPage />
            },
            {    path: "*",    
                element: <ErrorPage />  
            }

        ]
    },

]);

export default router;