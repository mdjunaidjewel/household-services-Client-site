import React from "react";
import { FaHandsHelping, FaShieldAlt, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHandsHelping className="text-yellow-400 text-4xl mb-4" />,
      title: "Trusted Experts",
      description:
        "Our team consists of verified and trained professionals ready to provide top-notch service at your doorstep.",
    },
    {
      icon: <FaShieldAlt className="text-yellow-400 text-4xl mb-4" />,
      title: "Safety & Security",
      description:
        "We prioritize safety in every service, ensuring your home and belongings are protected during our visit.",
    },
    {
      icon: <FaClock className="text-yellow-400 text-4xl mb-4" />,
      title: "Timely Service",
      description:
        "We respect your time and always arrive on schedule, completing tasks efficiently without compromising quality.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
          Why <span className="text-yellow-400">Choose Us</span>
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          We provide professional home services with trust, safety, and
          efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
