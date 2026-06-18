import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = () => {
    return (
         <div className="max-w-md rounded-3xl p-8 shadow-sm bg-white">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl text-gray-500 mb-6" />

      {/* Review Text */}
      <p className="text-base-content/70 leading-8 text-[15px]">
        A posture corrector works by providing support and gentle alignment to
        your shoulders, back, and spine, encouraging you to maintain proper
        posture throughout the day.
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-500 my-6"></div>

      {/* Reviewer */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan-900"></div>

        <div>
          <h4 className="font-bold text-cyan-900 text-lg">
            Awlad Hossin
          </h4>
          <p className="text-sm text-base-content/60">
            Senior Product Designer
          </p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;