import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hook";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681821712294-522293b833d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVzc2ljYSUyMGElMjBjYXIlMjByZXZpZXdlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "Jessica",
    review:
      "RpCarRes Car Rentals made my trip so easy! The service was fantastic, and the car was in excellent condition.",
    rating: 3,
  },
  {
    image:
      "https://media.istockphoto.com/id/525725926/photo/young-adult-modern-dressed-sitting-in-moder-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHR3iuIn1zJi-t8S0gRp0uelCK-ed6WCm-TE3UKnj1Y=",
    name: "John Doe",
    review:
      "RpCarRes Car Rentals made my trip so easy! The service was fantastic, and the car was in excellent condition.",
    rating: 5,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661405462154-ce23978ccf0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    name: "Jane Smith",
    review:
      "Wide selection of cars to choose from, and the customer service was available 24/7 for any queries.",
    rating: 4,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1726826675050-0b9aaba377fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM2fHx8ZW58MHx8fHx8",
    name: "Sarah Johnson",
    review:
      "Best prices and no hidden fees! I had an amazing experience renting from RpCarRes.",
    rating: 4.5,
  },
];

const Testimonials = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`py-16 ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`}
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-3xl font-bold  ${
            theme === "dark" ? "text-yellow-500" : "text-gray-800"
          }`}
        >
          Customer Testimonials
        </h2>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="mt-12 mb-12 h-[400px]">
                <div
                  className={` ${
                    theme === "dark" ? "bg-gray-200" : "bg-white"
                  } p-6 shadow-lg rounded-lg h-96`}
                >
                  <div className="">
                    <img
                      src={testimonial.image}
                      className="w-40 h-40   shadow-lg"
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className="text-xl font-bold text-black mt-8">
                      {testimonial.name}
                    </h3>
                    <p
                      className={`${
                        theme === "dark" ? "text-black" : "text-gray-900"
                      } font-semibold mt-2 text-xl`}
                    >
                      {testimonial.review}
                    </p>
                    <div className="mt-4 text-yellow-500">
                      {"⭐".repeat(Math.floor(testimonial.rating))}
                      {"☆".repeat(5 - Math.floor(testimonial.rating))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
