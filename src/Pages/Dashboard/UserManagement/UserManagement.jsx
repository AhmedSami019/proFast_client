import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { BsShieldSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  // to make an admin
  const handleManageAdmin = (user) => {
    const updatedInfo = {
      role: "admin",
    };

    if (user.role?.toLowerCase() === "admin") updatedInfo.role = "user";

    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${user.role.toLowerCase() === "admin" ? "remove" : "make"} this user ${user.role.toLowerCase() === "admin" ? "from" : "as"} admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes ${user.role.toLowerCase() === "admin" ? "remove" : "make admin"}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, updatedInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: `${user.displayname} confirmed as an admin`,
              icon: "success",
              timer: 2000,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">User Management</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Role</th>
              <th>Admins Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  {user.role?.toLowerCase() === "admin" ? (
                    <button
                      onClick={() => handleManageAdmin(user)}
                      className="btn bg-amber-300"
                    >
                      <BsShieldSlashFill />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleManageAdmin(user)}
                      className="btn bg-green-300"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
