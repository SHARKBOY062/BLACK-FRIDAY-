import type { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// CSS do Swiper — forma que NUNCA dá erro no TS
import "swiper/css";
import "swiper/css/pagination";

import banner from "../assets/banner.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const banners = [banner, banner2, banner3];

const HeroBanner: FC = () => {
  return (
    <section className="w-full bg-black py-6">
      <div className="banner-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          spaceBetween={20}
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`banner-${index}`} className="w-full h-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroBanner;
