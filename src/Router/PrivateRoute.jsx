import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
