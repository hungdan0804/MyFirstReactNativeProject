import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  View,
  Text,
} from "react-native";
import colors from "../config/color";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

function MyMagicCategoryItem({ item, index, onItemClick }) {
  const inputRange = [0, 1];
  const animateItem = useRef(new Animated.Value(0)).current;

  const handleItemClick = useCallback((item, index) => {
    onItemClick(item, index);
  }, []);

  useEffect(() => {
    Animated.timing(animateItem, {
      toValue: 1,
      duration: 500,
      delay: 100 * index,
      useNativeDriver: true,
    }).start();
  });
  return (
    <TouchableWithoutFeedback onPress={() => handleItemClick(item, index)}>
      <Animated.View style={{ ...styles.cardView, opacity: animateItem }}>
        <Image style={styles.item_category_thumnail} source={item.thumbnail} />
        <Text style={styles.item_category_name}>{item.title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: width * 0.25, //25% width screen
    height: width * 0.25,
    backgroundColor: colors.cardView_color,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  item_category_thumnail: {
    width: width * 0.25 * 0.7, //25% width screen * 70% parent width screen
    height: width * 0.25 * 0.7, // circle
    borderRadius: width * 0.25 * 0.7, //circle
  },
  item_category_name: {
    fontSize: 14,
    fontFamily: "Times New Roman",
    color: colors.white,
  },
});
export default MyMagicCategoryItem;
