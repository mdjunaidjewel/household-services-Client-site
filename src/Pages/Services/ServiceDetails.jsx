import { useLoaderData } from "react-router";
import { FaStar } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    _id,
    service_name,
    image,
    description,
    price_range,
    duration,
    rating,
  } = service;

  const [open, setOpen] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    const booking = {
      userEmail: user?.email,
      serviceId: _id,
      bookingDate: e.target.date.value,
      price: price_range,
    };

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (data.insertedId || data.success) {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        setOpen(false);
      } else {
        Swal.fire("Booking failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Booking failed. Try again.");
    }
  };

  const handleBookNowClick = () => {
    if (user && user.email) {
      setOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book a service.",
        confirmButtonText: "Login / Register",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Wrapper Card */}
        <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden border border-white/40">
          {/* Top Image */}
          <div className="w-full h-60 md:h-96 overflow-hidden">
            <img
              src={image}
              alt={service_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                {service_name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4 mb-6">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xl ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-700 font-semibold">{rating}/5</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-7 mb-8 text-lg">
              {description}
            </p>

            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Price */}
              <div className="p-6 bg-white shadow-lg rounded-2xl border">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Price Range
                </h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {price_range}
                </p>
              </div>

              {/* Duration */}
              <div className="p-6 bg-white shadow-lg rounded-2xl border">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Duration
                </h3>
                <p className="text-2xl font-bold text-indigo-600">{duration}</p>
              </div>
            </div>

            {/* Book Button */}
            <div className="mt-10">
              <button
                onClick={handleBookNowClick}
                className=" cursor-pointer w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal */}
      {open && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-2xl mb-3">Book This Service</h3>

            {/* Service Info */}
            <div className="p-4 bg-gray-100 rounded-xl mb-4">
              <p className="font-semibold">{service_name}</p>
              <p className="text-sm text-gray-600">
                {description.slice(0, 80)}...
              </p>
              <div className="flex gap-4 mt-2 text-sm">
                <p>💲 Price: {price_range}</p>
                <p>⏱ Duration: {duration}</p>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBooking}>
              {/* Email */}
              <label className="font-medium">Your Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-200 mb-4"
              />

              {/* Booking Date */}
              <label className="font-medium">Booking Date</label>
              <input
                type="date"
                name="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full mb-4"
              />

              {/* Buttons */}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ServiceDetails;
