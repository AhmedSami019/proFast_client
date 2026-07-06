import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import riderVector from "../../../assets/agent-pending.png";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  // load data
  const serviceCenterData = useLoaderData();
  const duplicateRegion = serviceCenterData.map((center) => center.region);
  const regions = [...new Set(duplicateRegion)];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // to get district by region
  const districtByRegion = (region) => {
    const regionDistrict = serviceCenterData.filter(
      (center) => center.region === region,
    );
    const district = regionDistrict.map((data) => data.district);
    return district;
  };

  const handleBeARider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Successful!",
          text: "Your application submitted successfully. we will reach you after 10 days",
          icon: "success",
          timer: 2000
        });
      } else {
        Swal.fire({
          title: "Ooops!",
          text: "application didn't submitted.",
          icon: "error",
          timer: 2000
        });
      }
    });
  };

  return (
    <div>
      <div className="space-y-7">
        <h2 className="text-5xl font-extrabold">Be a Rider</h2>
        <p className="text-gray-500">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. <br /> From personal packages to business shipments — we
          deliver on time, every time.
        </p>
        {/* parcel name and weight */}
        <form onSubmit={handleSubmit(handleBeARider)} className="space-y-5">
          {/* two column */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5 w-full">
            {/* rider details */}
            <div className="w-full">
              <h4 className="text-2xl font-bold">Tell us about yourself</h4>
              <div>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">your Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your name"
                    defaultValue={user.displayName}
                    {...register("Rider")}
                  />
                  <legend className="fieldset-legend">Your email</legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Your email"
                    defaultValue={user.email}
                    {...register("riderEmail")}
                  />
                  <legend className="fieldset-legend">
                    Driving License Number
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Driving License Number"
                    {...register("drivingLicenseNumber")}
                  />
                  {/* region */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Your Region</legend>
                    <select
                      {...register("riderRegion")}
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
                    <legend className="fieldset-legend">Your District</legend>
                    <select
                      {...register("riderDistrict")}
                      defaultValue=""
                      className="select w-full"
                    >
                      <option value="" disabled={true}>
                        Pick a district
                      </option>
                      {districtByRegion(riderRegion).map((district, index) => (
                        <option value={district} key={index}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <legend className="fieldset-legend">Your Address</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your address"
                    {...register("riderAddress")}
                  />
                  <legend className="fieldset-legend">NID Number</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="NID Number"
                    {...register("NIDNumber")}
                  />
                  <legend className="fieldset-legend">Phone Number</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                  <legend className="fieldset-legend">
                    Bike Brand Model & year
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Bike Brand Model & year"
                    {...register("bikeBrandModel&Year")}
                  />
                  <legend className="fieldset-legend">
                    Bike Registration Number
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Bike Registration Number"
                    {...register("bikeRegistrationNumber")}
                  />
                  <legend className="fieldset-legend">
                    Tell Us About Yourself
                  </legend>
                  <textarea
                    type="text"
                    className="textarea resize-none w-full h-8"
                    placeholder="Tell Us About Yourself"
                    {...register("extraInfo")}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary text-black mt-3"
                  >
                    Submit
                  </button>
                </fieldset>
              </div>
            </div>
            {/* rider image */}
            <div className="w-full">
              <img className="mx-auto" src={riderVector} alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rider;
