import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import car from "../../assets/Images/banner-car.png";
import car2 from "../../assets/Images/car.png";

const HeroSection = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className= {`pt-16 lg:mt-0 mt-16 ${theme === "dark"?"bg-black":"bg-white"}`}>
      {" "}
      {/* Added padding-top to account for the fixed navbar */}
      <img
        src={theme === "dark" ? car2 : car}
        alt="Car Banner"
        className="w-10/12 h-full mx-auto"
      />
      <div
        className="absolute inset-0 lg:mt-72 md:mt-56 mt-40 flex justify-center 
            items-center h-56 w-1/2 lg:ml-32 ml-4 bg-black bg-opacity-50 border-b rounded-lg"
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
                <input type="date" className="px-4 py-2 rounded-lg md:mt-0 mt-2" />
              </div>
            </div>
          </div>
          <div className="lg:mt-0 mt-2 lg:ml-12 ">
            <button
              className={` font-bold p-3 rounded-lg border-2 border-yellow-500 transition duration-300 ${
                theme === "dark" ? "bg-white hover:bg-yellow-500  text-black hover:text-white " : "bg-yellow-500 hover:bg-white  text-black"
              }`}
            >
              Book Naw
            </button>
          </div>
        </div>
        {/* Added styling to the text */}
      </div>
    </div>
  );
};

export default HeroSection;
