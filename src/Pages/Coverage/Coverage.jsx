import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const mapRef = useRef(null)

  const serviceCenters = useLoaderData();

  const handleSearchLocation=(e)=> {
    e.preventDefault()
    const location = e.target.location.value
    const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
    if(district){
        const coord = [district.latitude, district.longitude]
        console.log(coord);
        mapRef.current.flyTo(coord, 14)
    }
  }

  return (
    <div className="bg-white p-10 space-y-10 rounded-2xl">
      <div className="space-y-12 mb-10">
        <h2 className="text-5xl font-bold">We are available in 64 districts</h2>
        <form onSubmit={handleSearchLocation}>
          <label className="input rounded-full border-none">
            <svg
              className="h-6.25 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" name="location" />
            <button type="submit" className="bg-[#CAEB66] text-lg font-bold px-5 py-1 rounded-full relative -right-3">
              search
            </button>
          </label>
        </form>
      </div>
      <div className="divider"></div>
      <div>
        <h2 className="text-3xl font-bold mb-5">
          We deliver almost all over Bangladesh{" "}
        </h2>
        <div className="w-full h-200 rounded-2xl">
          <MapContainer
            className="h-200 w-full rounded-2xl"
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.district}</strong>, {center.region}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
