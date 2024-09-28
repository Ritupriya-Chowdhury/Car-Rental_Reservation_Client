import img from "../../assets/About/istockphoto-1307086567-612x612.webp";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import ritu from "../../assets/About/428682758_1188774892527940_1130028487454134231_n-removebg-preview.png";
import raj from "../../assets/About/399078044_352224463981852_3738276332233915676_n-removebg-preview.png";
import amit from "../../assets/About/449789155_392187230503807_2253069901901366205_n-removebg-preview.png";

const teamMembers = [
  { name: "Rituraj Chowdhury", role: "CEO", photo: raj },
  { name: "Ritupriya Chowdhury", role: "COO", photo: ritu },
  { name: "Amit Chowdhury", role: "Fleet Manager", photo: amit },
];

const fleet = [
  {
    type: "PickUp Truck",
    image:
      "https://media.istockphoto.com/id/96336313/photo/vintage-cup.webp?a=1&b=1&s=612x612&w=0&k=20&c=PPk5ASOGGBrdlPdTo66Rqw7QqvztIeKQvKzBlirHNe8=",
    description:
      "A powerful and durable pick-up truck built for heavy-duty tasks and off-road adventures.",
  },
  {
    type: "Sedan",
    image:
      "https://images.unsplash.com/photo-1627028169761-8b4126d8acaf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VkYW4lMjBibHVlJTIwY2FyfGVufDB8fDB8fHww",
    description:
      "A high-performance luxury sedan with exceptional handling and premium features.",
  },
  {
    type: "SUV",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG95b3RhJTIwUkFWNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Spacious and versatile SUVs for all terrains.",
  },
];
const AboutUs = () => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`bg-gray-100 pt-28 pb-8  ${
        theme === "dark" ? "bg-gray-300" : "bg-gray-100"
      }`}
    >
      <header
        className="text-center  bg-cover bg-center bg-fixed min-h-[50vh] flex flex-col justify-center"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 lg:py-36 md:py-64 py-36 px-4 min-h-[50vh]">
          <h1 className="text-4xl font-bold text-yellow-400 ">
            About RPCarRes Car Rentals
          </h1>
          <p className="mt-2 text-2xl font-semibold text-gray-200">
            Your trusted partner for car rentals.
          </p>
        </div>
      </header>

      <div className="">
        <section
          className={`py-20 md:px-20 px-8 ${
            theme === "dark" ? "" : "text-black"
          }`}
        >
          <h2
            className={`text-3xl font-semibold ${
              theme === "dark" ? "text-black" : "text-black"
            }`}
          >
            Our History
          </h2>
          <p className="mt-8  text-xl">
            Founded in 2020, RPCarRes Car Rentals started with the mission of
            providing affordable, reliable, and environmentally conscious car
            rental services. Over the past decade, we’ve expanded our fleet and
            service areas while maintaining our commitment to customer
            satisfaction.
          </p>
        </section>

        {/* Our Team */}
        <section
          className={`py-12 md:px-20 px-8 ${
            theme === "dark" ? "bg-gray-200" : "bg-gray-100"
          } `}
        >
          <h2 className={`text-3xl font-semibold `}>Meet Our Team</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white shadow-md p-6 text-center rounded-lg"
              >
                <img
                  className="w-32 h-32 bg-gray-200 mx-auto mb-4"
                  src={member.photo}
                  alt={member.name}
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Fleet */}
        <section className="py-12 md:px-20 px-8">
          <h2 className="text-3xl font-semibold">Our Fleet</h2>
          <p className="mt-4 text-xl text-black">
            We offer a variety of vehicles to suit every need, from economical
            cars for city driving to luxury SUVs for road trips and business
            travel.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((car) => (
              <div
                key={car.type}
                className="relative shadow-lg overflow-hidden group"
              >
                <img
                  src={car.image}
                  alt={`Image of ${car.type}`}
                  className="w-full h-72 object-cover"
                />
                <div
                  className="absolute inset-0 pt-32
             bg-black bg-opacity-50 "
                >
                  <div className="p-4 text-xl text-gray-100 mt-4 mx-2">
                    <h3 className="font-bold ">{car.type}</h3>
                    <p className="font-bold">{car.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values & Commitment */}
        <section className="py-12 md:px-20 px-8 bg-gray-50">
          <h2 className="text-3xl font-semibold">Our Values & Commitment</h2>
          <p className="mt-4 text-gray-700 text-2xl">
            We are committed to providing exceptional customer service while
            also being environmentally responsible. We strive to make each
            rental experience smooth and memorable.
          </p>
        </section>

        {/* Contact Information */}
        <section className="py-12 md:px-20 px-8">
          <h2 className="text-3xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-gray-700 text-xl font-semibold">
            If you have any questions or need assistance, feel free to reach out
            to us:
          </p>
          <ul className="mt-2 text-gray-700 text-xl font-semibold">
            <li>Phone: (123) 456-7890</li>
            <li>Email: rpcarres2gmail.com</li>
            <li>Address: Boalkhali, Chattogram</li>
          </ul>
          <div>
            <p className="text-3xl font-semibold mt-4">Our Location</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70198.17174078141!2d91.87042707846486!3d22.378652066840548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad25d1b4ee63ed%3A0x57feb012672900bd!2sBoalkhali!5e0!3m2!1sen!2sbd!4v1727488235053!5m2!1sen!2sbd"
              loading="lazy"
              className="w-full h-72 mt-2 "
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
