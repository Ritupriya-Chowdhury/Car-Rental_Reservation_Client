import  { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store';

const DashboardOverView = () => {
  const [bookings, setBookings] = useState(0);
  const [availableCars, setAvailableCars] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    // Example API calls
    // Replace with your API integration
    setBookings(152);
    setAvailableCars(45);
    setRevenue(12340);
  }, []);

  return (
    <div className=''>
        <div className={`${theme==='dark'?'text-yellow-400':'text-black'}`}>
    <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
    </div>
    <div className=" bg-gray-100">
       
      <div className="">

        
        <main className="flex-1 p-6">
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Total Bookings</h2>
              <p className="mt-2 text-3xl font-bold">{bookings}</p>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Available Cars</h2>
              <p className="mt-2 text-3xl font-bold">{availableCars}</p>
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Total Revenue</h2>
              <p className="mt-2 text-3xl font-bold">${revenue}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default DashboardOverView;
