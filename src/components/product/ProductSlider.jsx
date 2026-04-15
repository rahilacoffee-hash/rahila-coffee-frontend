import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItems from "./ProductItems";
import HomeProductItems from "./HomeProductItems";

const ProductSlider = (props) => {
  return (
    <div className=" productsSlider py-3">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
      >
        <SwiperSlide>
        <HomeProductItems/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
