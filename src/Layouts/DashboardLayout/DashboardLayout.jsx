import { FaCubes, FaRegCreditCard, FaTasks, FaUsers } from "react-icons/fa";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";
import { TbTruckDelivery } from "react-icons/tb";
import { BsUiChecks } from "react-icons/bs";
import logoImg from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, loading, logOut } = useAuth();

  // handle logout function
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

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-20 w-full bg-gray-300 flex justify-between">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          {/* dashboard user avatar show */}
          <div className="px-4">
            <div className="flex justify-end">
              <div className="dropdown dropdown-end">
                {/* Trigger */}
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 bg-gray-200 rounded-full p-1 cursor-pointer"
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img alt="User avatar" src={user?.photoURL} />
                    </div>
                  </div>

                  <p className="font-medium mr-2">
                    {loading ? "userName" : user?.displayName}
                  </p>
                </div>

                {/* Dropdown */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-50 mt-2 w-52 p-2 shadow"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full mt-15 lg:mt-0 grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="App Home"
              >
                <img
                  src={logoImg}
                  alt="ProFast"
                  className="w-10 h-10 object-contain"
                />
                <span className="is-drawer-close:hidden text-3xl font-bold">
                  ProFast
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard"}
                end
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/my-parcels"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My-Parcels"
              >
                <FaCubes />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/payments-history"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment-history"
              >
                <FaRegCreditCard />
                <span className="is-drawer-close:hidden">Payment history</span>
              </NavLink>
            </li>

            {/* rider only links */}
            {role === "rider" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/assigned-deliveries"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Deliveries"
                  >
                    <FaTasks />
                    <span className="is-drawer-close:hidden">
                      Assigned Deliveries
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/delivered-parcels"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Delivered Parcel"
                  >
                    <BsUiChecks />
                    <span className="is-drawer-close:hidden">
                      Delivered Parcel
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* admins only links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/approve-riders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Rider Management"
                  >
                    <MdOutlineDirectionsBike />
                    <span className="is-drawer-close:hidden">
                      Rider Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/assign-riders"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Rider"
                  >
                    <TbTruckDelivery />
                    <span className="is-drawer-close:hidden">Assign Rider</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/user-management"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
