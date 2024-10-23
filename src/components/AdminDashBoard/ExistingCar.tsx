
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCars, deleteCarListing } from "../../redux/slices/carSlice";
import { CarState } from "../../redux/types/Cars";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { MdDelete } from "react-icons/md";
import { Link} from "react-router-dom"; // Import useNavigate for navigation

const ExistingCarsPage = () => {
  const dispatch = useAppDispatch();
 
  const { cars, loading, error } = useSelector((state: { cars: CarState }) => state.cars);
  console.log(cars)
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const filteredCars = cars
    .filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.pricePerHour - b.pricePerHour;
      return 0;
    });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      dispatch(deleteCarListing(id));
    }
  };

 

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="mx-auto p-6 md:pl-48 py-8">
        <h1 className={`text-3xl font-bold mb-6 text-gray-800 ${theme === 'dark' ? 'text-yellow-400' : 'text-black'}`}>Existing Cars</h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded-md mr-4 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {loading && <p className="text-blue-500">Loading cars...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="bg-white shadow-md rounded-lg md:px-12 md:py-8">
          {filteredCars.map((car) => (
            <li key={car._id} className="flex justify-between items-center border-b p-4 last:border-b-0 hover:bg-gray-100 transition duration-200">
              <span className="text-gray-800 font-semibold">
                {car.name} - <span className="text-blue-600">${car.pricePerHour} per hour</span>
              </span>
              <div>
                <Link
                 to={`update-car/${car._id}`}
                  className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-200 mr-4"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExistingCarsPage;
