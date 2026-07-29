import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleUpdateRider = (rider, status) => {
    const updatedInfo = { status, rider };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes ${status.toLowerCase() === "approved" ? "Approved" : "Reject"} it`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${rider._id}`, updatedInfo).then((res) => {
          if (res.data.success === true) {
            refetch();
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
  };

  const handleApprovalRider = (rider) => {
    handleUpdateRider(rider, "Approved");
  };

  const handleRejectRider = (rider) => {
    handleUpdateRider(rider, "Rejected");
  };

  const handleDeleteRider = (rider)=>{
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes delete this user`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: "You successfully remove this rider",
              icon: "success",
              timer: 2000,
            });
          }
        });
      }
    });
  }

  return (
    <div>
      {/* table */}
      <h2 className="text-4xl font-bold m-4">Applicant Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-t border-gray-300">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th>District</th>
              <th>Status</th>
              <th className="hidden md:table-cell">Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td className="hidden md:table-cell">{rider.riderEmail}</td>
                <td>{rider.riderDistrict}</td>
                <td className="hidden md:table-cell">
                  <p
                    className={
                      rider.status === "Approved"
                        ? "text-green-500"
                        : rider.status === "Rejected"
                          ? "text-red-600"
                          : "text-warning"
                    }
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td className="flex flex-wrap gap2 justify-center items-center">
                  <button
                    onClick={() => handleApprovalRider(rider)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejectRider(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button onClick={()=> handleDeleteRider(rider)} className="btn">
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
