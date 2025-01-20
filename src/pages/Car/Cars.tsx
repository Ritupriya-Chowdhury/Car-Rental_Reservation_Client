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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const carsPerPage = 6; // Number of cars per page

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

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedFeatures([]);
    setSearchTerm("");
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(
    startIndex,
    startIndex + carsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={`pt-32 pb-12 md:px-8 px-1 overflow-x-auto ${
        theme === "dark" ? "bg-gray-600" : "bg-white"
      }`}
    >
      <div>
        <div
          className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 items-center md:items-start
       mb-2 px-2"
        >
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
            />
          </div>
          {/* Category */}
          <div className="mb-4 ml-2">
            <select
              className="border rounded py-2 w-full"
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

          {/* Price Range */}
          <div className="flex">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border rounded px-1 md:px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border rounded px-1 md:px-3 py-2 ml-1 md:ml-2"
            />
          </div>
        </div>

        {/* Features */}
        <div className={`px-2`}>
          <p
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-yellow-400" : "text-black"
            }`}
          >
            Select Features
          </p>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {["AC", "Bluetooth", "All-Wheel Drive", "GPS", "Sunroof"].map(
              (feature) => (
                <div key={feature} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => {
                      setSelectedFeatures((prev) =>
                        prev.includes(feature)
                          ? prev.filter((f) => f !== feature)
                          : [...prev, feature]
                      );
                    }}
                  />
                  <label className="ml-2">{feature}</label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-start mt-4 px-2">
          <button
            onClick={clearFilters}
            className={`px-4 py-2  font-bold rounded-lg  
            ${
              theme === "dark"
                ? "bg-gray-300 hover:bg-gray-100 text-black"
                : "bg-gray-600 text-white hover:bg-gray-800"
            }`}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Cars List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {paginatedCars.length > 0 ? (
          paginatedCars.map((car) => (
            <div
              key={car._id}
              className="p-4 bg-white shadow-lg transition-shadow border border-black rounded-lg"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-48 w-full object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-4">{car.name}</h3>
              <p className="text-gray-600 truncate mt-2">{car.description}</p>
              <p className="text-lg font-semibold mt-2">
                ${car.pricePerHour} per hour
              </p>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-bold rounded-lg ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : theme === "dark"
              ? "bg-yellow-400 text-black"
              : "bg-gray-600 text-white hover:bg-gray-800"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 mr-1 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 hover:bg-gray-400"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 ml-1 py-2 font-bold rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : theme === "dark"
              ? "bg-yellow-400 text-black"
              : "bg-gray-600 text-white hover:bg-gray-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarList;
