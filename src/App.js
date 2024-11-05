import React, { useState } from 'react';

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

  // Fetch nearby cafes, restaurants, and hotels using Overpass API
  const fetchPlaces = async (midpoint) => {
    if (midpoint) {
      const query = `
        [out:json];
        node
          ["amenity"~"cafe|restaurant|hotel"]
          (around:5000,${midpoint.lat},${midpoint.lng});
        out;
      `;
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
        setPlaces(placesList);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      }
    } else {
      alert("Please enter valid coordinates for both locations.");
    }
  };

  const handleSearch = () => {
    const midpoint = calculateMidpoint();
    if (midpoint) {
      fetchPlaces(midpoint);
    }
  };

  const handleLocationChange = (e, setLocation) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: parseFloat(value),
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
