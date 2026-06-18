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
            <div className="h-0.5 w-full bg-[repeating-linear-gradient(to_right,#d1d5db_0_15px,transparent_10px_30px)]"></div>
        </div>
    );
};

export default HomePage;