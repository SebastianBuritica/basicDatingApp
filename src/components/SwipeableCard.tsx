import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, Dimensions } from "react-native";
import { ProfileCard } from "./ProfileCard";
import { Profile } from "../hooks/useProfiles";

interface SwipeableCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  profile,
  onSwipe,
}) => {
  const position = useRef(new Animated.ValueXY()).current;

  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ["-30deg", "0deg", "30deg"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipe = (direction: "left" | "right") => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      // Make sure this callback is being called
      console.log("Animation completed");
      onSwipe(direction);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const getCardStyle = () => {
    return {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate: rotation },
      ],
    };
  };

  return (
    <Animated.View
      style={[styles.container, getCardStyle()]}
      {...panResponder.panHandlers}
    >
      <ProfileCard profile={profile} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    padding: 10,
  },
});
