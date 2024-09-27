

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 pb-8 pt-32">
      {/* Header */}
      <header className="text-center py-8 bg-gray-100">
        <h1 className="text-4xl font-bold">About RoadRunner Car Rentals</h1>
        <p className="mt-2 text-lg text-gray-600">
          Your trusted partner for car rentals.
        </p>
      </header>

      {/* Company History */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold">Our History</h2>
        <p className="mt-4 text-gray-700">
          Founded in 2010, RoadRunner Car Rentals started with the mission of
          providing affordable, reliable, and environmentally conscious car rental services. Over the past decade, we’ve expanded our fleet and service areas while maintaining our commitment to customer satisfaction.
        </p>
      </section>

      {/* Our Team */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold">Meet Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Team member card */}
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white shadow-md p-6 text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4"
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
      <section className="py-12">
        <h2 className="text-3xl font-semibold">Our Fleet</h2>
        <p className="mt-4 text-gray-700">
          We offer a variety of vehicles to suit every need, from economical cars for city driving to luxury SUVs for road trips and business travel.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((car) => (
            <div key={car.type} className="bg-white shadow-md p-6 text-center">
              <img
                className="w-32 h-32 mx-auto mb-4"
                src={car.image}
                alt={car.type}
              />
              <h3 className="text-xl font-bold">{car.type}</h3>
              <p className="text-gray-600">{car.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values & Commitment */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold">Our Values & Commitment</h2>
        <p className="mt-4 text-gray-700">
          We are committed to providing exceptional customer service while also being environmentally responsible. We strive to make each rental experience smooth and memorable.
        </p>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <p className="mt-4 text-gray-700">
          If you have any questions or need assistance, feel free to reach out to us:
        </p>
        <ul className="mt-4 text-gray-700">
          <li>Phone: (123) 456-7890</li>
          <li>Email: info@roadrunnercarrentals.com</li>
          <li>Address: 1234 Car Rental Ave, City, State, ZIP</li>
        </ul>
      </section>
    </div>
  );
};

// Example team member data
const teamMembers = [
  { name: 'John Doe', role: 'CEO', photo: '/images/john.jpg' },
  { name: 'Jane Smith', role: 'COO', photo: '/images/jane.jpg' },
  { name: 'Mark Thompson', role: 'Fleet Manager', photo: '/images/mark.jpg' },
];

// Example fleet data
const fleet = [
  { type: 'Economy', image: '/images/economy.jpg', description: 'Affordable and fuel-efficient.' },
  { type: 'Luxury', image: '/images/luxury.jpg', description: 'Top-tier luxury vehicles for a premium experience.' },
  { type: 'SUV', image: '/images/suv.jpg', description: 'Spacious and versatile SUVs for all terrains.' },
];

export default AboutUs;
