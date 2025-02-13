import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
import { SwipeableCard } from "../components/SwipeableCard";
import { useProfiles } from "../hooks/useProfiles";

export const HomeScreen = () => {
  const { profiles, loading, error, refetch } = useProfiles(10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      console.log("Swiped:", direction);
      console.log("Current index before:", currentIndex);

      if (direction === "right") {
        if (Math.random() < 0.2) {
          console.log("It's a match!");
        }
      }

      setCurrentIndex((prev) => {
        console.log("Setting index to:", prev + 1);
        return prev + 1;
      });
    },
    [currentIndex],
  ); // Add currentIndex to dependencies

  console.log(
    "Rendering HomeScreen. CurrentIndex:",
    currentIndex,
    "Profiles length:",
    profiles.length,
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No more profiles!</Text>
          <Text
            style={styles.refreshButton}
            onPress={() => {
              setCurrentIndex(0);
              refetch();
            }}
          >
            Refresh to see more
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentProfile = profiles[currentIndex];
  console.log("Current profile:", currentProfile);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {currentProfile && (
          <SwipeableCard
            key={currentProfile.id} // Add key to force re-render
            profile={currentProfile}
            onSwipe={handleSwipe}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  refreshButton: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
