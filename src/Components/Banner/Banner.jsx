import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load slides from public JSON
  useEffect(() => {
    fetch("/threeServices.json")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  // Auto Slide every 4s
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return <p>Loading...</p>;

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative"
            style={{ width: `${100 / slides.length}%` }}
          >
            {/* Img */}
            <img
              src={slide.image}
              className="w-full h-[250px] md:h-[450px] object-cover"
              alt={slide.service_name}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-5 md:p-16">
              {/* Headline with soft yellow gradient */}
              <h1
                className="text-2xl md:text-5xl font-extrabold mb-1 sm:mb-3 bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #fff180, #ffeb3b)", // soft yellow gradient only
                }}
              >
                {slide.service_name}
              </h1>

              {/* Description*/}
              <p className="text-gray-200 text-sm md:text-lg mb-2 sm:mb-5 max-w-2xl">
                {slide.description}
              </p>

              {/* Explore Button*/}
              <NavLink
                to="services"
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-500 cursor-pointer"
              >
                Explore
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1
          )
        }
        className="btn btn-circle absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
        className="btn btn-circle absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;
