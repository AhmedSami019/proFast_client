import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // load data
  const serviceCenterData = useLoaderData();
  const duplicateRegion = serviceCenterData.map((center) => center.region);
  const regions = [...new Set(duplicateRegion)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // to get district by region
  const districtByRegion = (region) => {
    const regionDistrict = serviceCenterData.filter(
      (center) => center.region === region,
    );
    const district = regionDistrict.map((data) => data.district);
    return district;
  };

  // handler function
  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-7">
      <h2 className="text-5xl font-extrabold">Send parcel</h2>
      {/* parcel name and weight */}
      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-5">
        <div>
          <h4 className="text-3xl font-bold">Enter your parcel details</h4>
          <div className="divider"></div>
          {/* document type */}
          <div className="flex gap-5">
            <label className="label text-black">
              <input
                type="radio"
                value="document"
                className="radio radio-success"
                {...register("documentType")}
                defaultChecked
              />
              Document
            </label>
            <label className="label text-black">
              <input
                type="radio"
                value="non-document"
                className="radio radio-success"
                {...register("documentType")}
              />
              Non-Document
            </label>
          </div>
          {/* parcel details */}
          <div className="flex items-center gap-5">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Parcel Name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                {...register("parcelName")}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Parcel weight (KG)</legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Type here"
                {...register("parcelWeight")}
              />
            </fieldset>
          </div>
          <div className="divider"></div>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 w-full">
          {/* sender details */}
          <div className="w-full">
            <h4 className="text-2xl font-bold">Sender Details</h4>
            <div>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Sender name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Sender name"
                  {...register("senderName")}
                />
                <legend className="fieldset-legend">Sender Phone</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Sender phone"
                  {...register("senderPhone")}
                />
                {/* region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender Region</legend>
                  <select
                    {...register("senderRegion")}
                    defaultValue=""
                    className="select w-full"
                  >
                    <option value="" disabled={true}>
                      Pick a region
                    </option>
                    {regions.map((region, index) => (
                      <option value={region} key={index}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* district */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender District</legend>
                  <select defaultValue="" className="select w-full">
                    <option value="" disabled={true}>
                      Pick a district
                    </option>
                    {districtByRegion(senderRegion).map((region, index) => (
                      <option
                        {...register("senderDistrict")}
                        value={region}
                        key={index}
                      >
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <legend className="fieldset-legend">Sender Address</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Sender address"
                  {...register("senderAddress")}
                />
                <legend className="fieldset-legend">Pickup Instruction</legend>
                <textarea
                  type="text"
                  className="textarea resize-none w-full h-8"
                  placeholder="Pickup instruction"
                  {...register("pickupInstruction")}
                />
              </fieldset>
            </div>
          </div>
          {/* receiver details */}
          <div className="w-full">
            <h4 className="text-2xl font-bold">Receiver Details</h4>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Receiver name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver name"
                {...register("receiverName")}
              />
              <legend className="fieldset-legend">Receiver Phone</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver phone"
                {...register("receiverPhone")}
              />
              {/* region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled={true}>
                    Pick a region
                  </option>
                  {regions.map((region, index) => (
                    <option value={region} key={index}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled={true}>
                    Pick a district
                  </option>
                  {districtByRegion(receiverRegion).map((district, index) => (
                    <option value={district} key={index}>
                      {district}
                    </option>
                  ))}
                </select>
              </fieldset>

              <legend className="fieldset-legend">Receiver Address</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver address"
                {...register("receiverAddress")}
              />
              <legend className="fieldset-legend">Pickup Instruction</legend>
              <textarea
                type="text"
                className="textarea resize-none w-full h-8"
                placeholder="Pickup instruction"
                {...register("pickupInstruction")}
              />
            </fieldset>
          </div>
        </div>
        <div>
          <p>Pickup time ----</p>
          <button type="submit" className="btn btn-primary text-black">
            Proceed to confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
