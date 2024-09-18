import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hook";

const testimonials = [
  {
    image:
      "https://template.abusayedshuvo.com/roadrunner/img/testimonial-img.png",
    name: "Jessica",
    review:
      "RpCarRes Car Rentals made my trip so easy! The service was fantastic, and the car was in excellent condition.",
    rating: 3,
  },
  {
    image:
      "https://template.abusayedshuvo.com/roadrunner/img/testimonial-img2.png",
    name: "John Doe",
    review:
      "RpCarRes Car Rentals made my trip so easy! The service was fantastic, and the car was in excellent condition.",
    rating: 5,
  },
  {
    image:
      "https://template.abusayedshuvo.com/roadrunner/img/testimonial-img4.png",
    name: "Jane Smith",
    review:
      "Great experience! Wide selection of cars to choose from, and the customer service was available 24/7 for any queries.",
    rating: 4,
  },
  {
    image:
      "https://template.abusayedshuvo.com/roadrunner/img/testimonial-img3.png",
    name: "Sarah Johnson",
    review:
      "Best prices and no hidden fees! I had an amazing experience renting from RpCarRes.",
    rating: 4.5,
  },
];

const Testimonials = () => {
    const theme = useAppSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <div className={`py-16 ${theme==='dark'?'bg-gray-700':'bg-gray-300'}`} >
      <div className="container mx-auto text-center">
        <h2 className={`text-4xl font-bold mb-8 ${theme==='dark'?'text-yellow-500':'text-gray-800'}`}>
          Customer Testimonials
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative ${theme==='dark'?'bg-gray-200':"bg-white"} p-6 shadow-lg rounded-lg`}
              data-aos="fade-up"
            >
             
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={testimonial.image}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  alt={testimonial.name}
                />
              </div>
              <div className="mt-12">
                <h3 className="text-xl font-bold text-yellow-500">
                  {testimonial.name}
                </h3>
                <p className={`${theme==='dark'?'text-black':'text-gray-600'} mt-4 text-center`}>
                  {testimonial.review}
                </p>
                <div className="mt-4 text-yellow-500">
                  {"⭐".repeat(Math.floor(testimonial.rating))}
                  {"☆".repeat(5 - Math.floor(testimonial.rating))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
