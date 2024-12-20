import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/Purple and Black Futuristic Neon Smartphone Amazon Product Image.png';
import image2 from '../assest/banner/Green and Yellow Simple Clean Shoes Sale Banner (1).png';
import image3 from '../assest/banner/Brown Minimalist Fashion Product Banner.png';
import image4 from '../assest/banner/Gray Yellow E-Commerce Computer Accessory Products Discount Minimalist Instagram Post.png';
import image5 from '../assest/banner/Black Modern Photocentric Headphones Product Review Instagram Post.png';
import image6 from '../assest/banner/Blue Best Smartwatch Product Instagram Post.png';
import image7 from '../assest/banner/Green Natural Conversation Instagram Post.png';
import image8 from '../assest/banner/Blue and White Futuristic AI Technology Banner.png';
import image9 from '../assest/banner/Black and White Modern Black Friday Sale Banner.png';

import image1Mobile from '../assest/banner/Purple and Black Futuristic Neon Smartphone Amazon Product Image.png';
import image2Mobile from '../assest/banner/Green and Yellow Simple Clean Shoes Sale Banner (1).png';
import image3Mobile from '../assest/banner/Gray Yellow E-Commerce Computer Accessory Products Discount Minimalist Instagram Post.png';
import image4Mobile from '../assest/banner/Brown Minimalist Fashion Product Banner.png';
import image5Mobile from '../assest/banner/Black Modern Photocentric Headphones Product Review Instagram Post.png';
import image6Mobile from '../assest/banner/Green Natural Conversation Instagram Post.png';
import image7Mobile from '../assest/banner/Blue and White Futuristic AI Technology Banner.png';
import image8Mobile from '../assest/banner/Blue Best Smartwatch Product Instagram Post.png';
import image9Mobile from '../assest/banner/Black and White Modern Black Friday Sale Banner.png';

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
    ];

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
        image6Mobile,
        image7Mobile,
        image8Mobile,
        image9Mobile,
    ];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-auto w-full bg-slate-200 relative">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop and Tablet version */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {desktopImages.map((imageURL, index) => (
                        <div
                            className="w-full h-[350px] min-w-full min-h-full transition-all"
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {mobileImages.map((imageURL, index) => (
                        <div
                            className="w-full h-[200px] min-w-full min-h-full transition-all"
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
