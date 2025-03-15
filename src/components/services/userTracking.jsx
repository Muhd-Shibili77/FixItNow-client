import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import axiosInstance from '../../services/AxiosInstance';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L,{divIcon } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { FaPlay, FaMapMarkerAlt } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const workerIcon = divIcon({
    className: 'custom-marker',
    html: renderToString(<FaPlay style={{ color: 'blue', fontSize: '24px' }} />),
    iconSize: [30, 30]
  });
  
  
  const userIcon = divIcon({
    className: 'custom-marker',
    html: renderToString(<FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />),
    iconSize: [30, 30]
  });


const UserTracking = ({ bookingId }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [workerLocation, setWorkerLocation] = useState(null);
    const [routeData, setRouteData] = useState(null);
    

    
    
    // Fetch user location from API
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const { data } = await axiosInstance.get(`/user/userLocation?bookingId=${bookingId}`);
                setUserLocation({
                    lat: Number(data.userLocation.latitude),
                    lng: Number(data.userLocation.longitude)
                });
            } catch (error) {
                console.error("Error fetching user location:", error);
            }
        };
        fetchUserLocation();
    }, [bookingId]);
    
    // Watch worker's current location
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }
        
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const workerCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setWorkerLocation(workerCoords);
            },
            (error) => {
                console.error("Error getting location:", error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);
    
    useEffect(()=>{
        if (!userLocation || !workerLocation) return;
        const fetchRoute = async ()=>{
            try {
             
                const response = await fetch(
                  `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b117f7b469ad43dbb02b4dad888038f3&start=${workerLocation.lng},${workerLocation.lat}&end=${userLocation.lng},${userLocation.lat}`
                );
                const data = await response.json();
                setRouteData(data);
              } catch (error) {
                console.error("Error fetching route:", error);
              }
        }

    fetchRoute();
    },[userLocation,workerLocation])

    if (!userLocation || !workerLocation) {
        return <div>Loading location data...</div>;
      }
   
    
    return (
       <MapContainer center={workerLocation} zoom={13} style={{ height: '729px', width: '100%' }}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userLocation} icon={userIcon}> 
            <Popup>user location</Popup>
        </Marker>
        <Marker position={workerLocation} icon={workerIcon}> 
            <Popup>worker location</Popup>
        </Marker>
        {routeData && routeData.features  && routeData.features[0] && (
            <Polyline 
                positions={routeData.features[0].geometry.coordinates.map(coord => [coord[1],coord[0]])}
                color="blue"
                weight={5}
                opacity={0.7}
            />
        )}

       </MapContainer>
    );
};

export default UserTracking;