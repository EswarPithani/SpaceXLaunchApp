# SpaceX Launch Tracker App

## 🚀 Overview
The SpaceX Launch Tracker is a **React Native** application that provides real-time details on SpaceX launches, allowing users to explore upcoming and past launches, filter launches by year, search by name, and mark favorite launches for quick access.

---

## 📦 Setup Instructions

### Prerequisites
Ensure you have the following installed before setting up the project:
- Node.js (>= 14)
- npm or yarn
- React Native CLI
- Android Studio / Xcode (for running on emulators/simulators)

### Installation Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/spacex-launch-tracker.git
   cd spacex-launch-tracker
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the Metro bundler:**
   ```sh
   npm start
   ```

4. **Run the app on an emulator or a physical device:**
   - For Android:
     ```sh
     npm run android
     ```
   - For iOS:
     ```sh
     npm run ios
     ```

---

## ✨ Features Implemented
- Fetch and display SpaceX launch data using **React Query**.
- View detailed information about each launch.
- Search launches by name.
- Filter launches by year.
- Toggle between **upcoming** and **past** launches.
- Mark launches as **favorites** (stored using AsyncStorage).
- Smooth UI with dark mode styling.

---

## 🛠️ Technologies Used
- **React Native** - For building the mobile application.
- **React Navigation** - For handling screen transitions.
- **@tanstack/react-query** - For efficient data fetching and caching.
- **Axios** - For making API requests to SpaceX API.
- **AsyncStorage** - For local storage of favorite launches.
- **react-native-expo-image-cache** - For optimized image loading.

---

## 🚧 Challenges Faced & Solutions
### 1️⃣ Managing API Data Efficiently
- **Challenge:** Frequent API calls slowed the app and led to unnecessary re-renders.
- **Solution:** Used **React Query** to cache responses, reducing redundant network requests.

### 2️⃣ Handling Image Load Failures
- **Challenge:** Some launches had missing images, causing UI breakage.
- **Solution:** Used a fallback image (`https://via.placeholder.com/200`) if an image URL was unavailable.

### 3️⃣ Persistent Storage for Favorites
- **Challenge:** Marking launches as favorites was not persistent across app restarts.
- **Solution:** Integrated **AsyncStorage** to store and retrieve favorite launches locally.

---

## 🔮 Future Improvements
- Implement push notifications for upcoming launches.
- Add a launch countdown timer for future missions.
- Improve UI animations for a smoother user experience.
- Support offline caching for better performance in low-network conditions.
- Display detailed rocket specifications from the SpaceX API.

---

Feel free to contribute to this project by submitting pull requests or opening issues! 🚀

