import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  // load parcel tracking data
  const { data: trackings = [] } = useQuery({
    queryKey: ["trackings", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/parcel-trackings/${trackingId}/logs`,
      );
      return res.data;
    },
  });

  return (
    <div className="h-screen">
      <h2 className="text-4xl font-bold">Track your parcel status</h2>
      <p className="text-xl my-5">Tracking id : {trackingId}</p>
      <ul className="timeline timeline-vertical mt-10">
        {trackings.map((tracking) => (
          <li key={tracking._id}>
            <div className="timeline-start text-lg">{new Date(tracking.createdAt).toLocaleString()}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box text-lg">
              {tracking.details}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelTrack;
