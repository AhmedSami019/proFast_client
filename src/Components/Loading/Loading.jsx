import LottieModule from "lottie-react"
import loadingData from "../../assets/lottie/loading.json";
const Lottie = LottieModule.default || LottieModule

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={loadingData} loop autoplay />
    </div>
  );
};

export default Loading;
