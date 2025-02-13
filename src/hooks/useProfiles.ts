import { useState, useEffect } from "react";
import axios from "axios";
import { Welcome, Result } from "../types";

export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: number;
  images: string[];
  location: {
    city: string;
    country: string;
  };
}

export const useProfiles = (count: number = 10) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformUserToProfile = (user: Result): Profile => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    age: user.dob.age,
    bio: generateRandomBio(),
    distance: Math.floor(Math.random() * 20) + 1,
    images: [user.picture.large],
    location: {
      city: user.location.city,
      country: user.location.country,
    },
  });

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Welcome>(
        `https://randomuser.me/api/?results=${count}&inc=name,dob,picture,login,location`,
      );

      const formattedProfiles = response.data.results.map(
        transformUserToProfile,
      );
      setProfiles(formattedProfiles);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.name === "CanceledError") {
        return;
      }
      setError("Failed to fetch profiles");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchProfiles();
    return () => abortController.abort();
  }, [count]);

  return { profiles, loading, error, refetch: fetchProfiles };
};

const bioTemplates = [
  "Love traveling ✈️ and trying new foods 🍜",
  "Coffee addict ☕ | Dog lover 🐕",
  "Adventure seeker 🏔️ | Photography 📸",
  "Music lover 🎵 | Beach person 🏖️",
  "Foodie 🍕 | Gym enthusiast 💪",
  "Book worm 📚 | Wine lover 🍷",
  "Hiking enthusiast 🥾 | Yoga teacher 🧘‍♀️",
  "Art lover 🎨 | Plant parent 🌿",
  "Surfer 🏄‍♂️ | Chef in training 👨‍🍳",
  "Movie buff 🎬 | Coffee snob ☕",
];

const generateRandomBio = () => {
  return bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
};
