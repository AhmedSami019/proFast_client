import merchantLocation from "../../../assets/location-merchant.png";
import beAMerchant from "../../../assets/be-a-merchant-bg.png";

const HomeBanner2 = () => {
  return (
    <div className="bg-secondary rounded-2xl text-white pb-8">
      <img src={beAMerchant} alt="" />
      <div className="flex gap-5 px-5 md:px-20 md:relative -top-20">
        <div className="w-full md:w-2/3 space-y-5">
          <h3 className="text-3xl md:text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h3>
          <p className="">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
        </div>
        <div className="md:w-1/2">
          <img className="w-full" src={merchantLocation} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner2;
