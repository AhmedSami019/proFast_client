import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/BeARider/Rider/Rider";
import SendParcel from "../Pages/SentParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "my-parcels",
        element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
      },
      {
        path: "payment/:parcelId",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-canceled',
        Component: PaymentCancel
      }
    ]
  }
]);

export default router;
