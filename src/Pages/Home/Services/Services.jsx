import { useEffect, useState } from "react";
import serviceIcon from "../../../assets/service.png"

const Services = () => {

    const [allServices, setAllServices] = useState([])

    useEffect(()=> {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setAllServices(data))
    }, [])

    return (
        <div className="bg-secondary rounded-2xl p-10 md:p-20 space-y-8">
            <h2 className="text-white text-4xl font-bold text-center">Our Services</h2>
            <p className="text-white text-center">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    allServices.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl flex flex-col items-center gap-5 text-center">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <img src={serviceIcon} alt="" />
                            </div>
                            <h3 className="text-secondary text-2xl font-bold">{service.title}</h3>
                            <p className="text-secondary">{service.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;