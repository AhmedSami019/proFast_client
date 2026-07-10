import LottieModule from "lottie-react";
import forbidden from "../../assets/lottie/forbidden403.json";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
const Lottie = LottieModule.default || LottieModule;
const Forbidden = () => {

    const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Lottie className="w-xl mb-20" animationData={forbidden} loop autoplay />
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-5xl font-bold">Access forbidden 403</h1>
        <p>Sorry! we can't give you access in this page</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary text-black"
        >
          <FaArrowLeft />
          Go back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
