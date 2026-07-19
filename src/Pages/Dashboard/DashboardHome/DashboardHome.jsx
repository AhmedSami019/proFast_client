import Loading from "../../../Components/Loading/Loading";
import useRole from "../../../Hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {

    const {role, roleLoading} = useRole()
    if(roleLoading){
        return <Loading></Loading>
    }
    if(role.toLowerCase() === "admin"){
        return <AdminDashboardHome></AdminDashboardHome>
    }else if(role.toLowerCase() === "rider"){
        return <RiderDashboardHome></RiderDashboardHome>
    }else{
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;