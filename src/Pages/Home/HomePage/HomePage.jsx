import DeliveryOptions from "../DeliveryOptions/DeliveryOptions";
import HeroBanner from "./HeroBanner/HeroBanner";

const HomePage = () => {
    return (
        <div className="space-y-10">
            <HeroBanner/>
            <DeliveryOptions/>
        </div>
    );
};

export default HomePage;