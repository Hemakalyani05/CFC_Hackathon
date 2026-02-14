import { useState, useEffect } from 'react';
import { Heart, Search, MapPin, Phone, Loader } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const BloodDonation = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('find'); // 'find' or 'donate'
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchGroup, setSearchGroup] = useState('');

    useEffect(() => {
        fetchDonors();
    }, [searchGroup]);

    const fetchDonors = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                params: {
                    bloodGroup: searchGroup
                }
            };
            const { data } = await axios.get('http://localhost:5000/api/blood', config);
            setDonors(data);
        } catch (err) {
            console.error('Fetch Donors Error:', err);
            const msg = err.response?.data?.message || err.message || 'Failed to fetch donors';
            setError(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterDonor = async () => {
        setRegisterLoading(true);
        setError(null);
        setSuccessMessage('');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // We can pass additional data here if needed, like lastDonationDate
            const { data } = await axios.post('http://localhost:5000/api/blood/register', {}, config);

            // Update local user state
            // We need to update the user object in context and localStorage
            const updatedUser = { ...user, isDonor: data.isDonor, bloodGroup: data.bloodGroup };
            updateUser(updatedUser);

            setSuccessMessage('Successfully registered as a donor!');
        } catch (err) {
            console.error('Register Donor Error:', err);
            const msg = err.response?.data?.message || err.message || 'Failed to register as donor';
            setError(`Error: ${msg}`);
        } finally {
            setRegisterLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-red-600 mr-2 fill-current" />
                    Blood Connector
                </h1>
                <p className="text-gray-600 mt-2">Find donors or register to donate blood</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setActiveTab('find')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'find' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Find a Donor
                    </button>
                    <button
                        onClick={() => setActiveTab('donate')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'donate' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Donate Blood
                    </button>
                </div>
            </div>

            {error && (
                <div className="max-w-3xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="max-w-3xl mx-auto mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                    {successMessage}
                </div>
            )}

            {activeTab === 'find' ? (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                        <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
                        <div className="flex gap-4">
                            <select
                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 border p-2"
                                value={searchGroup}
                                onChange={(e) => setSearchGroup(e.target.value)}
                            >
                                <option value="">All Blood Groups</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                            <button
                                onClick={fetchDonors}
                                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center"
                            >
                                <Search className="h-4 w-4 mr-2" /> Search
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader className="h-8 w-8 text-red-600 animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {donors.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    No donors found matching your criteria.
                                </div>
                            ) : (
                                donors.map(donor => (
                                    <div key={donor._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg mr-4 border border-red-200">
                                                {donor.bloodGroup}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{donor.name}</h3>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {/* Location logic to be improved with geospatial data */}
                                                    {donor.location?.coordinates ? 'Nearby' : 'Location not available'}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Ideally we would have a way to reveal phone number or contact via app */}
                                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm font-medium">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            Contact
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="h-10 w-10 text-red-600" />
                    </div>

                    {user?.isDonor ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You, Hero!</h2>
                            <p className="text-gray-600 mb-8">
                                You are registered as a blood donor. Your willingness to help can save lives in your community.
                            </p>

                            <div className="bg-green-50 p-6 rounded-lg text-left mb-6 border border-green-100">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <Heart className="h-6 w-6 text-green-600 fill-current" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-green-900">Active Donor Profile</h3>
                                        <p className="text-green-700 text-sm">You are visible in search results</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Blood Group</span>
                                        <span className="font-bold text-gray-900">{user.bloodGroup || 'Not set'}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block">Status</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Available
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Become a Donor</h2>
                            <p className="text-gray-600 mb-8">
                                Your donation can save lives. Register as a donor to appear in search results for people in need nearby.
                            </p>

                            <div className="bg-blue-50 p-4 rounded-lg text-left mb-6 border border-blue-100">
                                <p className="text-sm text-blue-800 font-medium">Current Profile Status:</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-700">Blood Group: <strong>{user?.bloodGroup || 'Not Set'}</strong></span>
                                    <span className="text-gray-500 font-bold text-sm bg-gray-200 px-2 py-1 rounded-full">Not Registered</span>
                                </div>
                            </div>

                            <button
                                onClick={handleRegisterDonor}
                                disabled={registerLoading}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:opacity-70 flex justify-center items-center"
                            >
                                {registerLoading ? (
                                    <>
                                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                                        Registering...
                                    </>
                                ) : (
                                    'Register to Donate'
                                )}
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default BloodDonation;
