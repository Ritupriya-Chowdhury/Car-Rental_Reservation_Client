import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCars } from '../../redux/slices/carSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { Link, useNavigate } from 'react-router-dom';

const CarList = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useSelector((state: RootState) => state.cars);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    navigate("/not-found", { state: { errorMessage: error } });
  }

  const categories = ["SUV", "Sedan", "Hybrid", "PickUp Truck", "Coupe", "Convertible"];
  const featuresList = ["AC", "Bluetooth", "All-Wheel Drive", "GPS", "Sunroof"];

  const filteredCars = cars.filter(car => {
    const isCategoryMatch = selectedCategory ? car.carType === selectedCategory : true;
    const isPriceMatch = (minPrice !== null ? car.pricePerHour >= minPrice : true) &&
                         (maxPrice !== null ? car.pricePerHour <= maxPrice : true);
    const isFeaturesMatch = selectedFeatures.length > 0 
      ? selectedFeatures.some(feature => car.features.includes(feature)) 
      : true;

    return isCategoryMatch && isPriceMatch && isFeaturesMatch;
  });

  return (
    <div className={`pt-32 pb-12 md:px-8 px-1 ${theme === 'dark' ? 'bg-gray-300' : 'bg-white'} flex`}>
      <div className="lg:text-2xl text-xl font-bold lg:px-8 md:px-4 px-1 py-8 space-y-4 lg:w-1/3 md:w-5/12 w-4/12">
      
        {categories.map(category => (
          <p
            key={category}
            className={`cursor-pointer ${selectedCategory === category ? 'text-yellow-600 lg:text-4xl text-2xl' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </p>
        ))}
        <p
          className={`cursor-pointer ${!selectedCategory ? 'text-yellow-600 lg:text-4xl text-2xl' : ''}`}
          onClick={() => setSelectedCategory(null)}  
        >
          All Cars
        </p>

        <h2 className="text-2xl font-semibold">Price Range</h2>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border rounded px-1 py-1 w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border rounded px-1 py-1  w-28"
        />

        <h2 className="text-2xl font-semibold">Features</h2>
        {featuresList.map(feature => (
          <div key={feature} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => {
                if (selectedFeatures.includes(feature)) {
                  setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                } else {
                  setSelectedFeatures([...selectedFeatures, feature]);
                }
              }}
            />
            <label className="ml-2">{feature}</label>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car._id} className="p-4 bg-white md:h-[430px] h-[350px] hover:shadow-lg transition-shadow">
              <img src={car.image} alt={car.name} className="md:h-48 h-32 w-full object-cover font-bold py-2" />
              <h3 className="text-xl font-bold">{car.name}</h3>
              <p className="truncate">{car.description}</p>
              <p className="font-bold mt-2">${car.pricePerHour} per hour</p>
              <div className="pb-4 pt-8">
                <Link to={`/cars/${car._id}`} className="border-2 border-yellow-400 rounded-lg bg-yellow-400 hover:bg-white text-black font-bold px-4 py-2">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-3xl font-semibold">
            No cars available for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
