import Forbidden from "../Components/Forbidden/Forbidden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoute = ({children}) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role.toLowerCase() !== "rider") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default RiderRoute;
