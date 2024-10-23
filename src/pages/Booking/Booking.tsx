import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchFilteredCars,
  updateCriteria,
} from "../../redux/slices/bookingSlice";
import { fetchCars } from "../../redux/slices/carSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  const userRole = user?.role;

  // Access data from both cars and booking slices
  const {
    cars: allCars,
    loading: carsLoading,
    error: carsError,
  } = useSelector((state: RootState) => state.cars);
  const {
    cars: filteredCars,
    loading: bookingLoading,
    error: bookingError,
  } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    // Fetch all cars on initial load
    dispatch(fetchCars());
  }, [dispatch]);

  // Handle search form submission
  const onSubmit = (data: any) => {
    dispatch(updateCriteria(data));
    dispatch(fetchFilteredCars(data));
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
      <div className="md:pl-48 md:pr-8 px-4 md:py-8 py-4">
        <h1
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-yellow-400" : "text-black"
          }`}
        >
          Find Your Car
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white shadow-md rounded-lg p-2"
        >
          {/* Car Type */}
          <div>
            <label
              htmlFor="carType"
              className="block text-sm font-medium text-gray-700"
            >
              Car Type
            </label>
            <select
              {...register("carType")}
              className="mt-1 block w-full p-2 border"
            >
              <option value="">Any</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hybrid">Hybrid</option>
              <option value="PickUp Truck">PickUp Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <div className="space-y-2">
              <label>
                <input
                  type="checkbox"
                  value="AC"
                  {...register("features")}
                  className="mr-2"
                />
                AC
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Bluetooth"
                  {...register("features")}
                  className="mr-2"
                />
                Bluetooth
              </label>
              <label>
                <input
                  type="checkbox"
                  value="All-Wheel Drive"
                  {...register("features")}
                  className="mr-2"
                />
                All-Wheel Drive
              </label>
              <label>
                <input
                  type="checkbox"
                  value="GPS"
                  {...register("features")}
                  className="mr-2"
                />
                GPS
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Sunroof"
                  {...register("features")}
                  className="mr-2"
                />
                Sunroof
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 font-bold text-black p-2 rounded-lg w-full"
          >
            Search Cars
          </button>
        </form>

        {/* Loading Indicators */}
        {carsLoading && <p>Loading all cars...</p>}
        {bookingLoading && <p>Loading search results...</p>}

        {/* Error Handling */}
        {carsError && <p className="text-red-500">Error: {carsError}</p>}
        {bookingError && <p className="text-red-500">Error: {bookingError}</p>}

        {/* Display Filtered Cars */}
        {filteredCars.length > 0 && (
          <div className="mt-8">
            <h2
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-yellow-400" : "text-black"
              }`}
            >
              Available Cars
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car: any) => (
                <li key={car._id} className="border p-4 rounded-lg bg-white">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-40 w-full object-cover mb-2 rounded-md"
                  />
                  <h3 className="text-lg font-bold">{car.name}</h3>
                  <p>{car.description}</p>
                  <p className="font-semibold">{car.pricePerHour} per hour</p>
                  <div className="flex">
                    <div className="py-4">
                      <Link
                        to={`/cars/${car._id}`}
                        className="mt-2 bg-yellow-400 hover:bg-yellow-500 
                  text-black font-bold p-2 rounded-lg"
                      >
                        Book Now
                      </Link>
                    </div>
                    <div className="py-4">
                      <Link
                        to={`/car/${car._id}/customer-review`}
                        className="mt-2 bg-yellow-400 hover:bg-yellow-500 
                  text-black font-bold p-2 rounded-lg"
                      >
                        Add Review
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display All Cars if No Search Criteria */}
        {!filteredCars.length && allCars.length > 0 && (
          <div className="mt-8">
            <h2
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-yellow-400" : "text-black"
              }`}
            >
              Available Cars
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allCars.map((car: any) => (
                <li key={car._id} className="border p-4 rounded-lg bg-white">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-40 w-full object-cover mb-2 rounded-md"
                  />
                  <h3 className="text-lg font-bold">{car.name}</h3>
                  <p>{car.description}</p>
                  <p className="font-semibold">{car.pricePerHour} per hour</p>
                  <div className="flex">
                    <div className="py-4">
                      <Link
                        to={`/cars/${car._id}`}
                        className="mt-2 bg-yellow-400 hover:bg-yellow-500 
                  text-black font-bold p-2 rounded-lg"
                      >
                        Book Now
                      </Link>
                    </div>
                    {userRole === "user" ? (
                      <div className="py-4 ml-2">
                        <Link
                          to={`/user/car/${car._id}/customer-review`}
                          className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-2 rounded-lg"
                        >
                          Add Review
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
