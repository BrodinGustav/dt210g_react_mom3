import { createBrowserRouter } from "react-router-dom";
import Layout from "./src/components/Layout";

import HomePage from "./src/pages/HomePage"
import AdminPage from "./src/pages/AdminPage"
import LoginPage from "./src/pages/LoginPage"
import ErrorPage from "./src/pages/ErrorPage"
import ProtectedRoute from "./src/components/ProtectedRoute";
import BlogPostDetail from "./src/components/BloggPostDetail";




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
                element: (
                    <ProtectedRoute>
                <AdminPage />
                </ProtectedRoute>
                )
            },
            {
                path:"/login",
                element: <LoginPage />
            },
            {    path: "*",    
                element: <ErrorPage />  
            },
            {    path: "//blogg/:id",    
                element: <BlogPostDetail />  
            }

        ]
    },

]);

export default router;