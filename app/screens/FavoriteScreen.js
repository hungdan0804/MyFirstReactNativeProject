import React, { useState, useCallback } from "react";
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
import MyMagicFavoriteItem from "../component/MyMagicFavoriteItem";

const { width, height } = Dimensions.get("screen");
const DATA = [
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
];

function FavoriteScreen({ navigation }) {
  const [data, setData] = useState(DATA);

  const handleOnItemClick = useCallback((item, index) => {
    navigation.navigate("Item", { item: item, index: index });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.circle}></View>
        <Text style={styles.logo}>{string.tab_bar_Favorite}</Text>
      </View>
      <View style={styles.mainContentContainer}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => {
            return (
              <MyMagicFavoriteItem
                item={item}
                index={index}
                onItemClick={handleOnItemClick}
              />
            ); //animation each item
          }}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: StatusBar.currentHeight,
  },
  headerContainer: {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
  },
  mainContentContainer: {
    flex: 11,
  },
  circle: {
    position: "absolute",
    width: width * 0.4, //40% width screen
    height: width * 0.24, //23% width screen
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    transform: [{ scaleX: 2 }],
    backgroundColor: "red",
  },
  logo: {
    height: width * 0.1,
    color: "white",
    fontSize: 30,
    fontFamily: "Times New Roman",
    marginTop: width * 0.07,
  },
});

export default FavoriteScreen;
