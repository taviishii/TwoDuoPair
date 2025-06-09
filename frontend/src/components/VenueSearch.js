import React, { useState } from 'react';
import { geocodeAddress } from '../services/geocodeService';
import { getPlaceDetails, getPriceText } from '../services/placesService';
import './VenueSearch.css';

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
        query = `[out:json];node["tourism"="hotel"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'bar':
        query = `[out:json];node["amenity"="bar"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'club':
        query = `[out:json];node["amenity"="nightclub"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'park':
        query = `[out:json];(node["leisure"="park"];way["leisure"="park"];)(around:5000,${midpoint.lat},${midpoint.lng});out center;`;
        break;
      case 'museum':
        query = `[out:json];node["tourism"="museum"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'mall':
        query = `[out:json];node["shop"="mall"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      case 'cinema':
        query = `[out:json];node["amenity"="cinema"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
        break;
      default:
        query = `[out:json];node["amenity"~"${placeType}"](around:5000,${midpoint.lat},${midpoint.lng});out;`;
    }

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Fetch place details for each location
    const placesWithDetails = await Promise.all(
      data.elements.map(async (place) => {
        const details = await getPlaceDetails(place.lat, place.lon, place.tags.name);
        return {
          name: place.tags.name || "Unnamed",
          lat: place.lat,
          lon: place.lon,
          type: place.tags.amenity || place.tags.tourism || place.tags.leisure || place.tags.shop || placeType,
          priceLevel: details?.priceLevel,
          rating: details?.rating,
          totalRatings: details?.totalRatings,
          phone: details?.phone
        };
      })
    );
    
    return placesWithDetails;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSortBy('none');

    try {
      // Convert addresses to coordinates
      const location1 = await geocodeAddress(address1);
      const location2 = await geocodeAddress(address2);

      if (!location1 || !location2) {
        setError("Could not find coordinates for one or both addresses.");
        setLoading(false);
        return;
      }

      setLocation1Coords(location1);
      setLocation2Coords(location2);

      // Calculate midpoint
      const midpoint = calculateMidpoint(location1, location2);

      // Fetch places near midpoint
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
      <nav className="main-nav">
        <h1>Two Duo Pair</h1>
      </nav>
      
      <div className="content">
        <h1>Find Places Between Two Locations</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="address1">First Address:</label>
            <input
              id="address1"
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Enter first address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address2">Second Address:</label>
            <input
              id="address2"
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Enter second address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="placeType">Place Type:</label>
            <select
              id="placeType"
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
            >
              <option value="cafe">Cafes</option>
              <option value="restaurant">Restaurants</option>
              <option value="hotel">Hotels</option>
              <option value="bar">Bars</option>
              <option value="club">Nightclubs</option>
              <option value="park">Parks</option>
              <option value="museum">Museums</option>
              <option value="mall">Shopping Malls</option>
              <option value="cinema">Movie Theaters</option>
            </select>
          </div>

          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search Places'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {places.length > 0 && (
          <div className="results">
            <div className="results-header">
              <h2>Found Places</h2>
              <div className="sort-controls">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value, sortReference)}
                >
                  <option value="none">No Sorting</option>
                  <option value="nearest">Nearest First</option>
                  <option value="farthest">Farthest First</option>
                </select>
                {sortBy !== 'none' && (
                  <select
                    value={sortReference}
                    onChange={(e) => handleSort(sortBy, e.target.value)}
                  >
                    <option value="address1">Distance from {address1}</option>
                    <option value="address2">Distance from {address2}</option>
                  </select>
                )}
              </div>
            </div>

            <ul>
              {sortedPlaces.map((place, index) => {
                const distance = sortBy !== 'none' ? calculateDistance(
                  place.lat, place.lon,
                  sortReference === 'address1' ? location1Coords.lat : location2Coords.lat,
                  sortReference === 'address1' ? location1Coords.lon : location2Coords.lon
                ) : null;

                return (
                  <li key={index}>
                    <div className="place-name">{place.name}</div>
                    <div className="place-type">{place.type}</div>
                    {distance && (
                      <div className="place-distance">
                        {distance.toFixed(2)} km from {sortReference === 'address1' ? 'first' : 'second'} location
                      </div>
                    )}
                    <div className="place-details">
                      {place.priceLevel !== undefined && (
                        <div className="price-level">
                          <span className="label">Price:</span> {getPriceText(place.priceLevel)}
                        </div>
                      )}
                      {place.rating && (
                        <div className="rating">
                          <span className="label">Rating:</span> {place.rating.toFixed(1)} ⭐ ({place.totalRatings} reviews)
                        </div>
                      )}
                      {place.phone && (
                        <div className="phone">
                          <span className="label">Phone:</span> {place.phone}
                        </div>
                      )}
                    </div>
                    <div className="coordinates">
                      ({place.lat.toFixed(4)}, {place.lon.toFixed(4)})
                    </div>
                    <a 
                      href={`https://www.google.com/maps?q=${place.lat},${place.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="maps-link"
                    >
                      View on Google Maps
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueSearch; 