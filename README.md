# TwoDuoPair

TwoDuoPair is a web application that helps two individuals find an ideal meeting location based on their preferences and geographical feasibility. Whether it's catching up with a friend, meeting a colleague halfway, or planning a casual hangout, TwoDuoPair takes the hassle out of choosing the perfect spot.

![Landing Page](https://imgur.com/Y97RoWR.png)

## 🚀 Features

### 🗺️ Precise Map Integration
View and select accurate locations through an interactive map interface.

### 🔍 Dynamic Location Search
Enjoy real-time autocomplete for addresses and locations, simplifying the process of pinpointing user entries.

![Dynamic Location Search](https://imgur.com/4idqid1.png)

### 👫 Midpoint Finder
Automatically suggests optimal venues that are equidistant from both users, ensuring fairness and convenience.

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

## 🎯 Use Case

Meeting a friend or colleague but unsure where to go? TwoDuoPair helps you:

- Choose neutral and fair meeting points.  
- Cut down the time spent planning.  
- Make spontaneous meetups more efficient and fun.  

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
