import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import banner from "../assets/banner.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const banners: string[] = [banner, banner2, banner3];

const HeroBanner: FC = () => {
  return (
    <section className="w-full bg-black py-6">
      <div className="banner-container">

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop={true}
          spaceBetween={20}
        >
          {banners.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`banner-${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default HeroBanner;
