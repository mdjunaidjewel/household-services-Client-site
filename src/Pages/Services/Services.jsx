import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className=" py-10 max-w-7xl mx-auto">
      {/* Headline */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">
        <span className="text-gray-800">Available</span>{" "}
        <span className=" text-yellow-600">
          Services
        </span>
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className=" rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-[#f5f5f5]"
          >
            {/* Service Image */}
            <img
              className="w-full h-60 object-cover"
              src={service.image}
              alt={service.service_name}
            />

            {/* Service Info */}
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2 text-gray-600">
                  {service.service_name}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {service.description}
                </p>
              </div>

              {/* Explore Button */}
              <button className="mt-auto w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors duration-300 cursor-pointer">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
