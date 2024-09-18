import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import { AppDispatch, RootState } from '../../redux/store';
import { fetchFeaturedCars } from '../../redux/slices/featuredCarsSlice';



const FeaturedCars = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch: AppDispatch= useDispatch();
  const { cars, loading, error } = useSelector((state: RootState) => 
    state.featuredCars);
  console.log(cars)

  useEffect(() => {
    dispatch(fetchFeaturedCars());
  }, [dispatch]);

  return (
    <div className={`${theme==='dark'?"bg-gray-700":"bg-gray-300"} py-12`}>
      <p className={`text-center text-4xl font-bold mb-4 ${theme==='dark'?'text-yellow-500':'text-gray-900'}`}>Select Yours Cars</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Swiper
          
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
           
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {cars.map((car) => (
            <SwiperSlide key={car._id}>
              <div className={`border-2 lg:mx-0 mx-3 ${theme==='dark'?'border-yellow-500': 'border-black'} rounded-lg`} >
                <img src={car.image} alt={car.name} className=" w-11/12 h-72 mx-auto my-4 border rounded-lg " />
                <div className='mx-8 mb-4'>
                <h3 className={`text-xl font-semibold ${theme==='dark'?"text-white":"text-black"}`}>{car.name}</h3>
                <p className={`${theme==='dark'?'text-white':'text-black'}`}>{car.description}</p>
                <p className={`font-bold ${theme==='dark'?'text-yellow-500':"text-black"}`}>{car.price}/Day</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedCars;
