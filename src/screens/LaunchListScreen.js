import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Image 
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetch SpaceX launch data from API
const fetchLaunches = async () => {
  const response = await axios.get("https://api.spacexdata.com/v4/launches");
  return response.data;
};

const LaunchListScreen = () => {
  const navigation = useNavigation(); 

  // Fetching launch data using React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // State variables
  const [filter, setFilter] = useState("all");
  const [year, setYear] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  // Load favorites from AsyncStorage when component mounts
  useEffect(() => {
    loadFavorites();
  }, []);

  // Function to load favorites
  const loadFavorites = async () => {
    try {
      const storedFavs = await AsyncStorage.getItem("favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async (launch) => {
    let updatedFavorites = [...favorites];

    if (favorites.some(fav => fav.id === launch.id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== launch.id);
    } else {
      // Add to favorites
      updatedFavorites.push(launch);
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Show loading screen with an image
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Image 
          source={require("../../assets/icon.png")}  // Fixed path
          style={styles.loaderImage}
        />
      </View>
    );
  }

  // Show error message if data fetching fails
  if (error) return <Text style={styles.error}>Error fetching data</Text>;

  // Filtering launches based on search, year, and type
  const filteredLaunches = data?.filter((launch) => {
    if (search && !launch.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (year && new Date(launch.date_utc).getFullYear().toString() !== year) return false;
    if (filter === "upcoming") return launch.upcoming;
    if (filter === "past") return !launch.upcoming;
    return true;  // Default (All)
  }) || [];  // Ensure `filteredLaunches` is always an array

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 SpaceX Launches</Text>

      {/* Search and Year Filters */}
      <TextInput placeholder="Search Launches" style={styles.input} onChangeText={setSearch} />
      <TextInput placeholder="Filter by Year" style={styles.input} onChangeText={setYear} keyboardType="numeric" />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["all", "past", "upcoming"].map((type) => (
          <TouchableOpacity 
            key={type} 
            onPress={() => setFilter(type)} 
            style={[styles.filterButton, filter === type && styles.activeFilter]}
          >
            <Text style={styles.filterText}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List of Launches */}
      <FlatList
        data={filteredLaunches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.launchItem} 
            onPress={() => navigation.navigate("LaunchDetails", { launch: item })}
          >
            <Text style={styles.launchName}>{item.name}</Text>
            <Text style={{ color: "lightgray" }}>{new Date(item.date_utc).toDateString()}</Text>

            {/* Favorite Toggle Button */}
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={styles.favoriteText}>
                {favorites.some(fav => fav.id === item.id) ? "⭐ Unfavorite" : "☆ Favorite"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles for UI components
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loaderImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  input: { 
    backgroundColor: "white", 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5, 
    color: "black"
  },
  filterContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  filterButton: { 
    marginHorizontal: 10, 
    padding: 10, 
    backgroundColor: "#333", 
    borderRadius: 5 
  },
  activeFilter: { backgroundColor: "green" },
  filterText: { color: "white", fontWeight: "bold" },
  launchItem: { padding: 15, marginVertical: 5, backgroundColor: "#222", borderRadius: 5 },
  launchName: { fontSize: 18, fontWeight: "bold", color: "white" },
  favoriteText: { color: "orange", marginTop: 5 },
});

export default LaunchListScreen;
