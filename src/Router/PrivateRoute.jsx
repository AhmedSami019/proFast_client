import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname} ></Navigate>;
  }
  return children;
};

export default PrivateRoute;
