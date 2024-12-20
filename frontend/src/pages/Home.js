import React from 'react';
// eslint-disable-next-line no-unused-vars
import { OrbitControls, Torus, Sphere } from '@react-three/drei';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Banner from '../components/banner';
import { FaArrowRight, FaStar, FaCalendarAlt, FaMapMarkerAlt, FaComments } from 'react-icons/fa';
import productCategory from '../helpers/productCategory'; // Ensure this structure contains Fashion category with subcategories

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-spin-slow bg-gradient-to-r from-pink-500 to-blue-500 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 absolute -top-20 -left-40"></div>
          <div className="animate-pulse bg-purple-600 w-[400px] h-[400px] rounded-full blur-xl opacity-50 absolute bottom-0 right-0"></div>
        </div>

        {/* Hero Content */}
        <h1 className="text-6xl font-bold mb-4 z-10">Welcome to SpotVibe</h1>
        <p className="text-xl mb-6 z-10">
          Discover products, explore events, and find nearby places to enjoy your vibe.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 z-10">
          <button className="bg-white text-blue-500 px-8 py-3 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition duration-300 flex items-center space-x-2">
            <span>Shop Now</span>
            <FaArrowRight />
          </button>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 flex items-center space-x-2">
            <span>Explore Events</span>
            <FaCalendarAlt />
          </button>
        </div>

        {/* Nearby Attractions Button */}
        <div className="mt-8 z-10">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2">
            <span>See What's Around</span>
            <FaMapMarkerAlt />
          </button>
        </div>

        {/* Live Chat */}
        <div className="absolute bottom-10 right-10 bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:shadow-xl flex items-center space-x-2 z-10">
          <FaComments />
          <span>Chat with Us</span>
        </div>
      </div>

      {/* Category Section */}
      <section id="categories" className="px-6 py-12 bg-white">
        <h2 className="text-4xl font-bold text-center mb-8">Shop by Categories</h2>
        <CategoryList categories={productCategory} /> {/* Pass the new categories here */}
      </section>

      {/* Banner Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 text-white text-center">
        <BannerProduct />
      </section>



      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />


      {/* Other Vertical Card Products */}
      <VerticalCardProduct category={"mobiles"} heading={"Smartphones"} />
      <VerticalCardProduct category={"mouse"} heading={"Keyboards"} />
      <VerticalCardProduct category={"televisions"} heading={"Smart TVs"} />
      <VerticalCardProduct category={"camera"} heading={"Cameras"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speakers"} heading={"Smart Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators & Freezers"} />
      <VerticalCardProduct category={"trimmers"} heading={"Shavers & Groomers"} />
      {/* Other Vertical Card Products */}
<VerticalCardProduct category={"headphones"} heading={"Headphones"} />
<VerticalCardProduct category={"cameras"} heading={"Cameras"} />
<VerticalCardProduct category={"smartphones"} heading={"Smartphones"} />
<VerticalCardProduct category={"laptops"} heading={"Laptops"} />
<VerticalCardProduct category={"keyboards"} heading={"Keyboards"} />
<VerticalCardProduct category={"printers_scanners"} heading={"Printers & Scanners"} />
<VerticalCardProduct category={"processors"} heading={"Processors"} />
<VerticalCardProduct category={"refrigerators_freezers"} heading={"Refrigerators & Freezers"} />
<VerticalCardProduct category={"smart_speakers"} heading={"Smart Speakers"} />
<VerticalCardProduct category={"shavers_groomers"} heading={"Shavers & Groomers"} />
<VerticalCardProduct category={"smart_tvs"} heading={"Smart TVs"} />
<VerticalCardProduct category={"smartwatches"} heading={"Smartwatches"} />
<VerticalCardProduct category={"ebooks"} heading={"E-books"} />
<VerticalCardProduct category={"home_decor"} heading={"Home Decor"} />
<VerticalCardProduct category={"fashion"} heading={"Fashion"} />

<VerticalCardProduct category={"gourmet_food_drinks"} heading={"Gourmet Food & Drinks"} />
<VerticalCardProduct category={"gaming"} heading={"Gaming"} />
<VerticalCardProduct category={"health_wellness"} heading={"Health & Wellness"} />
<VerticalCardProduct category={"fitness_equipment"} heading={"Fitness Equipment"} />
<VerticalCardProduct category={"diy_crafts"} heading={"DIY & Crafts"} />
<VerticalCardProduct category={"pet_supplies"} heading={"Pet Supplies"} />
<VerticalCardProduct category={"tech_accessories"} heading={"Tech Accessories"} />
<VerticalCardProduct category={"subscription_services"} heading={"Subscription Services"} />
<VerticalCardProduct category={"sustainable_goods"} heading={"Sustainable Goods"} />


      {/* Category List Section */}
      <section id="categories" className="px-4 py-8 bg-white">
        <h2 className="text-4xl font-semibold mb-8 text-center">Shop by Categories</h2>
        <CategoryList />
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-blue-500 text-white py-16 text-center rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-8">What Our Customers Are Saying</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-1/2 md:w-1/3 bg-white text-blue-500 p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <p className="mb-4">"Amazing products! The quality and speed of delivery exceeded my expectations."</p>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 bg-white text-blue-500 p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <p className="mb-4">"I love shopping here! So many great products and amazing customer service."</p>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-blue-500 text-white py-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Join Our Upcoming Events</h2>
        <p className="text-lg mb-6">Get exclusive access to the latest tech events and sales.</p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300 flex items-center space-x-2 mb-8">
          <span>See Events</span>
          <FaArrowRight />
        </button>
        
        <Banner className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12 rounded-xl shadow-xl">
          <p className="text-center text-lg">Stay updated with the latest offers and news!</p>
        </Banner>
      </section>

      {/* Help and Chat Section */}
      <section className="bg-gray-100 py-14 text-center rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Need Help or Want to Chat?</h2>
        <p className="text-lg mb-6 text-gray-600">If you have any questions about your order or just want to chat with friends, we're here to help!</p>
        <div className="relative max-w-4xl mx-auto mb-8">
          <video className="w-full rounded-lg shadow-lg" controls autoPlay muted loop>
            <source src="/Blue Modern Influencer Social Media Chat Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <button className="bg-blue-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3">
          <span>Start Chatting</span>
          <FaArrowRight />
        </button>
      </section>

      {/* About Us Section with the New Video */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 text-white text-center rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          We are a passionate team dedicated to delivering high-quality products and unmatched customer service. Our mission is to bring the latest innovations in tech directly to your doorstep, ensuring an exceptional shopping experience.
        </p>
        <div className="relative max-w-4xl mx-auto mb-8">
          <video className="w-full rounded-lg shadow-lg" controls autoPlay muted loop>
            <source src="/Yellow and Purple Modern Business Service Promotion Mobile Video (2).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Home;
