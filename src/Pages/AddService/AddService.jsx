import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service_name: "",
    price: "",
    category: "", // duration এর জায়গায় category
    provider_contact: "",
    description: "",
    image: "",
    provider_name: "",
    email: "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Service Added!",
          text: "Your service has been added successfully.",
          icon: "success",
          confirmButtonText: "Go to My Services",
        }).then(() => {
          navigate("/my-services");
        });

        setFormData({
          service_name: "",
          price: "",
          category: "",
          provider_contact: "",
          description: "",
          image: "",
          provider_name: "",
          email: user?.email || "",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to add service.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Error adding service.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-10 bg-gray-100 rounded-2xl shadow-md">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Add New Service
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Name */}
        <div>
          <label className="block mb-2 font-semibold">Service Name</label>
          <input
            type="text"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g. Cleaning, Plumbing"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-2 font-semibold">Contact Number</label>
          <input
            type="text"
            name="provider_contact"
            value={formData.provider_contact}
            onChange={handleChange}
            required
            placeholder="017XXXXXXXX"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Provider Name */}
        <div>
          <label className="block mb-2 font-semibold">Provider Name</label>
          <input
            type="text"
            name="provider_name"
            value={formData.provider_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
