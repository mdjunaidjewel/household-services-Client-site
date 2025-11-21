import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase_config";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  // Spinner delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully 🎉",
        timer: 2000,
        showConfirmButton: false,
      });

      setEditMode(false);
      setTimeout(() => window.location.reload(), 1800);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.message || "Something went wrong. Try again later.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  // Helper for initials
  const getInitials = (text) => {
    if (!text) return "U";
    const parts = text.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-blue-100 px-4 py-10">
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-cyan-700 mb-6">
          My Profile
        </h2>

        {/* User Img Url */}
        <div className="flex flex-col items-center mb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-md object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-cyan-200 border-4 border-cyan-400 shadow-md flex items-center justify-center text-3xl font-bold text-cyan-700">
              {getInitials(user?.displayName || user?.email)}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "Unnamed User"}
          </h3>
          <p className="text-gray-600 mt-1">{user?.email}</p>

          {/* Last Login */}
          {user?.metadata?.lastSignInTime && (
            <p className="text-sm text-gray-500 mt-2">
              Last Login:{" "}
              <span className="font-medium text-gray-700">
                {new Date(user.metadata.lastSignInTime).toLocaleString()}
              </span>
            </p>
          )}
        </div>

        {/* Update Profile */}
        {!editMode ? (
          <div className="flex justify-center">
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all shadow-md"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full border-cyan-300 focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              type="text"
              placeholder="Enter new photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full border-cyan-300 focus:ring-2 focus:ring-cyan-500"
              required
            />

            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow-md transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
