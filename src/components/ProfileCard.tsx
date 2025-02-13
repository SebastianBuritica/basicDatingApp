import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Profile } from "../hooks/useProfiles";

interface ProfileCardProps {
  profile: Profile;
}

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth - 20; // Account for container padding

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.location}>
          {profile.location.city}, {profile.location.country}
        </Text>
        <Text style={styles.distance}>{profile.distance} miles away</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  bio: {
    fontSize: 16,
    marginTop: 10,
    color: "#444",
  },
});
