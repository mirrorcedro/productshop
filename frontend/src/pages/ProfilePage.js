import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import SummaryApi from '../common'; // API endpoints
import ChangeUserProfile from '../components/ChangeUserProfile'; // Modal component

const UserProfile = () => {
    const user = useSelector(state => state?.user?.user);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        role: '',
        createdAt: '',
        _id: ''
    });
    const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

    // Fetch user profile data
    const fetchUserProfile = async () => {
        try {
            const fetchData = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include',
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setUserProfile(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to fetch profile');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Your Profile</h2>

                <div className="space-y-8">
                    <div className="flex flex-col items-center">
                        {user?.profilePic ? (
                            <img
                                src={user.profilePic}
                                alt={user?.name}
                                className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
                            />
                        ) : (
                            <FaUserCircle className="w-32 h-32 text-gray-400" />
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Name:</span>
                            <span className="text-xl text-gray-800 font-medium">{userProfile.name}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Email:</span>
                            <span className="text-xl text-gray-800 font-medium">{userProfile.email}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Role:</span>
                            <span className="text-xl text-gray-800 font-medium">{userProfile.role}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold text-gray-700">Created On:</span>
                            <span className="text-xl text-gray-800 font-medium">
                                {new Date(userProfile.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {openUpdateProfile && (
                    <ChangeUserProfile
                        onClose={() => setOpenUpdateProfile(false)}
                        name={userProfile.name}
                        email={userProfile.email}
                        userId={userProfile._id}
                        fetchUserProfile={fetchUserProfile}
                    />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
