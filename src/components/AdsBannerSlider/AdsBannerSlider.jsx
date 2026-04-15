import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import image1 from "../../assets/Untitled design.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import image5 from "../../assets/image5.png"
import BannerBox from "../BannerBox/BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="SmlBtn "
         breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
      >
        <SwiperSlide>
           <BannerBox img={image1} link={"/"} />
        </SwiperSlide>

          <SwiperSlide>
           <BannerBox img={image2} link={"/"} />
        </SwiperSlide>

         <SwiperSlide>
           <BannerBox img={image3} link={"/"} />
        </SwiperSlide>

           <SwiperSlide>
           <BannerBox img={image4} link={"/"} />
        </SwiperSlide>

           <SwiperSlide>
           <BannerBox img={image5} link={"/"} />
        </SwiperSlide>

         
       

        
    
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
