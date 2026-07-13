import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignedDeliveries = () => {

    // load data 
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data : parcels = []}= useQuery({
        queryKey: ["parcels", user.email, 'driver_assigned'],
        queryFn: async()=>{
            const res = await axiosSecure.get(``)
            return res.data
        }
    })

    return (
        <div>
            <h2 className="text-4xl font-bold m-5">Assigned Deliveries : {parcels.length}</h2>
        </div>
    );
};

export default AssignedDeliveries;