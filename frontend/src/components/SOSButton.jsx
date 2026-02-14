import { useState } from 'react';
import { AlertTriangle, Flame, Stethoscope, Shield, Car, X } from 'lucide-react';

const SOSButton = ({ onTrigger }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const emergencyTypes = [
        { type: 'medical', label: 'Medical', icon: Stethoscope, color: 'bg-red-500' }, // Red for generic medical
        { type: 'safety', label: 'Safety Threat', icon: Shield, color: 'bg-indigo-600' }, // Indigo for harassment/safety
        { type: 'accident', label: 'Accident', icon: Car, color: 'bg-orange-500' }, // Orange for accident
        { type: 'breakdown', label: 'Breakdown', icon: AlertTriangle, color: 'bg-slate-700' }, // Slate for vehicle
    ];

    const handleInitialClick = () => {
        setShowModal(true);
    };

    const handleConfirm = (type) => {
        setSelectedType(type);
        onTrigger(type); // Pass the selected type to the parent
        setShowModal(false);
        setSelectedType(null);
    };

    return (
        <>
            <button
                onClick={handleInitialClick}
                className={`
          relative overflow-hidden rounded-full w-48 h-48 flex flex-col items-center justify-center
          transition-all duration-300 shadow-xl border-4
          bg-red-600 hover:bg-red-700 border-red-500 shadow-red-900/30
        `}
            >
                <div className={`absolute inset-0 bg-red-400 opacity-0 rounded-full animate-pulse`}></div>

                <AlertTriangle className="h-16 w-16 text-white mb-2" />
                <span className="text-2xl font-black text-white tracking-wider">SOS</span>
                <span className="text-xs text-red-100 mt-1 font-medium">PRESS FOR HELP</span>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">What's the Emergency?</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {emergencyTypes.map((em) => (
                                <button
                                    key={em.type}
                                    onClick={() => handleConfirm(em.type)}
                                    className={`${em.color} text-white p-4 rounded-xl flex flex-col items-center justify-center hover:opacity-90 transition-opacity h-32`}
                                >
                                    <em.icon className="h-10 w-10 mb-2" />
                                    <span className="font-bold">{em.label}</span>
                                </button>
                            ))}
                        </div>

                        <p className="text-xs text-gray-500 mt-4 text-center">
                            Selecting a type helps responders prepare better.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default SOSButton;
