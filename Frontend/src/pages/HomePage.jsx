import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLogOut, FiAlertCircle, FiLogIn } from 'react-icons/fi';

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:5000/api/user', { headers });
            setUserData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err.response?.data?.message || 'Failed to load user data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear tokens from storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Loading user data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                    <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        <FiAlertCircle className="mr-2 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={fetchUserData}
                            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
                        >
                            Retry
                        </button>
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
                        >
                            <FiLogIn className="mr-2" />
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

                        {userData && (
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FiUser className="text-gray-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">
                                            {userData.firstName} {userData.lastName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FiMail className="text-gray-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{userData.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center py-3 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
                                >
                                    <FiLogOut className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;