import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/AuthContext/AuthProvider";
import Spinner from "../../Components/Spinner/Spinner";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="navbar bg-white shadow-md px-4 md:px-10">
      {/* Mobile toggle */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-center"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/my-services">My Services</NavLink>
                </li>
                <li>
                  <NavLink to="/add-service">Add Service</NavLink>
                </li>
                <li>
                  <NavLink to="/my-bookings">My Bookings</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <NavLink to="/login" className="btn btn-primary w-full mb-2">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="btn btn-secondary w-full">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl ml-2">
          Home<span className="text-yellow-700">Pro</span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/my-services">My Services</NavLink>
              </li>
              <li>
                <NavLink to="/add-service">Add Service</NavLink>
              </li>
              <li>
                <NavLink to="/my-bookings">My Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Desktop logout/login btn */}
      <div className="navbar-end hidden lg:flex gap-2">
        {user ? (
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-secondary">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
