import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import Coverage from "../Pages/Coverage/Coverage";

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
    }
])

export default router