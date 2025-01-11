import car from "../../assets/Images/banner-car.png";
import car2 from "../../assets/Images/car.png";
import car3 from "../../assets/Images/car2.png";
import car4 from "../../assets/Images/car1.png";
import car5 from "../../assets/Images/car-1879629_1280-removebg-preview (1).png";
import car6 from "../../assets/Images/istockphoto-1329787536-612x612.jpg";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const HeroSection = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`pt-16 lg:mt-0 mt-16 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <img
            src={theme === "dark" ? car2 : car}
            alt="Car Banner"
            className="md:w-10/12 w-[700px] md:h-full h-[500px] mx-auto"
          />
          <div
            className="absolute inset-0 lg:mt-60 md:mt-32 mt-52 flex justify-center 
            items-center h-56  lg:w-1/2 md:w-[600px] w-[320px]  lg:ml-28 md:ml-4 ml-6 bg-black bg-opacity-50 border-b rounded-lg"
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 px-4">
              <div className="">
                <div>
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Enter Location"
                      className="px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div className="lg:flex">
                    <input type="date" className="px-4 py-2 rounded-lg mr-4 " />
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg md:mt-0 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:mt-0 mt-2 lg:ml-12 ">
                <button
                  className={` font-bold p-3 rounded-lg border-2 border-yellow-500 transition duration-300 ${
                    theme === "dark"
                      ? "bg-white hover:bg-yellow-500  text-black hover:text-white "
                      : "bg-yellow-500 hover:bg-white  text-black"
                  }`}
                >
                  Book Naw
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src={theme === "dark" ? car3 : car4}
            alt="Car Banner"
            className="md:w-7/12 w-[700px] lg:h-full md:h-[500px] h-[450px] mx-auto"
          />
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "lg:mt-60" : "lg:mt-52"
            }  md:mt-52 mt-44  flex justify-center 
        items-center h-56 lg:w-1/2 md:w-[600px]  w-[350px]  lg:ml-28 md:ml-4 ml-4 bg-black bg-opacity-50 border-b rounded-lg`}
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 px-4">
              <div className="">
                <div>
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Enter Location"
                      className="px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div className="lg:flex">
                    <input type="date" className="px-4 py-2 rounded-lg mr-4 " />
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg md:mt-0 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:mt-0 mt-2 lg:ml-12 ">
                <button
                  className={` font-bold p-3 rounded-lg border-2 border-yellow-500 transition duration-300 ${
                    theme === "dark"
                      ? "bg-white hover:bg-yellow-500  text-black hover:text-white "
                      : "bg-yellow-500 hover:bg-white  text-black"
                  }`}
                >
                  Book Naw
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <img
            src={theme === "dark" ? car5 : car6}
            alt="Car Banner"
            className={`${
              theme === "dark" ? " h-[300px] md:mt-0 mt-20" : " h-[500px]"
            }    lg:w-7/12 w-[700px] md:h-full mx-auto  lg:mt-20`}
          />
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "lg:mt-40 lg:ml-40 md:mt-20 mt-[170px]" : "lg:mt-56 md:mt-42 lg:ml-28 mt-[170px]"
            }    flex justify-center 
        items-center h-56 lg:w-1/2 md:w-[600px] w-[330px]   md:ml-4 ml-6 bg-black bg-opacity-50 border-b rounded-lg`}
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 px-4">
              <div className="">
                <div>
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Enter Location"
                      className="px-4 py-2 rounded-lg"
                    />
                  </div>
                  <div className="lg:flex">
                    <input type="date" className="px-4 py-2 rounded-lg mr-4 " />
                    <input
                      type="date"
                      className="px-4 py-2 rounded-lg md:mt-0 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:mt-0 mt-2 lg:ml-12 ">
                <button
                  className={` font-bold p-3 rounded-lg border-2 border-yellow-500 transition duration-300 ${
                    theme === "dark"
                      ? "bg-white hover:bg-yellow-500  text-black hover:text-white "
                      : "bg-yellow-500 hover:bg-white  text-black"
                  }`}
                >
                  Book Naw
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
