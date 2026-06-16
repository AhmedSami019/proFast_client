import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index :true,
                Component: HomePage
            }
        ]
    }
])

export default router