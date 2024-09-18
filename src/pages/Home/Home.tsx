import FeaturedCars from "../../components/Home/FeaturedCars";
import HeroSection from "../../components/Home/HeroSection";
import Testimonials from "../../components/Home/Testomonial";
import WhyChooseUs from "../../components/Home/WhyChooseUs";


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
