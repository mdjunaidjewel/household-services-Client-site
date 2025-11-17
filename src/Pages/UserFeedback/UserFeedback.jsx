import React from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    name: "Jahid Hasan",
    rating: 5,
    feedback: "Excellent service! My home cleaning was spotless.",
  },
  {
    id: 2,
    name: "Sabrina Akter",
    rating: 4,
    feedback: "The plumber arrived on time and fixed everything quickly.",
  },
  {
    id: 3,
    name: "Rahim Uddin",
    rating: 5,
    feedback:
      "The AC repair service was amazing! Friendly staff and quick response.",
  },
  {
    id: 4,
    name: "Farhana Karim",
    rating: 5,
    feedback:
      "Highly professional and reliable team. Loved the cleaning service!",
  },
  {
    id: 5,
    name: "Shakib Al Hasan",
    rating: 4,
    feedback: "Fast response and very skilled electricians.",
  },
  {
    id: 6,
    name: "Nusrat Jahan",
    rating: 5,
    feedback: "Plumbing service was top-notch. No more leaks!",
  },
  {
    id: 7,
    name: "Imran Hossain",
    rating: 5,
    feedback: "Home painting team did an amazing job with smooth finishing.",
  },
  {
    id: 8,
    name: "Tania Akter",
    rating: 4,
    feedback: "Babysitting service is reliable and trustworthy.",
  },
  {
    id: 9,
    name: "Rafiq Khan",
    rating: 5,
    feedback: "The home shifting service was stress-free and professional.",
  },
  {
    id: 10,
    name: "Moushumi Begum",
    rating: 5,
    feedback:
      "Cooking service was delicious and timely. Perfect for busy families.",
  },
];

const UserFeedbackMarquee = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gray-100">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800">
        User <span className="text-yellow-500">Feedback</span>
      </h2>

      <div className="overflow-hidden">
        <div className="flex animate-marquee hover:pause-marquee gap-6">
          {/* Duplicate feedback for continuous loop */}
          {[...feedbackData, ...feedbackData].map((fb, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-72 p-6 bg-white rounded-xl shadow-lg text-center"
            >
              <FaUserCircle className="text-gray-400 text-5xl sm:text-6xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">{fb.name}</h3>
              <div className="flex justify-center mb-2">
                {[...Array(fb.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                {fb.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default UserFeedbackMarquee;
