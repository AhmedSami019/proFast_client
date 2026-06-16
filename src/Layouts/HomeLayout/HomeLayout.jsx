import { Outlet } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="bg-base-100">
      <section className="w-11/12 mx-auto">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </section>
    </div>
  );
};

export default HomeLayout;
