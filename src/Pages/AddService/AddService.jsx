import React, { useState } from "react";

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    provider_name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Service added successfully!");
        setFormData({
          service_name: "",
          category: "",
          price: "",
          description: "",
          image: "",
          provider_name: "",
          email: "",
        });
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding service");
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors duration-300"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
