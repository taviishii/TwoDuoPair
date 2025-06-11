import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import AddressSearch from './AddressSearch';
import 'leaflet/dist/leaflet.css';
import './VenueSearch.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom markers
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const VenueSearch = () => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeType, setPlaceType] = useState('cafe');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [sortReference, setSortReference] = useState('address1');
  const [location1Coords, setLocation1Coords] = useState(null);
  const [location2Coords, setLocation2Coords] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState([25.2048, 55.2708]); // Default to Dubai
  const [mapZoom, setMapZoom] = useState(13);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate the midpoint between two sets of coordinates
  const calculateMidpoint = (loc1, loc2) => {
    return {
      lat: (parseFloat(loc1.lat) + parseFloat(loc2.lat)) / 2,
      lng: (parseFloat(loc1.lon) + parseFloat(loc2.lon)) / 2,
    };
  };

  // Sort places based on distance
  const sortPlaces = (places, referencePoint) => {
    if (sortBy === 'none') return places;

    return [...places].sort((a, b) => {
      const distanceA = calculateDistance(
        a.lat, a.lon,
        referencePoint.lat, referencePoint.lon
      );
      const distanceB = calculateDistance(
        b.lat, b.lon,
        referencePoint.lat, referencePoint.lon
      );
      return sortBy === 'nearest' ? distanceA - distanceB : distanceB - distanceA;
    });
  };

  // Fetch nearby places using Overpass API
  const fetchPlaces = async (midpoint) => {
    let query;
    switch (placeType) {
      case 'hotel':
        query = `[out:json];node["tourism"="hotel"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'bar':
        query = `[out:json];node["amenity"="bar"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'club':
        query = `[out:json];node["amenity"="nightclub"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'park':
        query = `[out:json];(node["leisure"="park"]["name"];way["leisure"="park"]["name"];)(around:5000,${midpoint.lat},${midpoint.lng});out center;`;
        break;
      case 'museum':
        query = `[out:json];node["tourism"="museum"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'mall':
        query = `[out:json];node["shop"="mall"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'cinema':
        query = `[out:json];node["amenity"="cinema"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      default:
        query = `[out:json];node["amenity"~"${placeType}"]["name"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
    }

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Filter out places without names
    const placesWithNames = data.elements.filter(place => place.tags.name);
    const placesWithDetails = placesWithNames.map(place => ({
      name: place.tags.name,
      lat: place.lat,
      lon: place.lon,
      type: place.tags.amenity || place.tags.tourism || place.tags.leisure || place.tags.shop || placeType
    }));
    
    return placesWithDetails;
  };

  const handleLocation1Select = (location) => {
    setAddress1(location.display_name);
    setLocation1Coords(location);
  };

  const handleLocation2Select = (location) => {
    setAddress2(location.display_name);
    setLocation2Coords(location);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSortBy('none');

    try {
      if (!location1Coords || !location2Coords) {
        setError("Please select both locations from the suggestions.");
        return;
      }

      const midpoint = calculateMidpoint(location1Coords, location2Coords);
      setMapCenter([midpoint.lat, midpoint.lng]);

      const placesList = await fetchPlaces(midpoint);
      setPlaces(placesList);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while searching for places.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (sortType, reference) => {
    setSortBy(sortType);
    setSortReference(reference);
  };

  // Get the sorted places
  const sortedPlaces = sortPlaces(places, sortReference === 'address1' ? location1Coords : location2Coords);

  return (
    <div className="venue-search">
      <div className="content">
        <h2>Find Places Between Two Locations</h2>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>First Address:</label>
            <AddressSearch
              onSelect={handleLocation1Select}
              placeholder="Enter first address"
            />
          </div>

          <div className="form-group">
            <label>Second Address:</label>
            <AddressSearch
              onSelect={handleLocation2Select}
              placeholder="Enter second address"
            />
          </div>

          <div className="form-group">
            <label>Place Type:</label>
            <select 
              value={placeType} 
              onChange={(e) => setPlaceType(e.target.value)}
              className="search-input"
            >
              <option value="cafe">Cafes</option>
              <option value="restaurant">Restaurants</option>
              <option value="bar">Bars</option>
              <option value="park">Parks</option>
              <option value="library">Libraries</option>
              <option value="museum">Museums</option>
              <option value="mall">Shopping Malls</option>
              <option value="cinema">Cinemas</option>
              <option value="hotel">Hotels</option>
            </select>
          </div>

          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search Places'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {places.length > 0 && (
          <div className="results">
            <div className="sort-controls">
              <label>Sort by distance from:</label>
              <select 
                value={sortReference}
                onChange={(e) => setSortReference(e.target.value)}
                className="sort-select"
              >
                <option value="address1">First Location</option>
                <option value="address2">Second Location</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value, sortReference)}
                className="sort-select"
              >
                <option value="none">No sorting</option>
                <option value="nearest">Nearest first</option>
                <option value="farthest">Farthest first</option>
              </select>
            </div>

            <div className="results-grid">
              <div className="map-container">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '600px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {location1Coords && (
                    <Marker
                      position={[location1Coords.lat, location1Coords.lon]}
                      icon={blueIcon}
                    >
                      <Popup>First Location</Popup>
                    </Marker>
                  )}
                  {location2Coords && (
                    <Marker
                      position={[location2Coords.lat, location2Coords.lon]}
                      icon={greenIcon}
                    >
                      <Popup>Second Location</Popup>
                    </Marker>
                  )}
                  {sortedPlaces.map((place, index) => (
                    <Marker
                      key={index}
                      position={[place.lat, place.lon]}
                      icon={redIcon}
                      eventHandlers={{
                        click: () => setSelectedPlace(place)
                      }}
                    >
                      <Popup>
                        <div className="popup-content">
                          <h3>{place.name}</h3>
                          <p>Type: {place.type}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="places-list">
                <h3>Found Places</h3>
                {sortedPlaces.map((place, index) => (
                  <div 
                    key={index} 
                    className={`venue-card ${selectedPlace === place ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedPlace(place);
                      setMapCenter([place.lat, place.lon]);
                      setMapZoom(16);
                    }}
                  >
                    <h4 className="venue-name">{place.name}</h4>
                    <div className="venue-details">
                      <p><strong>Type:</strong> {place.type}</p>
                      {location1Coords && (
                        <p>
                          <strong>Distance from first location:</strong>{' '}
                          {calculateDistance(
                            place.lat,
                            place.lon,
                            location1Coords.lat,
                            location1Coords.lon
                          ).toFixed(2)} km
                        </p>
                      )}
                      {location2Coords && (
                        <p>
                          <strong>Distance from second location:</strong>{' '}
                          {calculateDistance(
                            place.lat,
                            place.lon,
                            location2Coords.lat,
                            location2Coords.lon
                          ).toFixed(2)} km
                        </p>
                      )}
                      <div className="venue-actions">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="google-maps-link"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueSearch; 