import { ArrowLeft, Shield, Heart, Users, MapPin, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10"></div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 relative z-10">
                            HyperLocal Help & Emergency Connector
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto relative z-10">
                            Connecting People. Saving Lives. Building Safer Communities.
                        </p>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        {/* Intro */}
                        <section className="prose lg:prose-xl mx-auto text-gray-600">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-3xl mr-3">🌍</span> What is this App?
                            </h3>
                            <p>
                                HyperLocal Help & Emergency Connector is a community-powered emergency support platform that connects students and citizens with verified nearby volunteers within a 5–10 km radius.
                            </p>
                            <p>
                                Whether it's a medical emergency, need for blood, vehicle breakdown, or safety concern — help is just one tap away.
                                This app perfectly reflects the idea of "Code for Connection" by turning technology into real-time human support.
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Steps */}
                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Quick & Secure Registration</h3>
                                    <p className="text-gray-600 mb-4">Users can register as:</p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <li className="flex items-center bg-gray-50 p-3 rounded-lg"><Users className="h-5 w-5 text-gray-400 mr-2" /> General User (Request Help)</li>
                                        <li className="flex items-center bg-gray-50 p-3 rounded-lg"><Heart className="h-5 w-5 text-red-500 mr-2" /> First Aid Volunteer</li>
                                        <li className="flex items-center bg-gray-50 p-3 rounded-lg"><MapPin className="h-5 w-5 text-green-500 mr-2" /> Transport Helper</li>
                                        <li className="flex items-center bg-gray-50 p-3 rounded-lg"><Shield className="h-5 w-5 text-indigo-500 mr-2" /> Night Safety Volunteer</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">One-Tap Emergency SOS 🚨</h3>
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">Tap the SOS button.</span></li>
                                            <li className="flex items-start"><span className="mr-2">Your live location is shared instantly.</span></li>
                                            <li className="flex items-start"><span className="mr-2">Nearby verified volunteers within 5–10 km receive alerts.</span></li>
                                            <li className="flex items-start"><span className="mr-2">Volunteers can accept and respond immediately.</span></li>
                                        </ul>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 italic">Ensures fast and local help, reducing response time.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Blood Donor Finder 🩸</h3>
                                    <p className="text-gray-600 mb-2">Need blood urgently?</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                                        <li>Select required blood group</li>
                                        <li>View nearest available donors</li>
                                        <li>Contact them instantly through the app</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">4</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Volunteer Matching 👥</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <MapPin className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                                            <span className="text-sm font-medium">Radius Search</span>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <MapPin className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                            <span className="text-sm font-medium">Google Maps</span>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                            <Bell className="h-6 w-6 text-red-500 mx-auto mb-2" />
                                            <span className="text-sm font-medium">Real-time</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">The app automatically connects users to the closest and most relevant helpers.</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">5</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Women Safety & Safe Travel Alerts 🛡</h3>
                                    <p className="text-gray-600">Share live trip location, notify trusted volunteers nearby, and trigger emergency alerts if needed.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Why It Matters */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="text-2xl mr-2">🌟</span> Why This App Matters
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Reduces emergency response time',
                                    'Builds stronger local communities',
                                    'Encourages student volunteerism',
                                    'Saves lives through faster blood connections',
                                    'Makes campuses and neighborhoods safer'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="text-center pt-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">💙 Our Mission</h3>
                            <p className="text-xl text-gray-600 italic leading-relaxed">
                                "To create a connected, responsive, and compassionate hyperlocal network where no one feels alone during an emergency.
                                Because sometimes, the closest help is just 2 km away — you just need the right connection."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
