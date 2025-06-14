# TwoDuoPair

TwoDuoPair is a full-stack location-based web app that helps two individuals find ideal meeting venues based on their locations and preferences. Whether it's catching up with a friend, meeting a colleague halfway, or planning a spontaneous hangout, TwoDuoPair takes the hassle out of choosing the perfect spot.

![Landing Page](https://imgur.com/Y97RoWR.png)

## 🚀 Features

### 🗺️ Precise Map Integration
View and select accurate locations through an interactive map interface.

### 🔍 Dynamic Location Search
Enjoy real-time autocomplete for addresses and locations, simplifying the process of pinpointing user entries.

![Dynamic Location Search](https://imgur.com/4idqid1.png)

### 👫 Midpoint Finder
Automatically suggests optimal venues that are equidistant from both users, ensuring fairness and convenience using the Haversine formula.

### 🌍 Explore New Places
Discover exciting new cafes, hangout spots, and venues around your midpoint.

### 🎯 Smart Filters & Directional Features
- Filter suggestions by venue type.
- Sort by distance from either user.
- Open directions to the chosen spot directly in Google Maps.

![Filtered Results with Google Maps Integration](https://imgur.com/vPmqP5w.png)

### 🕒 Save Time
No more endless discussions and back-and-forth planning—find a suitable location in minutes.

### 🤝 Avoid Disputes
Prevent the blame game and decision fatigue over where to meet with automated, fair suggestions.

---

## 🧰 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB 
- **Maps & Geolocation**: Leaflet, OpenStreetMap, Google Places API, Overpass API  
- **Geocoding Logic**: Haversine formula for midpoint calculations  
- **Features**:  
  - Dual-location input with real-time geocoding  
  - Interactive maps with custom markers & popups  
  - Category-based venue filtering  
  - Smart directions & integration with Google Maps  

---

## 🛠️ Local Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/TwoDuoPair.git
cd TwoDuoPair
```

### 2. Setup Environment Variables

Create a `.env` file inside the `/backend` directory with the following content:

```env
DATABASE_URI=mongodb+srv://username:password@cluster0.mongodb.net/twoduopair?retryWrites=true&w=majority
PORT=5000
```

### 3. Install Dependencies

#### Backend:

```bash
cd backend
npm install
npm run dev
```

#### Frontend:

```bash
cd frontend
npm install
npm start
```

---

## 👩‍💻 Built With ❤️ by

- Tavishi Sharma  
- Anchi Kansal  
- Aashka Chhabra
