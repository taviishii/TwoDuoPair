import React, { useState } from 'react';

// Haversine formula to calculate the distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLng / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const App = () => {
  const [location1, setLocation1] = useState({ lat: '', lng: '' });
  const [location2, setLocation2] = useState({ lat: '', lng: '' });
  const [places, setPlaces] = useState([]);

  // Calculate the midpoint between the two locations
  const calculateMidpoint = () => {
    if (location1.lat && location1.lng && location2.lat && location2.lng) {
      return {
        lat: (location1.lat + location2.lat) / 2,
        lng: (location1.lng + location2.lng) / 2,
      };
    }
    return null;
  };

  // Function to fetch nearby places using Overpass API
  const fetchPlaces = async (query) => {
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const placesList = data.elements.map((place) => ({
        name: place.tags.name || "Unnamed",
        lat: place.lat,
        lon: place.lon,
        type: place.tags.amenity,
      }));
      setPlaces((prev) => [...prev, ...placesList]);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSearch = () => {
    const midpoint = calculateMidpoint();
    const distance = calculateDistance(location1.lat, location1.lng, location2.lat, location2.lng);

    if (distance && midpoint) {
      setPlaces([]); // Clear previous places
      let query1 = '', query2 = '', queryMid = '';

      if (distance < 50) {
        // Search within 50 km from both locations and the midpoint
        query1 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:50000,${location1.lat},${location1.lng});out;`;
        query2 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:50000,${location2.lat},${location2.lng});out;`;
        queryMid = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:50000,${midpoint.lat},${midpoint.lng});out;`;
      } else if (distance === 100) {
        // Search within 100 km from both locations
        query1 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:100000,${location1.lat},${location1.lng});out;`;
        query2 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:100000,${location2.lat},${location2.lng});out;`;
      } else if (distance > 100) {
        // Search within 100 km from both locations and within 20 km of the midpoint
        query1 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:100000,${location1.lat},${location1.lng});out;`;
        query2 = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:100000,${location2.lat},${location2.lng});out;`;

        if (calculateDistance(location1.lat, location1.lng, midpoint.lat, midpoint.lng) > 100) {
          queryMid = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:20000,${midpoint.lat},${midpoint.lng});out;`;
        } else {
          queryMid = `[out:json];node["amenity"~"cafe|restaurant|hotel"](around:100000,${midpoint.lat},${midpoint.lng});out;`;
        }
      }

      // Fetch places based on the queries
      if (query1) fetchPlaces(query1);
      if (query2) fetchPlaces(query2);
      if (queryMid) fetchPlaces(queryMid);
    } else {
      alert("Please enter valid coordinates for both locations.");
    }
  };

  const handleLocationChange = (e, setLocation) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);

    if (name === 'lat' && (parsedValue < -90 || parsedValue > 90)) {
      alert('Please enter a valid latitude between -90 and 90.');
      return;
    }
    if (name === 'lng' && (parsedValue < -180 || parsedValue > 180)) {
      alert('Please enter a valid longitude between -180 and 180.');
      return;
    }

    setLocation(prev => ({
      ...prev,
      [name]: isNaN(parsedValue) ? 0 : parsedValue,
    }));
  };

  return (
    <div>
      <h1>Find Cafes, Hotels, Restaurants Between Two Locations</h1>

      {/* Inputs for Location 1 */}
      <h2>Location 1</h2>
      <input
        type="number"
        name="lat"
        placeholder="Latitude"
        value={location1.lat}
        onChange={(e) => handleLocationChange(e, setLocation1)}
      />
      <input
        type="number"
        name="lng"
        placeholder="Longitude"
        value={location1.lng}
        onChange={(e) => handleLocationChange(e, setLocation1)}
      />

      {/* Inputs for Location 2 */}
      <h2>Location 2</h2>
      <input
        type="number"
        name="lat"
        placeholder="Latitude"
        value={location2.lat}
        onChange={(e) => handleLocationChange(e, setLocation2)}
      />
      <input
        type="number"
        name="lng"
        placeholder="Longitude"
        value={location2.lng}
        onChange={(e) => handleLocationChange(e, setLocation2)}
      />

      {/* Button to Trigger Search */}
      <button onClick={handleSearch}>Search Nearby Places</button>

      {/* Display Results */}
      <h2>Nearby Places</h2>
      <ul>
        {places.length > 0 ? (
          places.map((place, index) => (
            <li key={index}>
              {place.name} - {place.type} (Lat: {place.lat}, Lon: {place.lon})
            </li>
          ))
        ) : (
          <li>No places found</li>
        )}
      </ul>
    </div>
  );
};

export default App;
