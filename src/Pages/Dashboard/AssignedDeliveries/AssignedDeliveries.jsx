import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  // load data
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });

  // event handler
  const handleAcceptParcel = (parcel) => {
    const updatedInfo = {
      deliveryStatus: "rider_arrived",
    };
    axiosSecure.patch(`/parcels/${parcel._id}/status`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: "Successful!",
          text: "Rider assigned for this parcel",
          icon: "success",
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold m-5">
        Assigned Deliveries : {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Job</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>Quality Control Specialist</td>
                <td className="space-x-5">
                  <button
                    onClick={() => handleAcceptParcel(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Accept
                  </button>
                  <button className="btn btn-warning text-black">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
