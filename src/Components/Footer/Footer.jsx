import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-gray-200 pt-10 w-full"
      style={{
        background: "linear-gradient(to top, #0d1140, #2a2f7a)",
      }}
    >
      <div className="w-full mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo , Description */}
        <div>
          <h1 className="text-2xl font-bold text-yellow-400 mb-3">HomePro</h1>
          <p className="text-gray-400">
            Household Service Finder provides professional home services at your
            doorstep. Find cleaning, plumbing, electrical, and more from trusted
            experts.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              target="_blank"
              href="https://www.facebook.com/mdjunaidjewell/"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/junaidkhanjewel/"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://github.com/mdjunaidjewel"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://wa.me/+8801755715459"
              className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Info</h2>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Fatullah-Narayanganj, Dhaka.</li>
            <li>📞 +880 1755715459</li>
            <li>✉️ support@householdfinder.com</li>
            <li>✉️ mdjunaidjewell@gmail.com</li>
            <li>⏰ Mon - Sat: 9:00 AM - 7:00 PM</li>
          </ul>
        </div>

        {/* Other Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Other Info</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*Copyright */}
      <div className="border-t border-gray-800 mt-10 py-6 text-center text-gray-300">
        © {new Date().getFullYear()} HomePro. All rights reserved.
        <h1>Developed by Junaid Jewel.</h1>
      </div>
    </footer>
  );
};

export default Footer;
