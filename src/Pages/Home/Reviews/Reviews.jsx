import { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import customer_top from "../../../assets/customer-top.png";

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setAllReviews(data));
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <img className="mx-auto w-80" src={customer_top} alt="" />
      </div>
      <div>
        <h2 className="text-3xl text-center font-bold mb-3">
          What our customer are saying
        </h2>
        <p className="text-base-200 text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 100,
            modifier: 1,
            slideShadows: true,
            scale: 0.75
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
           autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        >
          {allReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
