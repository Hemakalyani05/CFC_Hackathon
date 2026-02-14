import { useState } from 'react';
import { Heart, Search, MapPin, Phone } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const BloodDonation = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('find'); // 'find' or 'donate'

    // Mock data for demo purposes
    const [donors, setDonors] = useState([
        { id: 1, name: 'John Doe', group: 'O+', distance: '2.5 km', phone: '123-456-7890', location: 'Downtown' },
        { id: 2, name: 'Jane Smith', group: 'A-', distance: '5.0 km', phone: '987-654-3210', location: 'Westside' },
        { id: 3, name: 'Mike Ross', group: 'AB+', distance: '1.2 km', phone: '456-789-0123', location: 'Uptown' },
    ]);

    const [searchGroup, setSearchGroup] = useState('');

    const filteredDonors = searchGroup
        ? donors.filter(d => d.group === searchGroup)
        : donors;

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
                            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center">
                                <Search className="h-4 w-4 mr-2" /> Search
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredDonors.map(donor => (
                            <div key={donor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg mr-4 border border-red-200">
                                        {donor.group}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{donor.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {donor.location} ({donor.distance})
                                        </div>
                                    </div>
                                </div>
                                <a href={`tel:${donor.phone}`} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center text-sm font-medium">
                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                    Contact
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="h-10 w-10 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Become a Donor</h2>
                    <p className="text-gray-600 mb-8">
                        Your donation can save lives. Register as a donor to appear in search results for people in need nearby.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg text-left mb-6 border border-blue-100">
                        <p className="text-sm text-blue-800 font-medium">Current Profile Status:</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-700">Blood Group: <strong>{user?.bloodGroup || 'Not Set'}</strong></span>
                            <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded-full">Available</span>
                        </div>
                    </div>

                    <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
                        Register to Donate
                    </button>
                </div>
            )}
        </div>
    );
};

export default BloodDonation;
