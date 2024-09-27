import { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCars } from '../../redux/slices/carSlice';
import { useAppDispatch } from '../../redux/hook';
import ApiError from '../Error/ApiError';



const CarList = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useSelector((state: RootState) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <ApiError errorMessage={error} />;
  }

  return (
    <div >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-32 mb-12 mx-8">
      {cars.map(car => (
        <div key={car._id} className="border rounded p-4">
          <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
          <h3 className="text-xl">{car.name}</h3>
          <p>{car.description}</p>
          <p className="font-bold">${car.pricePerHour} per hour</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CarList;
