import Brands from "../Brands/Brands";
import DeliveryOptions from "../DeliveryOptions/DeliveryOptions";
import Services from "../Services/Services";
import HeroBanner from "./HeroBanner/HeroBanner";

const HomePage = () => {
    return (
        <div className="space-y-20">
            <HeroBanner/>
            <DeliveryOptions/>
            <Services/>
            <Brands></Brands>
        </div>
    );
};

export default HomePage;