import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top rated 6 services
    fetch("http://localhost:3000/services/top")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setServices([]);
      })
      .finally(() => setLoading(false));

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [services]);

  const handleViewDetails = (id) => {
    if (!user) {
      Swal.fire({
        title: "Login Required!",
        text: "Please login or create an account to view details.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
      return;
    }
    navigate(`/service-details/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Loading services...
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        No services found.
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        className="text-3xl md:text-5xl font-bold text-center mb-16"
        data-aos="fade-down"
      >
        <span className="text-gray-800">Popular</span>{" "}
        <span className="text-yellow-600">Services</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={service._id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-[#f5f5f5]"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-offset="120"
            data-aos-anchor-placement="top-bottom"
          >
            <img
              className="w-full h-40 md:h-48 object-cover"
              src={service.image}
              alt={service.service_name}
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-1 text-gray-600">
                  {service.service_name}
                </h2>

                {/* Provider Name */}
                <p className="text-gray-500 text-md font-extrabold mb-2">
                  Provider:{" "}
                  <span className="font-medium">{service.provider_name}</span>
                </p>

                {/* Description with 2 lines max and ellipsis */}
                <p className="text-gray-500 text-sm md:text-base mb-2 overflow-hidden text-ellipsis line-clamp-2">
                  {service.description}
                </p>

                <p className="mt-2 font-semibold text-yellow-700">
                  Rating: {service.rating || 0}/5
                </p>
              </div>

              <button
                onClick={() => handleViewDetails(service._id)}
                className="text-center mt-auto w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors duration-300 cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
