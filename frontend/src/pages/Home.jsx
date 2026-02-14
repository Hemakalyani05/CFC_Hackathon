import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, Heart } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gradient-to-br from-primary to-rose-700 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Live Emergency Response Network
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        Help is always <br /> <span className="text-white/90">nearby.</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-rose-100 max-w-2xl mx-auto font-light">
                        Connect with verified volunteers and emergency services instantly.
                        ResQ is your hyper-local safety net.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-rose-900/20 transition-all duration-300 hover:scale-105 active:scale-95">
                            Get Started
                        </Link>
                        <Link to="/how-it-works" className="bg-primary/20 border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all duration-300">
                            How it Works
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How ResQ Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to safety. Designed for speed when every second counts.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: Shield, title: 'Request Help', text: 'Trigger an SOS alert with one tap. Your location is instantly shared.', color: 'text-primary', bg: 'bg-rose-100' },
                            { icon: Users, title: 'Community Response', text: 'Verified volunteers nearby receive the alert and respond immediately.', color: 'text-blue-600', bg: 'bg-blue-100' },
                            { icon: MapPin, title: 'Real-time Tracking', text: 'Track help as it arrives live on the map. Stay connected.', color: 'text-green-600', bg: 'bg-green-100' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`h-8 w-8 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blood Donation Section */}
            <div className="py-16 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-3xl font-bold mb-4">Need Blood Donors?</h2>
                        <p className="text-slate-300 text-lg mb-6">
                            Find blood donors of specific blood groups within your radius instantly.
                            Every second counts in an emergency.
                        </p>
                        <Link to="/dashboard" className="text-primary hover:text-red-400 font-bold flex items-center">
                            Find Donors <Heart className="ml-2 h-5 w-5 fill-current" />
                        </Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        {/* Place holder for an image or graphic */}
                        <div className="w-64 h-64 bg-slate-800 rounded-full flex items-center justify-center shadow-lg shadow-red-900/20">
                            <Heart className="h-32 w-32 text-primary animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
