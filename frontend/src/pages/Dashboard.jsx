import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import MapView from '../components/MapView';
import SOSButton from '../components/SOSButton';
import axios from 'axios';
import io from 'socket.io-client';
import { RefreshCw, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const ENDPOINT = "http://localhost:5000";

const Dashboard = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [sosRequests, setSosRequests] = useState([]);
    const [myLocation, setMyLocation] = useState(null);
    const [sosActive, setSosActive] = useState(false);
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNewSOS = (newSos) => {
            if (user.role === 'volunteer' || user.role === 'admin') {
                setSosRequests((prev) => {
                    if (prev.find(s => s._id === newSos._id)) return prev;
                    return [newSos, ...prev];
                });
                // Optional: Play sound here
            }
        };

        socket.on('sos-created', handleNewSOS);

        return () => {
            socket.off('sos-created', handleNewSOS);
        };
    }, [socket, user.role]);

    // Get current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setMyLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Load existing SOS requests
    useEffect(() => {
        if (user.role === 'volunteer') {
            fetchSOS();
        } else {
            fetchMyRequests();
        }
    }, [user.role]);

    const fetchMyRequests = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${ENDPOINT}/api/sos/my-requests`, config);
            setSosRequests(data);
        } catch (error) {
            console.error("Error fetching my requests", error);
        }
    };

    const fetchSOS = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Fetch nearby pending requests
            const { data: pendingData } = await axios.get(`${ENDPOINT}/api/sos?status=pending`, config);

            // Fetch missions accepted by this volunteer
            const { data: acceptedData } = await axios.get(`${ENDPOINT}/api/sos/accepted`, config);

            // Merge and deduplicate
            // Prioritize local state updates if implemented, but here we just replace
            // A more robust way is to map by ID
            const allRequests = [...acceptedData, ...pendingData];

            // Sort by creation time desc
            allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setSosRequests(allRequests);
        } catch (error) {
            console.error("Error fetching SOS", error);
        }
    };

    const handleAccept = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const { data } = await axios.put(
                `${ENDPOINT}/api/sos/${id}/accept`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Update local state
            setSosRequests(prev => prev.map(req =>
                req._id === id ? { ...req, status: 'accepted', acceptedBy: user._id } : req
            ));

            alert("You have accepted this request! Proceed to the location.");
        } catch (error) {
            console.error("Error accepting request", error);
            alert("Failed to accept request or it's already taken.");
        }
    };

    const handleSOS = async (type) => {
        if (!myLocation) {
            alert("Fetching location... please wait");
            return;
        }

        try {
            setSosActive(true);
            const token = JSON.parse(localStorage.getItem('userInfo')).token;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                `${ENDPOINT}/api/sos`,
                {
                    emergencyType: type || 'medical',
                    latitude: myLocation.lat,
                    longitude: myLocation.lng,
                    description: `Emergency: ${type || 'General'} Help Needed!`
                },
                config
            );

            console.log("SOS Created:", data);
            setSosRequests(prev => [data, ...prev]);

        } catch (error) {
            console.error(error);
            alert("Failed to send SOS");
            setSosActive(false);
        }
    };

    // Filter requests based on tab for volunteers
    const displayedRequests = user.role === 'volunteer'
        ? sosRequests.filter(req => activeTab === 'active' ? req.status === 'pending' : req.status !== 'pending')
        : sosRequests; // Users see all their history

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-gray-50">
            <div className="w-full md:w-1/3 bg-white flex flex-col border-r border-gray-200 shadow-xl z-20">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {user.role === 'volunteer' ? 'Mission Control' : 'Emergency Dashboard'}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Logged in as <span className="font-medium text-gray-900">{user.name}</span>
                    </p>

                    {user.role === 'volunteer' && (
                        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg mb-2">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Active Alerts
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                My Missions
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {user.role !== 'volunteer' && (
                        <div className="flex justify-center py-6">
                            <SOSButton onTrigger={handleSOS} />
                        </div>
                    )}

                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
                            {user.role === 'volunteer'
                                ? (activeTab === 'active' ? 'Nearby Calls' : 'Accepted Missions')
                                : 'History'}
                        </h3>
                        {user.role === 'volunteer' && (
                            <button onClick={fetchSOS} className="p-2 text-gray-400 hover:text-primary transition-colors" title="Refresh">
                                <RefreshCw className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {displayedRequests.length === 0 ? (
                        <div className="text-center py-10 opacity-50">
                            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">No active alerts found.</p>
                        </div>
                    ) : (
                        displayedRequests.map(sos => (
                            <div key={sos._id} className={`
                                group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md
                                ${sos.status === 'pending' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500 opacity-75'}
                            `}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className={`
                                            px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide
                                            ${sos.emergencyType === 'medical' ? 'bg-blue-100 text-blue-700' :
                                                sos.emergencyType === 'fire' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'}
                                        `}>
                                            {sos.emergencyType}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {new Date(sos.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    {sos.status === 'accepted' && (
                                        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                            <CheckCircle className="h-3 w-3 mr-1" /> Accepted
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-800 font-medium mb-3 flex items-start">
                                    <AlertCircle className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                    {sos.description}
                                </p>

                                <div className="flex items-center text-xs text-gray-500 mb-4">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>Lat: {sos.latitude.toFixed(4)}, Lng: {sos.longitude.toFixed(4)}</span>
                                </div>

                                {user.role === 'volunteer' && (
                                    <div className="flex space-x-2 mt-3">
                                        {sos.status === 'pending' && (
                                            <button
                                                onClick={() => handleAccept(sos._id)}
                                                className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                                            >
                                                Accept Mission
                                            </button>
                                        )}
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${sos.latitude},${sos.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-none bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center justify-center"
                                            title="Get Directions"
                                        >
                                            <MapPin className="h-5 w-5" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="w-full md:w-2/3 h-full relative bg-gray-100">
                <MapView
                    userLocation={myLocation}
                    sosRequests={displayedRequests} // Only show displayed requests on map
                />
                {!myLocation && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[1000] text-white">
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col items-center">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="font-medium animate-pulse">Locating you...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
