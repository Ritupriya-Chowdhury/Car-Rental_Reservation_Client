import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCars } from "../../redux/slices/carSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
const CarList = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useSelector(
    (state: RootState) => state.cars
  );
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-32">Loading...</div>;
  }

  if (error) {
    navigate("/not-found", { state: { errorMessage: error } });
    return null; // Prevent further rendering
  }

  const categories = Array.from(new Set(cars.map((car) => car.carType)));

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredCars = cars.filter((car) => {
    const isCategoryMatch = selectedCategory
      ? car.carType === selectedCategory
      : true;
    const isPriceMatch =
      (minPrice !== null ? car.pricePerHour >= minPrice : true) &&
      (maxPrice !== null ? car.pricePerHour <= maxPrice : true);
    const isFeaturesMatch =
      selectedFeatures.length > 0
        ? selectedFeatures.every((feature) => car.features.includes(feature))
        : true;
    const isSearchMatch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isCategoryMatch && isPriceMatch && isFeaturesMatch && isSearchMatch;
  });

  return (
    <div
      className={`py-24 md:px-8 px-1 overflow-x-auto ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
    >
      <div className="flex">
        {/* Sidebar for Filters */}
        <div className={`w-1/4 md:w-1/5 p-4 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"} shadow-lg rounded-md`}>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4 text-black"
            />
          </div>

          <div className="mb-4">
            <select
              className="border rounded py-2 w-full text-black"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex mb-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border rounded px-1 md:px-3 py-2 w-1/2 mr-2"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border rounded px-1 md:px-3 py-2 w-1/2"
            />
          </div>

          <p className={`text-2xl font-bold ${theme === "dark" ? "text-yellow-400" : "text-black"}`}>Select Features</p>
          <div className="grid grid-cols-1  lg:grid-cols-2 mb-4">
            {["AC", "Bluetooth", "All-Wheel Drive", "GPS", "Sunroof"].map((feature) => (
              <div key={feature} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => {
                    setSelectedFeatures((prev) =>
                      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
                    );
                  }}
                />
                <label className="ml-2">{feature}</label>
              </div>
            ))}
          </div>

          <div className="flex justify-start mt-4">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 font-bold rounded-lg ${theme === "dark" ? "bg-gray-300 hover:bg-gray-100 text-black" : "bg-gray-600 text-white hover:bg-gray-800"}`}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="w-3/4 md:w-4/5 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car._id} className={`p-4  ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"} shadow-lg rounded-lg`}>
                  <img src={car.image} alt={car.name} className="h-48 w-full object-cover rounded-md" />
                  <h3 className="text-xl font-bold mt-4">{car.name}</h3>
                  <p className="text-gray-200 truncate mt-2">{car.description}</p>
                  <p className="text-lg font-semibold mt-2">${car.pricePerHour} per hour</p>
                  <Link
                    to={`/cars/${car._id}`}
                    className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg border hover:bg-white hover:text-black"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-3xl font-semibold">
                No cars available for the selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;

