import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import { FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your booking has been deleted.",
                "success"
              );
              setBookings(bookings.filter((b) => b._id !== id));
            }
          });
      }
    });
  };

  // Handle Rating
  const handleRating = async (bookingId, ratingValue, serviceId) => {
    try {
      // Update bookings collection
      const bookingRes = await fetch(
        `http://localhost:3000/bookings/${bookingId}/rate`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: ratingValue }),
        }
      );
      const bookingData = await bookingRes.json();

      if (bookingData.modifiedCount > 0) {
        // Update services collection rating
        await fetch(`http://localhost:3000/services/${serviceId}/rating`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating: ratingValue }),
        });

        // UI update
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, rating: ratingValue } : b
          )
        );

        Swal.fire("Success!", "Your rating has been saved.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to save rating.", "error");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Please login to see your bookings.
      </div>
    );
  }

if (loading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="radial-progress animate-spin border-yellow-400 border-4 w-8 h-8 mb-3"></div>
      <p className="text-gray-700 text-base md:text-lg font-medium">
        Booking Loading...
      </p>
    </div>
  );
}


  return (
    <div className="min-h-screen p-5 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-700">You have no bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Booking Date</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={b._id}>
                    <th>{idx + 1}</th>
                    <td>{b.serviceName || "Service"}</td>
                    <td>{b.bookingDate}</td>
                    <td>{b.price}</td>
                    <td className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar
                          key={i}
                          className={`cursor-pointer ${
                            i <= (b.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleRating(b._id, i, b.serviceId)}
                        />
                      ))}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="btn btn-sm btn-error flex items-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
