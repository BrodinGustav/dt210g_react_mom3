import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";

const HomePage = () => <h1>Startsida</h1>; 
const AdminPage = () => <h1>Admin</h1>; 
const LoginPage = () => <h1>Logga in</h1>; 
const ErrorPage = () => <h1>Sidan existerar inte..</h1>;

//Konfigurera routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [

            {
                path: "/", 
                element: <HomePage />
            },
            {
                path:"/admin",
                element: <AdminPage />
            },
            {
                path:"/login",
                element: <LoginPage />
            },
            {    path: "*",    
                element: <ErrorPage />  }

        ]
    },



])

export default router;