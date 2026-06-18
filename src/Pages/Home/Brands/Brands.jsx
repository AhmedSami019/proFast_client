import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star_people from "../../../assets/brands/start-people 1.png";
import star from "../../../assets/brands/start.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const allBrands = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star_people,
    star,
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star_people,
    star,
  ];
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">
        We've helped thousands of sales teams
      </h2>

      <Swiper
      modules={[Autoplay]}
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{ delay: 1200, disableOnInteraction: false }}
        loop={true}
      >
        {allBrands.map((brand) => (
          <SwiperSlide>
            <img src={brand} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
