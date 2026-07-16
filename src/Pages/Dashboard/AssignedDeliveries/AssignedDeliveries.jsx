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
  const handleParcelActions = (parcel, status) => {
    const updatedInfo = {
      deliveryStatus: status,
    };
    let message = `Your parcel update status is ${status.split("_").join(' ')}`
    axiosSecure.patch(`/parcels/${parcel._id}/status`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: "Successful!",
          text: message,
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
              <th>Cost</th>
              <th>Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcels.cost}</td>
                <td className="space-x-5">
                  {
                    parcel.deliveryStatus !== "driver_assigned"? <span className="text-green-700 capitalize">{parcel.deliveryStatus.split("_").join(" ")}</span>:<><button
                    onClick={() => handleParcelActions(parcel, 'rider_arrived')}
                    className="btn btn-primary text-black"
                  >
                    Accept
                  </button>
                  <button className="btn btn-warning text-black">Reject</button></>
                  }
                  
                </td>
                <td>
                  {
                    parcel.deliveryStatus === "rider_arrived" && <button onClick={()=> handleParcelActions(parcel, "picked_up")} className={`btn btn-primary text-black ${parcel.deliveryStatus !== "rider_arrived" && "btn-disabled"}`}>Picked up</button>
                  }
                  {
                    parcel.deliveryStatus === "picked_up" && <button onClick={()=> handleParcelActions(parcel, "parcel_delivered")} className={`btn btn-primary text-black ${parcel.deliveryStatus !== "picked_up" && "btn-disabled"}`}>Delivered</button>
                  }
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
