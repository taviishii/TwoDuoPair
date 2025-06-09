import axios from 'axios';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

export const getPlaceDetails = async (lat, lng, name) => {
    try {
        // First, search for the place
        const searchResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&name=${encodeURIComponent(name)}&key=${GOOGLE_API_KEY}`
        );

        if (searchResponse.data.results && searchResponse.data.results.length > 0) {
            const placeId = searchResponse.data.results[0].place_id;
            
            // Then get detailed information
            const detailsResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=price_level,rating,user_ratings_total,formatted_phone_number&key=${GOOGLE_API_KEY}`
            );

            if (detailsResponse.data.result) {
                return {
                    priceLevel: detailsResponse.data.result.price_level,
                    rating: detailsResponse.data.result.rating,
                    totalRatings: detailsResponse.data.result.user_ratings_total,
                    phone: detailsResponse.data.result.formatted_phone_number
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching place details:', error);
        return null;
    }
};

export const getPriceText = (priceLevel) => {
    switch (priceLevel) {
        case 0:
            return 'Free';
        case 1:
            return 'Inexpensive';
        case 2:
            return 'Moderate';
        case 3:
            return 'Expensive';
        case 4:
            return 'Very Expensive';
        default:
            return 'Price not available';
    }
}; 