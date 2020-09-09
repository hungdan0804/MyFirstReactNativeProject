import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, Image, Animated, Easing } from "react-native";
import colors from "../config/color";

const { width, height } = Dimensions.get("screen");

function MyMagicHistoryItem({ item, index }) {
  const inputRange = [0, 1];
  const animateItem = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animateItem, {
      toValue: 1,
      duration: 300,
      delay: index * 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const opacity = animateItem.interpolate({
    inputRange,
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      index={index}
      style={{
        ...styles.cardView,
        opacity,
      }}
    >
      <Image style={styles.item_history_thumnail} source={item.thumbnail} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: width * 0.25, //30% width screen
    height: width * 0.25,
    backgroundColor: colors.cardView_color,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  item_history_thumnail: {
    width: width * 0.25 * 0.9, //30% width screen * 90% parent width screen
    height: width * 0.25 * 0.9, // circle
    borderRadius: width * 0.25 * 0.9, //circle
  },
});
export default MyMagicHistoryItem;
