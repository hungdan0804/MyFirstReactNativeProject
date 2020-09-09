import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  View,
  Text,
} from "react-native";
import colors from "../config/color";

const { width, height } = Dimensions.get("screen");

function MyMagicIngredientItem({ item, index }) {
  const inputRange = [0, 1];
  const animateItem = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animateItem, {
      toValue: 1,
      duration: 500,
      delay: 100 * index,
      useNativeDriver: true,
    }).start();
  });
  return (
    <Animated.View style={{ ...styles.cardView, opacity: animateItem }}>
      <Image style={styles.item_ingredient_thumnail} source={item.thumbnail} />
      <Text style={styles.item_ingredient_name}>
        {item.quantity + " " + item.name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: width * 0.25, //25% width screen
    height: width * 0.25,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.cardView_color,
  },
  item_ingredient_thumnail: {
    width: width * 0.25 * 0.7, //30% width screen * 70% parent width screen
    height: width * 0.25 * 0.7, // circle
    borderRadius: width * 0.25 * 0.7, //circle
  },
  item_ingredient_name: {
    fontSize: 14,
    fontFamily: "Times New Roman",
  },
});
export default MyMagicIngredientItem;
