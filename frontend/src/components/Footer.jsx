import React, { useState } from 'react';
import { Link } from "react-router-dom";
import playstore from "../assets/favicon2.png";
import { FaHome, FaGithub, FaRegCopyright, FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Corrected import for Twitter icon

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Define company links with distinct paths
    const companyLinks = [
        { name: 'About Us', path: '/aboutus' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Define quick links
    const quickLinks = [
        { name: 'Crop Recommendation', path: '/crop' },
        { name: 'Fertilizer Recommendation', path: '/fertilizer' },
        { name: 'Soil Quality', path: '/soil' },
        { name: 'Price Prediction', path: '/prices' },
        { name: 'Forecast', path: '/Climate' },
        { name: 'Disease', path: '/disease' },
    ];

    // Define social media links
    const socialMedia = [
        { Icon: FaGithub, link: 'https://github.com/manikumarreddyu/AgroTech-AI', color: '#333' },
        { Icon: FaDiscord, link: 'https://discord.gg/yRPQDDP6', color: '#7289DA' },
        { Icon: FaXTwitter, link: 'https://twitter.com/YourTwitterHandle', color: '#1DA1F2' }, // Updated to FaTwitter
        { Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/manikumarreddyu', color: '#0077B5' },
    ];

    // Define legal links with their paths if available
    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms and Conditions', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
    ];

    const handleRating = (value) => {
        setRating(value);
    };

    const submitRating = async () => {
        const authData = JSON.parse(localStorage.getItem("auth"));

        // Extract the token
        const token = authData?.token;
        
        if (!token) {
            alert("Please log in to submit a rating.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/rating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                alert("Thank you for your feedback!");
                setRating(0);
                setComment("");
                setIsModalOpen(false); // Close modal after submission
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Submission failed."}`);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("An error occurred while submitting your rating.");
        }
    };


    return (
        <footer className='bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10]  p-8 text-white'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105">
                            <img src={playstore} className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12" alt="AgroTech AI Logo" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-lime-200 group-hover:to-white transition-all duration-300">
                                AgroTech AI
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            AgroTech AI platform provides cutting-edge Machine Learning models for agricultural predictions and insights.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Company</h3>
                        <ul className='space-y-2'>
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>
                            {quickLinks.map((link) => (
                                <li key={link.name} className="w-full">
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect with Us and Legal */}
                    <div>
                        {/* Social Media Links */}
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Connect with us</h3>
                        <div className='flex space-x-4 mt-4'>
                            {socialMedia.map(({ Icon, link, color }, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                                    style={{
                                        backgroundColor: 'white',
                                        color: color,
                                        boxShadow: '0 0 0 0 rgba(255,255,255,0.7)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = color;
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.boxShadow = `0 0 0 8px rgba(255,255,255,0.3)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = color;
                                        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,255,255,0.7)';
                                    }}
                                    aria-label={`Social media link ${index + 1}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <h3 className='text-lg font-semibold mt-6 mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-lime-200 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Legal</h3>
                        <ul className='space-y-2'>
                            {legalLinks.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-lime-200">{item.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-8 pt-8 border-t border-white/30 text-center'>
                    <p className='flex items-center justify-center text-sm'>
                        Copyright <FaRegCopyright className='mx-1' /> {currentYear} All Rights Reserved <span className="font-bold ml-2 bg-white text-emerald-600 px-2 py-1 rounded transition-all duration-300 hover:bg-emerald-600 hover:text-white">AgroTech AI</span>
                    </p>
                </div>

                {/* Rate Us Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-lime-200 text-gray-800 font-semibold py-2 px-4 rounded transition-all duration-300 transform hover:bg-lime-300"
                    >
                        Rate Us
                    </button>
                </div>
            </div>

            {/* Rating Modal */}           
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative">
                        {/* Close Icon */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition duration-200"
                        >
                            ✕
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                            We'd Love Your Feedback
                        </h2>

                        {/* Star Rating */}
                        <div className="flex justify-center space-x-2 mb-6">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    className={`cursor-pointer text-2xl ${
                                        rating >= value ? 'text-yellow-500' : 'text-gray-300'
                                    } transition-transform transform hover:scale-105`}
                                    onClick={() => handleRating(value)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Comments Text Area */}
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                            rows="3"
                            placeholder="Share your thoughts..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={submitRating}
                                className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-yellow-600 shadow-md hover:shadow-lg"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}          
        </footer>
    );
};

export default Footer;
