import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import colors from "../config/color";
import string from "../config/string";
import { FlatList } from "react-native-gesture-handler";
import color from "../config/color";
import MyOverflowNameItems from "../component/MyOverflowNameItems";
import MyOverflowDescriptions from "../component/MyOverflowDescriptions";
import MyOverflowChart from "../component/MyOverflowChart";

const { width, height } = Dimensions.get("screen");
const OVERFLOW_HEIGHT = height * 0.1;
const OVERFLOW_WIDTH = width * 0.7;
const ITEM_SIZE = width * 0.6;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const DATA = [
  { name: "left-spacer" },
  {
    name: "Chorizo & mozzarella gnocchi bake",
    thumbnail: require("../assets/item_1.png"),
    description:
      "Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal",
    isFav: false,
    time: 30,
    energy: 318,
    fat: "13g",
  },
  {
    name: "Easy huevos rancheros",
    thumbnail: require("../assets/item_2.png"),
    description:
      "An easy Mexican breakfast that'll keep you going all morning, it's got everything you need to pep up your plate",
    isFav: false,
    time: 40,
    energy: 218,
    fat: "16g",
  },
  {
    name: "Vegetarian chilli",
    thumbnail: require("../assets/item_3.png"),
    description:
      "The easiest chilli you'll ever make, with ready-to-eat grains, kidney beans in chilli sauce and summer veggies - it's 4 of your 5-a-day too!",
    time: 20,
    energy: 373,
    fat: "9g",
  },
  {
    name: "Chorizo & mozzarella gnocchi bake",
    thumbnail: require("../assets/item_1.png"),
    description:
      "Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal",
    isFav: false,
    time: 30,
    energy: 318,
    fat: "13g",
  },
  {
    name: "Easy huevos rancheros",
    thumbnail: require("../assets/item_2.png"),
    description:
      "An easy Mexican breakfast that'll keep you going all morning, it's got everything you need to pep up your plate",
    isFav: false,
    time: 40,
    energy: 218,
    fat: "16g",
  },
  {
    name: "Vegetarian chilli",
    thumbnail: require("../assets/item_3.png"),
    description:
      "The easiest chilli you'll ever make, with ready-to-eat grains, kidney beans in chilli sauce and summer veggies - it's 4 of your 5-a-day too!",
    time: 20,
    energy: 373,
    fat: "9g",
  },

  { name: "right-spacer" },
];

function CategoryScreen({ route, navigation }) {
  const [data, setData] = useState(DATA);
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const renderItem = ({ item, index }) => {
    if (!item.thumbnail) {
      return <View style={{ width: SPACER_ITEM_SIZE }}></View>;
    }
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
    const translateY = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [-height * 0.05, 0, -height * 0.05],
    });
    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
    });

    return (
      <Animated.View
        style={{
          ...styles.cardContainer,
          transform: [{ translateY }, { scale }],
          opacity,
        }}
      >
        <Image style={styles.item_thumbnail} source={item.thumbnail} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.circle} />
        <MyOverflowNameItems data={data} scrollXAnimated={scrollXAnimated} />
        <View>
          <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderItem}
            snapToInterval={ITEM_SIZE}
            decelerationRate={0}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { x: scrollXAnimated } },
                },
              ],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{
              height: height * 0.28,
            }}
          />
        </View>
        <MyOverflowDescriptions data={data} scrollXAnimated={scrollXAnimated} />
      </View>
      <View style={styles.sumaryContainer}>
        <MyOverflowChart data={data} scrollXAnimated={scrollXAnimated} />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.buttonText}>{string.btn_see_recipe}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    width: width,
    height: height * 0.5,
  },
  circle: {
    position: "absolute",
    width: width * 0.55, // 55% width screen
    height: width * 0.55, // circle
    borderBottomStartRadius: 180,
    borderBottomEndRadius: 180,
    transform: [{ scaleX: 2 }], // epclipse
    backgroundColor: colors.primary,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  item_thumbnail: {
    width: height * 0.23, // 25% height screen
    height: height * 0.23, // circle
    borderRadius: height * 0.23, //circle
  },

  cardContainer: {
    height: height * 0.23,
    width: ITEM_SIZE,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  sumaryContainer: {
    width: width,
    height: (height * 3) / 16,
    overflow: "hidden",
    padding: 20,
    alignItems: "center",
  },

  chartContainer: {
    flexDirection: "row",
  },
  footerContainer: {
    width: width,
    height: (height * 3) / 16,
    alignItems: "center",

    justifyContent: "center",
  },
  moreButton: {
    width: width * 0.6,
    height: height * 0.08,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cardView_color,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default CategoryScreen;
