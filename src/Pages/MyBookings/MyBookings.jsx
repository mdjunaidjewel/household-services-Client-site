import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import { FaTrash } from "react-icons/fa";
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
        fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
        })
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Please login to see your bookings.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
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
