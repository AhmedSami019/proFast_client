import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BiDetail, BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  // loaded data by hooks
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  //   to handle delete single parcel
  const handleDeleteParcel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //   to handle payment
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      cost: parcel.deliveryCost,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center my-5 mx-5">
          <h1 className="text-4xl font-bold">My parcels</h1>
          <Link to={"/send-parcel"} className="btn btn-primary text-black"
          >Create parcel</Link>
        </div>
        <table className="table table-zebra border-t border-gray-300">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Parcel cost</th>
              <th>Payment</th>
              <th>Tracking id</th>
              <th>Delivery status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryCost} tk</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <Link
                    to={`/dashboard/payment/${parcel._id}`}
                    className="btn btn-square hover:bg-primary"
                  >
                    <BiDetail size={24} />
                  </Link>
                  <button className="btn btn-square hover:bg-primary mx-3">
                    <BiEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <RiDeleteBin5Fill size={24} />
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

export default MyParcels;
