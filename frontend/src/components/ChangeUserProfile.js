import React, { useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { MdModeEdit } from "react-icons/md";

const ChangeUserProfile = ({ onClose, userId, name, email, callFunc }) => {
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedEmail, setUpdatedEmail] = useState(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation (check for empty fields)
        if (!updatedName || !updatedEmail) {
            toast.error("Name and Email are required.");
            return;
        }

        // Optional: Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(updatedEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method, // Ensure this is 'POST'
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure token is passed
                body: JSON.stringify({
                    userId,
                    name: updatedName,
                    email: updatedEmail,
                }),
            });

            const data = await response.json();

            console.log('API Response:', data); // Log the response for debugging

            if (data.success) {
                toast.success('Profile updated successfully!');
                callFunc(); // Re-fetch user data to update the UI
                onClose(); // Close the modal
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 px-6 py-2 rounded-lg hover:text-indigo-600 focus:outline-none transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeUserProfile;
