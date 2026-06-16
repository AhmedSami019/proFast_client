import DeliveryOptions from "../DeliveryOptions/DeliveryOptions";
import Services from "../Services/Services";
import HeroBanner from "./HeroBanner/HeroBanner";

const HomePage = () => {
    return (
        <div className="space-y-10">
            <HeroBanner/>
            <DeliveryOptions/>
            <Services/>
        </div>
    );
};

export default HomePage;