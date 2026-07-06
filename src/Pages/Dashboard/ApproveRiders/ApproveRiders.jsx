import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleApprovalRider = (id) => {
    const updatedInfo = { status: "Approved" };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${id}`, updatedInfo).then((res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Successful!",
              text: "Your user become a rider",
              icon: "success",
              timer: 2000,
            });
          }
        });
      }
    });

    console.log(id);
  };

  return (
    <div>
      <h2>You get data of {riders.length} riders data</h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderDistrict}</td>
                <td>
                  <p
                    className={
                      rider.status === "Approved"
                        ? "text-green-500"
                        : "text-warning"
                    }
                  >
                    {rider.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApprovalRider(rider._id)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button className="btn">
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
