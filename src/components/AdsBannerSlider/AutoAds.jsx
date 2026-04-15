import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import image6 from "../../assets/image7.png";

// All brand images
const images = [
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743002502/icv-ng/po22vuv9ppjlsbuwdh3r.svg",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1764154789/icv-ng/avuyzvz7ufhz6zorqkks.png",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004259/icv-ng/aqjf1n3ftveucdv8f1jx.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004288/icv-ng/sivetsbua3rczrbq8wwg.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1760953503/icv-ng/jq5gyi9ft9zmbdi5milp.png",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004312/icv-ng/zwwy1s5i3v1yfrxzibqx.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004448/icv-ng/ewtxn0j8n1r5uxckokct.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004485/icv-ng/wiirt6dlk9jtw7shavc9.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743004512/icv-ng/yawuyzjtyjjpgvhzbaws.svg",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1764155842/icv-ng/ffpsnadzongh4b80f0tu.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762350514/icv-ng/roxswxgglmzhabhwwsxd.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1764155996/icv-ng/gfjjo7gnbxm7msbvoteq.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1764155714/icv-ng/xtqq84mz3vs6rthajr21.png",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743005010/icv-ng/a3bo4ikzokslq1wsveiu.svg",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762345450/icv-ng/th4qmiyriynhniwfsggv.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762343893/icv-ng/ti7zx8kl5jfcyc0feplv.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762350040/icv-ng/mz2r056dgzmrpifiht9k.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762343044/icv-ng/nz4qswukp2banz5doxci.png",
  image6,
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1762339688/icv-ng/dzyojwtptohrjo4gtq5s.png",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1752496477/icv-ng/agkeyaip3lhf2oy6khvq.png",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1743005499/icv-ng/j3hzfmicwlo4dr8q4rjt.svg",
  "http://res.cloudinary.com/dwwsz3kss/image/upload/v1753267988/icv-ng/pwb6z4mgdepc43hbpuew.png",
  "https://res.cloudinary.com/dwwsz3kss/image/upload/v1764155204/icv-ng/p2dxreydqqrjw2tftsbd.png",
];

const NavSwiper = () => {
  return (
    <div className="w-full py-4 md:py-6 bg-gray-100 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0:    { slidesPerView: 4,  spaceBetween: 8  },
          480:  { slidesPerView: 5,  spaceBetween: 10 },
          640:  { slidesPerView: 7,  spaceBetween: 12 },
          960:  { slidesPerView: 9,  spaceBetween: 14 },
          1280: { slidesPerView: 12, spaceBetween: 16 },
        }}
        className="!px-2"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white h-[44px] sm:h-[52px] md:h-[60px] rounded-xl overflow-hidden shadow hover:shadow-md transition flex items-center justify-center p-1">
              <img
                src={src}
                alt={`brand-${i}`}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NavSwiper;