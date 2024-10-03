import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const featuredCars = [
  {
    _id: "66f83dc2f2e855e2fdb1d1a8",
    name: "Toyota RAV4",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG95b3RhJTIwUkFWNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "A reliable and spacious SUV with modern features.",
    pricePerHour: 400,
  },
  {
    _id: "66f83ffaed62fdc4c003c3c2",
    name: "BMW 3 Series",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlC9R9tK_TJCRfCoCB6FlX0TQ7yJRJ2GRdw&s",
    description:
      "A high-performance luxury sedan with exceptional handling and premium features.",
    pricePerHour: 600,
  },
  {
    _id: "66f8453ff7a1fe9bfc40b4f5",
    name: "Audi A4",
    image:
      "https://images.unsplash.com/photo-1716167949676-2ad6f7c8365c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEF1ZGklMjBBNHxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "A stylish and dynamic sedan with advanced technology and a smooth driving experience.",
    pricePerHour: 520,
  },

  {
    _id: "66f846c3accca27d4fe3b809",
    name: "Ford F-150",
    image:
      "https://media.istockphoto.com/id/96336313/photo/vintage-cup.webp?a=1&b=1&s=612x612&w=0&k=20&c=PPk5ASOGGBrdlPdTo66Rqw7QqvztIeKQvKzBlirHNe8=",
    description:
      "A powerful and durable pick-up truck built for heavy-duty tasks and off-road adventures.",
    pricePerHour: 480,
  },
  {
    _id: "66f84766ea600c5587061f19",
    name: "Chevrolet Silverado",
    image:
      "https://media.istockphoto.com/id/596781634/photo/red-pickup-truck-isolated-on-white-3d.jpg?s=612x612&w=0&k=20&c=vYNmoDDcK-tQ9VBydt3KSSQE1gzu3RzJC8spmUa9MIU=",
    description:
      "A rugged and reliable pick-up truck designed for both work and play with impressive towing capacity.",
    pricePerHour: 500,
  },
  {
    _id: "66f84bdf09e3fb7ec7ed6c18",
    name: "Audi A5 Cabriolet",
    image:
      "https://images.pexels.com/photos/17051578/pexels-photo-17051578/free-photo-of-silver-volkswagen-golf-cabriolet.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "A luxurious cabriolet offering a thrilling open-top driving experience with top-tier technology and comfort.",
    pricePerHour: 600,
  },
];

const FeaturedCars = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-600" : "bg-gray-300"} py-12`}
    >
      <h2
        className={`text-3xl font-bold text-center mb-5 ${
          theme === "dark" ? "text-yellow-500 " : "text-black"
        }`}
      >
       Select Your Cars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 ">
        {featuredCars.length > 0 ? (
          featuredCars.map((car) => (
            <div
              key={car._id}
              className="relative shadow-lg overflow-hidden group"
            >
              <img
                src={car.image}
                alt={`Image of ${car.name}`}
                className="w-full h-72 object-cover"
              />
              <div
                className="absolute inset-0 
              bg-black bg-opacity-50 opacity-0 hover:bg-yellow-500
              group-hover:opacity-75 transition-opacity duration-1000"
              >
                <div className="p-4 text-xl text-black mt-8 mx-4">
                  <h3 className="font-bold ">{car.name}</h3>
                  <p className="font-bold">{car.description}</p>
                  <p className="font-bold mt-2">${car.pricePerHour}/hour</p>
                  <p className="pt-4">
                  <Link to={`/cars/${car._id}`}
                    className={` p-3 rounded-lg font-bold text-lg hover:text-xl mt-2 
                    transition duration-300 bg-white border-2 hover:border-black`}
                  >
                    Book Now
                  </Link>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No featured cars available.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCars;
