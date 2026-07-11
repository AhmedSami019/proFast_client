import Forbidden from "../Components/Forbidden/Forbidden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({children}) => {

    const {loading} = useAuth()
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(role.toLowerCase() !== "admin"){
        return <Forbidden></Forbidden>
    }

    return children
};

export default AdminRoute;