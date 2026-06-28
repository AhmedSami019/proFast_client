import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {

    // states
    const [paymentInfo, setPaymentInfo] = useState({})

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    },[sessionId,axiosSecure])

    return (
        <div>
            your payment success
            <p>your tracking id : {paymentInfo.trackingId}</p>
            <p>your transaction id : {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;