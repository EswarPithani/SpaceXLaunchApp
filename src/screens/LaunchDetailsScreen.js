import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-expo-image-cache";

// LaunchDetailsScreen component displays detailed information about a SpaceX launch
const LaunchDetailsScreen = ({ route }) => {
  // Extracting launch details from navigation route parameters
  const { launch } = route.params;

  // Debugging: Log the image URL to check if it's correctly fetched
  console.log("Image URL:", launch.links.patch.small);

  // Using a placeholder image if no patch image is available for the launch
  const imageUrl = launch?.links?.patch?.small || "https://via.placeholder.com/200";

  return (
    // ScrollView allows vertical scrolling for better readability
    <ScrollView style={styles.container}>
      {/* Launch Name */}
      <Text style={styles.title}>{launch.name}</Text>

      {/* Launch Patch Image (if available) */}
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 200, height: 200 }}
        onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
      />

      {/* Launch Details */}
      <Text style={styles.detailText}>Date: {new Date(launch.date_utc).toDateString()}</Text>
      <Text style={styles.detailText}>Rocket: {launch.rocket}</Text>
      <Text style={styles.detailText}>Launch Site: {launch.launchpad}</Text>
      <Text style={styles.detailText}>Success: {launch.success ? "Yes" : "No"}</Text>
      <Text style={styles.detailText}>Details: {launch.details || "No details available"}</Text>
    </ScrollView>
  );
};

// Styles for the screen components
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center" },
  image: { width: "100%", height: 200, resizeMode: "contain", marginVertical: 10 },
  detailText: { fontSize: 16, color: "white", marginVertical: 5 },
});

export default LaunchDetailsScreen;
