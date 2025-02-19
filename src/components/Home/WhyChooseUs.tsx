import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import logo from "../../assets/Images/CarRentalLogo.png";
import logo2 from "../../assets/Images/CarRentalLogo2.png";
import rentPic from "../../assets/Images/stylish-elegant-woman-car-salon.jpg";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { TiTickOutline } from "react-icons/ti";

const WhyChooseUs = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div
      className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 md:mx-20">
        <div className="lg:px-0 px-8 ">
          <img data-aos="fade-right" 
            src={`${theme === "dark" ? logo : logo2}`}
            className="w-44"
            alt=""
          />
          <p data-aos="fade-right"
            className={`mt-4  font-bold text-4xl ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Welcome to RPCarRes
            <br />
            Your Trusted Car Rental Partner
          </p>
          <p data-aos="fade-right"
            className={`font-semibold mt-4 text-lg  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            We offer competitive and transparent pricing with no hidden fees,
            ensuring you get the best value for your money. Choose from a wide
            range of vehicles, from economy cars to luxury models, perfect for
            every trip and budget. Our dedicated support team is available 24/7
            to assist with bookings, inquiries, or any roadside assistance you
            may need.
          </p>
          <div
            className={` mt-4 font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <div className={`flex `} data-aos="fade-right">
              <p
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-yellow-500"
                } p-1  rounded-full mr-2 text-2xl `}
              >
                <TiTickOutline />
              </p>
              <p className="mt-1">Best Prices Guaranteed</p>
            </div>
            <div className={`flex mt-1 `} data-aos="fade-right">
              <p
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-yellow-500"
                } p-1  rounded-full mr-2 text-2xl `}
              >
                <TiTickOutline />
              </p>
              <p className="mt-1"> Wide Selection of Vehicles</p>
            </div>
            <div className={`flex mt-1`} data-aos="fade-right">
              <p
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-yellow-500"
                } p-1  rounded-full mr-2 text-2xl `}
              >
                <TiTickOutline />
              </p>
              <p className="mt-1">24/7 Customer Support</p>
            </div>
          </div>
         
        </div>
        <div className="lg:ml-12  mt-4 lg:pt-24 px-2" data-aos="fade-left" >
          <img src={rentPic} alt="" className="border rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
