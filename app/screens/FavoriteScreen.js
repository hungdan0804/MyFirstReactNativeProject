import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "../config/color";
import string from "../config/string";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const DATA = [
  {
    name: "Chorizo & mozzarella gnocchi bake",
    thumbnail: require("../assets/item_1.png"),
    description:
      "Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella for a comforting bake that makes an excellent midweek meal",
    isFav: false,
  },
  {
    name: "Easy huevos rancheros",
    thumbnail: require("../assets/item_2.png"),
    description:
      "An easy Mexican breakfast that'll keep you going all morning, it's got everything you need to pep up your plate",
    isFav: false,
  },
  {
    name: "Vegetarian chilli",
    thumbnail: require("../assets/item_3.png"),
    description:
      "The easiest chilli you'll ever make, with ready-to-eat grains, kidney beans in chilli sauce and summer veggies - it's 4 of your 5-a-day too!",
  },
];

function FavoriteScreen(props) {
  const [data, setData] = useState(DATA);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.circle}>
          <Text style={styles.logo}>{string.tab_bar_Favorite}</Text>
        </View>
      </View>
      <View style={styles.mainContentContainer}>
        <FlatList />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    top: StatusBar.currentHeight,
  },
  headerContainer: {
    flex: 3,
  },
  mainContentContainer: {
    flex: 11,
  },
  circle: {
    width: (width * 2) / 3, //66.6% width screen
    height: height / 8, //12.5% height screen
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    backgroundColor: "red",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    color: "white",
    fontSize: 30,
    fontFamily: "Times New Roman",
  },
});

export default FavoriteScreen;
