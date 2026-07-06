import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Stay",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "Successfully logged out.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error.code);
          });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My parcels</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/approve-riders">approve riders</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div>
          <Logo />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a onClick={handleLogOut} className="btn btn-outline ">
            Logout
          </a>
        ) : (
          <Link to={"/login"} className="btn btn-outline ">
            Login
          </Link>
        )}
        <Link to={"/rider"} className="btn btn-primary text-black mx-4">
          Be a Rider
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
