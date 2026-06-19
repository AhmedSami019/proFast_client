import merchantLocation from "../../../assets/location-merchant.png";
import beAMerchant from "../../../assets/be-a-merchant-bg.png";

const HomeBanner2 = () => {
  return (
    <div className="bg-secondary rounded-2xl text-white">
      <img src={beAMerchant} alt="" />
      <div className="flex gap-5 px-20 relative -top-20">
        <div className="w-2/3 space-y-5">
          <h3 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h3>
          <p className="">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
        </div>
        <div className="w-1/2">
          <img src={merchantLocation} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner2;
