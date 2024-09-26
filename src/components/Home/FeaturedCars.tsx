import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

const featuredCars = [
  {
    _id: "66f4e5ee025232d33509ff48",
    name: "Toyota RAV4",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG95b3RhJTIwUkFWNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "A reliable and spacious SUV with modern features.",
    pricePerHour: 400,
  },
  {
    _id: "66f4ef9669ffa230b51a5953",
    name: "BMW 3 Series",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlC9R9tK_TJCRfCoCB6FlX0TQ7yJRJ2GRdw&s",
    description:
      "A high-performance luxury sedan with exceptional handling and premium features.",
    pricePerHour: 600,
  },
  {
    _id: "66f5056a6d1ea04d29bf6275",
    name: "Audi A4",
    image:
      "https://images.unsplash.com/photo-1716167949676-2ad6f7c8365c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEF1ZGklMjBBNHxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "A stylish and dynamic sedan with advanced technology and a smooth driving experience.",
    pricePerHour: 520,
  },

  {
    _id: "66f508533402d7ce5691f758",
    name: "Ford F-150",
    image:
      "https://media.istockphoto.com/id/96336313/photo/vintage-cup.webp?a=1&b=1&s=612x612&w=0&k=20&c=PPk5ASOGGBrdlPdTo66Rqw7QqvztIeKQvKzBlirHNe8=",
    description:
      "A powerful and durable pick-up truck built for heavy-duty tasks and off-road adventures.",
    pricePerHour: 480,
  },
  {
    _id: "66f509013402d7ce5691f75b",
    name: "Chevrolet Silverado",
    image:
      "https://media.istockphoto.com/id/596781634/photo/red-pickup-truck-isolated-on-white-3d.jpg?s=612x612&w=0&k=20&c=vYNmoDDcK-tQ9VBydt3KSSQE1gzu3RzJC8spmUa9MIU=",
    description:
      "A rugged and reliable pick-up truck designed for both work and play with impressive towing capacity.",
    pricePerHour: 500,
  },
  {
    _id: "66f509c13402d7ce5691f75e",
    name: "Audi A5 Cabriolet",
    image:
      "data:image/jpeg;base64,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",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8">
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
                  <button
                    className={` p-3 rounded-lg font-bold text-lg hover:text-xl mt-2 
                    transition duration-300 bg-white border-2 hover:border-black`}
                  >
                    Book Now
                  </button>
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
