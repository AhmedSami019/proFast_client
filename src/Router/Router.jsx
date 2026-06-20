import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index :true,
                Component: HomePage
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: ()=> fetch('serviceCenter.json').then(res => res.json())
            }
        ]
    },
    {
        path: '/', 
        Component: AuthLayouts,
        children: [
            {
                path: 'login', 
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
])

export default router