import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DeliveredParcels = () => {
      // load data
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });

//   to calculate payOut
const calculatePayout = (parcel)=>{
    if(parcel.senderDistrict === parcel.receiverDistrict){
        return parcel.deliveryCost * 0.8
    }else{
        return parcel.deliveryCost * 0.6
    }
}

    return (
        <div>
            <h2 className="text-4xl font-bold m-5">Delivered Parcels : {parcels.length}</h2>
                  <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Other Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryCost}</td>
                <td className="space-x-5">
                  {
                    calculatePayout(parcel)
                  }
                  
                </td>
                <td>
                 <button className="btn btn-primary text-black">Cash out</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default DeliveredParcels;