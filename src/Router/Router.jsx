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
import PaymentsHistory from "../Pages/Dashboard/PaymentsHistory/PaymentsHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import Error404 from "../Components/Error404/Error404";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <Error404/>,
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
        loader: async () => {
          const res = await fetch("/serviceCenter.json");
          return res.json();
        },
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: async () => {
          const res = await fetch("/serviceCenter.json");
          return res.json();
        },
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
    errorElement: <Error404/>,
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
    errorElement: <Error404/>,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: (
          <PrivateRoute>
            <MyParcels></MyParcels>
          </PrivateRoute>
        ),
      },
      {
        path: "payments-history",
        Component: PaymentsHistory,
      },
      {
        path: "payment/:parcelId",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-canceled",
        Component: PaymentCancel,
      },

      // rider only route
      {
        path: 'assigned-deliveries',
        element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
      },


      // admin only route
      {
        path: 'approve-riders', 
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path: 'assign-riders', 
        element: <AdminRoute><AssignRiders/></AdminRoute>
      },
      {
        path: "user-management",
        element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
      }
    ],
  },
]);

export default router;
