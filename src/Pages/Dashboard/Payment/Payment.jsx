import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {

    // load data form hook
    const axiosSecure = useAxiosSecure()

    const {parcelId} = useParams()
    const {data: parcel = {}, isLoading} = useQuery({
        queryKey: ['my-parcel', parcelId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    // pay handler function
    const handlePayment = async()=>{
        const paymentInfo = {
            parcelId : parcel._id,
            parcelName : parcel.parcelName,
            senderEmail : parcel.senderEmail,
            cost : parcel.deliveryCost,
            trackingId: parcel.trackingId
        }

        const res = await axiosSecure.post('create-checkout-session', paymentInfo)
        window.location.href = res.data.url

    }

    if(isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    return (
        <div>
            <h3>
                pay now ${parcel.deliveryCost} for {parcel.parcelName}
            </h3>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;