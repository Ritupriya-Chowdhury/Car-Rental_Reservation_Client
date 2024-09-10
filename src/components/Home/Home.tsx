import FeaturedCars from "../../pages/Home/FeaturedCars";
import HeroSection from "../../pages/Home/HeroSection";
import Testimonials from "../../pages/Home/Testomonial";
import WhyChooseUs from "../../pages/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <FeaturedCars />
      <WhyChooseUs/>
      <Testimonials/>
   
    </div>
  );
};

export default Home;
