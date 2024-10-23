import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCarDetails } from "../../redux/slices/carSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Swal from "sweetalert2";

const CarDetails = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { carDetails, loading, error } = useSelector(
    (state: RootState) => state.cars
  );
  const navigate = useNavigate();

  const handleBookNow=()=>{

    if(!user){
      Swal.fire({
        icon: "error",
        title: "Login First!",
        
      });
      

    }
    else{
      navigate("/booking/booking-form", { state: { carId: id } });
    }
  }
  
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
 

  useEffect(() => {
    if (id) {
      dispatch(fetchCarDetails(id));
    }
  }, [id, dispatch]);

  if (error) {
    navigate("/not-found", { state: { errorMessage: error } });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carDetails) {
    return <div>No car details available.</div>;
  }

  const handleExtraSelect = (extra: string) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter((item) => item !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-400" : "bg-gray-200"}`}>
      <div className=" mx-auto pt-32 pb-32 px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <div className="w-full lg:w-11/12 my-8">
              {zoomImage ? (
                <div className="relative">
                  <img
                    src={zoomImage}
                    alt={carDetails.name}
                    className="w-full h-auto object-cover"
                  />
                  <button
                    onClick={() => setZoomImage(null)}
                    className="absolute top-0 right-0 p-2 bg-yellow-400 text-black font-bold rounded-lg"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <img
                  src={carDetails.image}
                  alt={carDetails.name}
                  className="cursor-pointer h-80 w-11/12 object-cover"
                  onClick={() => setZoomImage(carDetails.image)}
                />
              )}
            </div>
            <div className="mt-4 lg:block hidden">
              <h3 className="text-xl font-bold">Customer Reviews:</h3>
              <ul className="list-disc ml-6 mt-2">
                {carDetails.customerReviews.map((CR, idx) => (
                  <li key={idx} className="text-gray-700 text-lg">
                    {CR}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-bold">{carDetails.name}</h2>
            <p className="text-xl mt-2">{carDetails.description}</p>
            <p className="text-2xl font-bold mt-4">
              ${carDetails.pricePerHour} per hour
            </p>
            <p className="mt-2">
              <strong>Type:</strong> {carDetails.carType}
            </p>
            <p className="mt-2">
              <strong>Available:</strong>{" "}
              {carDetails.status === "available" ? "Yes" : "No"}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-bold">Features:</h3>
              <ul className="list-disc ml-6 mt-2">
                {carDetails.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Additional Options:</h3>
              <div className="flex flex-col gap-2 mt-2">
                {["Insurance", "GPS", "Child Seat"].map((extra) => (
                  <label key={extra} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedExtras.includes(extra)}
                      onChange={() => handleExtraSelect(extra)}
                    />
                    {extra}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-4 lg:hidden ">
              <h3 className="text-xl font-bold">Customer Reviews:</h3>
              <ul className="list-disc ml-6 mt-2">
                {carDetails.customerReviews.map((CR, idx) => (
                  <li key={idx} className="text-gray-700 text-lg">
                    {CR}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button onClick={()=>handleBookNow()} className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
