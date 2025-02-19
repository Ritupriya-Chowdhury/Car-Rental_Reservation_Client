import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import imgDark from "../../assets/Images/car.png";
import imgLight from "../../assets/Images/banner-car.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`hero h-[82vh] min-w-screen mt-16 
      ${theme === "dark" ? "bg-black text-white" : "bg-white text-white"}
      `}
      style={{
        backgroundImage: `url(${theme === "dark" ? imgDark : imgLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔹 Background Overlay for better text visibility */}
      <div className="hero-overlay bg-black bg-opacity-70"></div>

      {/* 🔹 Content (Title & Subtitle) */}
      <div className="hero-content text-center px-6 md:px-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Ride!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Affordable, reliable, and hassle-free car rentals. Choose from a wide range of vehicles and start your journey today!
          </p>
          <Link to="/cars">
            <button className="mt-6 px-6 py-3 bg-yellow-400 font-bold text-black rounded-lg text-lg hover:border border-black transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
