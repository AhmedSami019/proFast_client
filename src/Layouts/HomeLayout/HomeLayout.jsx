import { Outlet } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";

const HomeLayout = () => {
  const { loading } = useAuth();

  return (
    <div className="bg-base-100">
      {loading ? (
        <Loading></Loading>
      ) : (
        <section className="w-11/12 mx-auto space-y-10">
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </section>
      )}
    </div>
  );
};

export default HomeLayout;
