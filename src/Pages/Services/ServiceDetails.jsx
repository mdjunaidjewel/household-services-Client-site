import { useLoaderData } from "react-router";
import { FaStar } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    _id,
    service_name,
    description,
    price,
    duration,
    rating,
    provider_name,
    provider_email,
    provider_contact,
    createdAt,
  } = service;

  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [loadingBooked, setLoadingBooked] = useState(true);

  const isProvider = user?.email === provider_email;

  // check if logged-in user already booked
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const alreadyBooked = data.some((b) => b.serviceId === _id);
          setBooked(alreadyBooked);
          setLoadingBooked(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingBooked(false);
        });
    } else {
      setLoadingBooked(false);
    }
  }, [user, _id]);

  const handleBookNowClick = () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book a service.",
      });
      return;
    }
    if (isProvider) {
      Swal.fire({
        icon: "info",
        title: "Provider Cannot Book",
        text: "You cannot book your own service.",
      });
      return;
    }
    if (booked) {
      Swal.fire({
        icon: "info",
        title: "Already Booked",
        text: "You have already booked this service.",
      });
      return;
    }
    setOpen(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const booking = {
      userEmail: user?.email,
      serviceId: _id,
      serviceName: service_name,
      bookingDate: e.target.date.value,
      price: price,
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
        setBooked(true);
      } else {
        Swal.fire("Booking failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Booking failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm shadow-md rounded-xl overflow-hidden border border-white/30 p-4 md:p-5">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {service_name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm md:text-base ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-700 text-sm md:text-base font-medium">
              {rating}/5
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-5 mb-3 text-sm md:text-base line-clamp-3">
            {description}
          </p>

          {/* Provider Info */}
          <div className="mb-3 p-3 bg-gray-100 rounded-lg border text-sm md:text-base">
            <h3 className="font-semibold text-gray-800 mb-1">Provider Info</h3>
            <p>
              <strong>Name:</strong> {provider_name}
            </p>
            <p>
              <strong>Email:</strong> {provider_email}
            </p>
            <p>
              <strong>Contact:</strong> {provider_contact}
            </p>
            <p>
              <strong>Added On:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="p-3 bg-white shadow rounded-lg border text-sm md:text-base">
              <h3 className="font-semibold mb-1">Price</h3>
              <p className="text-indigo-600 font-bold">{price}</p>
            </div>
            <div className="p-3 bg-white shadow rounded-lg border text-sm md:text-base">
              <h3 className="font-semibold mb-1">Duration</h3>
              <p className="text-indigo-600 font-bold">
                {duration} {duration ? "hours" : ""}
              </p>
            </div>
          </div>

          {/* Book Button */}
          {!loadingBooked && (
            <div className="mt-4">
              <button
                onClick={handleBookNowClick}
                disabled={booked || isProvider}
                className={`w-full md:w-auto px-5 py-2 text-white text-sm md:text-base font-semibold rounded-lg shadow transition-all cursor-pointer ${
                  booked || isProvider
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isProvider
                  ? "Cannot Book Your Own Service"
                  : booked
                  ? "Already Booked"
                  : "Book Now"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {open && (
        <dialog open className="modal">
          <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg md:text-xl mb-2">
              Book This Service
            </h3>

            <div className="p-2 bg-gray-100 rounded-lg mb-2 text-sm md:text-base">
              <p className="font-semibold">{service_name}</p>
              <p className="text-gray-600 line-clamp-3">{description}</p>
              <div className="flex gap-2 mt-1 text-sm">
                <p>💲 Price: {price}</p>
                <p>⏱ Duration: {duration} hours</p>
              </div>
              <div className="mt-1 text-sm">
                <p>👤 Provider: {provider_name}</p>
                <p>📧 Email: {provider_email}</p>
                <p>📞 Contact: {provider_contact}</p>
              </div>
            </div>

            <form onSubmit={handleBooking}>
              <label className="font-medium text-sm md:text-base">
                Your Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-200 mb-2 text-sm"
              />

              <label className="font-medium text-sm md:text-base">
                Booking Date
              </label>
              <input
                type="date"
                name="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full mb-2 text-sm"
              />

              <div className="modal-action flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
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
