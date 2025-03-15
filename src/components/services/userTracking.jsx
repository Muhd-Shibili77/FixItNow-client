import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/AxiosInstance';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const libraries = ["places", "directions"];

const UserTracking = ({ bookingId }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [workerLocation, setWorkerLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [directionsError, setDirectionsError] = useState(null);
    
    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAuvEolnkHLcfRMZhIdFyGKYZ2J-1_-rGo",
        libraries
    });
    
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
    
    // Calculate directions when both locations are available
    useEffect(() => {
        if (!isLoaded || !userLocation || !workerLocation) return;
        
        try {
            // Make sure the DirectionsService is created after the API is loaded
            const directionsService = new window.google.maps.DirectionsService();
            
            directionsService.route(
                {
                    origin: new window.google.maps.LatLng(workerLocation.lat, workerLocation.lng),
                    destination: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        setDirectionsError(null);
                    } else {
                        console.error("Directions request failed due to", status);
                        setDirectionsError(`Directions request failed: ${status}`);
                    }
                }
            );
        } catch (error) {
            console.error("Error creating directions:", error);
            setDirectionsError(`Error creating directions: ${error.message}`);
        }
    }, [isLoaded, userLocation, workerLocation]);
    
    if (loadError) {
        return <div>Error loading maps: {loadError.message}</div>;
    }
    
    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }
    
    return (
        <div className="relative">
            {userLocation && workerLocation ? (
                <GoogleMap 
                    center={workerLocation} 
                    zoom={15} 
                    mapContainerStyle={{ width: "100%", height: "729px" }}
                    options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true
                    }}
                >
                    {/* User marker */}
                    <Marker 
                        position={userLocation} 
                        label={{
                            text: "User",
                            color: "white",
                            fontWeight: "bold"
                        }}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                    />
                    
                    {/* Worker marker */}
                    <Marker 
                        position={workerLocation} 
                        label={{
                            text: "Worker",
                            color: "white",
                            fontWeight: "bold"
                        }}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }}
                    />
                    
                    {/* Directions */}
                    {directions && (
                        <DirectionsRenderer 
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: "#1a73e8",
                                    strokeWeight: 5
                                }
                            }}
                        />
                    )}
                </GoogleMap>
            ) : (
                <div className="flex items-center justify-center h-729px">
                    <p className="text-lg font-medium">Loading location data...</p>
                </div>
            )}
            
            {directionsError && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{directionsError}</p>
                </div>
            )}
            
            {userLocation && workerLocation && (
                <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg mb-2">Live Tracking</h3>
                    {directions?.routes[0]?.legs[0]?.distance && (
                        <p className="mt-1">
                            <span className="font-semibold">Distance:</span> {directions.routes[0].legs[0].distance.text}
                        </p>
                    )}
                    {directions?.routes[0]?.legs[0]?.duration && (
                        <p className="mt-1">
                            <span className="font-semibold">ETA:</span> {directions.routes[0].legs[0].duration.text}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserTracking;