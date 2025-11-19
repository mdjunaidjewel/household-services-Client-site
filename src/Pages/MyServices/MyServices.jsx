import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-services/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Delete service
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/services/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Service has been deleted.", "success");
              setServices(services.filter((s) => s._id !== id));
            }
          });
      }
    });
  };

  // Update service (rating removed from modal)
  const handleUpdate = (service) => {
    Swal.fire({
      title: "Update Service",
      html: `
        <input id="swal-service_name" class="swal2-input" placeholder="Service Name" value="${service.service_name}">
        <input id="swal-category" class="swal2-input" placeholder="Category" value="${service.category}">
        <input id="swal-price" class="swal2-input" placeholder="Price" value="${service.price}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${service.description}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      width: "90%",
      preConfirm: () => {
        return {
          service_name: document.getElementById("swal-service_name").value,
          category: document.getElementById("swal-category").value,
          price: document.getElementById("swal-price").value,
          description: document.getElementById("swal-description").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedService = result.value;

        fetch(`http://localhost:3000/services/${service._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedService),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Updated!", "Service has been updated.", "success");
              setServices(
                services.map((s) =>
                  s._id === service._id ? { ...s, ...updatedService } : s
                )
              );
            } else {
              Swal.fire("No changes", "Service was not updated.", "info");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to update service", "error");
          });
      }
    });
  };

  if (!user)
    return (
      <p className="text-center mt-10">Please login to see your services.</p>
    );
  if (loading)
    return <p className="text-center mt-10">Loading your services...</p>;
  if (services.length === 0)
    return (
      <p className="text-center mt-10">You have not added any services yet.</p>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Services
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-center">
          <thead className="bg-gradient-to-r from-yellow-100 to-yellow-300">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-medium">#</th>
              <th className="px-4 py-3 text-gray-700 font-medium">Image</th>
              <th className="px-4 py-3 text-gray-700 font-medium">
                Service Name
              </th>
              <th className="px-4 py-3 text-gray-700 font-medium">Category</th>
              <th className="px-4 py-3 text-gray-700 font-medium">
                Description
              </th>
              <th className="px-4 py-3 text-gray-700 font-medium">Price</th>
              <th className="px-4 py-3 text-gray-700 font-medium">Rating</th>
              <th className="px-4 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service, index) => (
              <tr
                key={service._id}
                className="hover:bg-yellow-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 align-middle">{index + 1}</td>
                <td className="px-4 py-3 align-middle">
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800 max-w-xs truncate align-middle">
                  {service.service_name}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate align-middle">
                  {service.category}
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-sm truncate align-middle">
                  {service.description}
                </td>
                <td className="px-4 py-3 text-yellow-700 font-bold max-w-[100px] truncate align-middle">
                  ${service.price}
                </td>
                <td className="px-4 py-3 text-yellow-600 font-semibold max-w-[80px] truncate align-middle">
                  {service.rating ? `${service.rating}/5` : "0/5"}
                </td>
                <td className="px-4 py-3 align-middle">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleUpdate(service)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
