import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ setPosition }) => {
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map, setPosition]);

    return null;
};

const MapView = ({ volunteers = [], sosRequests = [], userLocation }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (userLocation) {
            setPosition(userLocation);
        }
    }, [userLocation]);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {!userLocation && <LocationMarker setPosition={setPosition} />}

            {position && (
                <Marker position={position}>
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {sosRequests.map(sos => (
                <Marker key={sos._id} position={[sos.latitude, sos.longitude]}>
                    <Popup>
                        <div className="text-red-600 font-bold mb-1">SOS: {sos.emergencyType}</div>
                        <p className="text-sm mb-2">{sos.description}</p>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${sos.latitude},${sos.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 inline-block"
                        >
                            Get Directions
                        </a>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
