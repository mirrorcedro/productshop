import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="font-semibold text-xl mb-4">About SpotVibe</h2>
            <p className="text-gray-400">
              SpotVibe is your go-to platform for discovering events and products in Rwanda and beyond. Stay updated with the latest happenings and exclusive deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Quick Links</h2>
            <ul>
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white">Events</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white">Products</a></li> {/* Fixed href */}
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Newsletter</h2>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest events and product launches by subscribing to our newsletter.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded text-gray-800 mb-4"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Subscribe</button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-gray-400">© 2024 SpotVibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
