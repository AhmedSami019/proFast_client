import parcelTrack from "../../../assets/live-tracking.png"
import safeDelivery from "../../../assets/safe-delivery.png"

const allFeatures = [
    {
        title: "Live parcel tracking", 
        img: parcelTrack,
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        title: "100 % safe delivery", 
        img: safeDelivery,
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    },
    {
        title: "Live parcel tracking", 
        img: safeDelivery,
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
    },
]


const Features = () => {
    return (
        <div className="space-y-5">
            {
                allFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-5 md:gap-10 bg-white p-5 md:p-10 rounded-2xl">
                        <div>
                            <img src={feature.img} alt="" />
                        </div>
                        <div className="w-0.5 h-40 bg-[repeating-linear-gradient(to_bottom,#d1d5db_0_5px,transparent_15px_20px)]"></div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-base-200">{feature.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Features;