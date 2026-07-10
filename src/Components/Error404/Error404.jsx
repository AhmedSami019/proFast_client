import LottieModule from "lottie-react"
import errorData from "../../assets/lottie/Error 404.json"
import { FaArrowLeft} from "react-icons/fa";
import { useNavigate } from "react-router";
const Lottie = LottieModule.default || LottieModule
const Error404 = () => {

    const navigate = useNavigate()
    
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Page not Found</h1>
                <button onClick={()=>navigate(-1)} className="btn btn-primary text-black"><FaArrowLeft/>Go back</button>
            </div>
            <Lottie animationData={errorData} loop autoplay/>
        </div>
    );
};

export default Error404;