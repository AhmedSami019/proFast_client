import { TbTruckDelivery } from "react-icons/tb";


const optionsData = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const DeliveryOptions = () => {
  return (
    <div className="px10 md:px-20 space-y-5">
      <h2 className="text-3xl font-bold">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {optionsData.map((potion, index) => (
          <div key={index} className="bg-white rounded-2xl p-7 space-y-2">
            <div>
                <TbTruckDelivery size={40} />
            </div>
            <h3 className="text-xl font-semibold">{potion.title}</h3>
            <p className="text-base-200">{potion.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
