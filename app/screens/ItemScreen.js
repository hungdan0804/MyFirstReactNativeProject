import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
} from "react-native";

import colors from "../config/color";
import string from "../config/string";
import { FlatList } from "react-native-gesture-handler";
import MyMagicIngredientItem from "../component/MyMagicIngredientItem";
const { width, height } = Dimensions.get("screen");
const DATA = [
  {
    name: "Oilive Oil",
    quantity: "1",
    thumbnail: require("../assets/oil.jpg"),
  },
  {
    name: "Gralic",
    quantity: "2",
    thumbnail: require("../assets/gralic.jpg"),
  },
  {
    name: "Chorizo",
    quantity: "120g",
    thumbnail: require("../assets/chorizo.jpg"),
  },
  {
    name: "Tomato",
    quantity: "800g",
    thumbnail: require("../assets/tomato.jpg"),
  },
  {
    name: "Onion",
    quantity: "1",
    thumbnail: require("../assets/onion.jpg"),
  },
  {
    name: "Sugar",
    quantity: "1tsp",
    thumbnail: require("../assets/sugar.jpg"),
  },
  {
    name: "Sugar",
    quantity: "1tsp",
    thumbnail: require("../assets/sugar.jpg"),
  },
  {
    name: "Tomato",
    quantity: "800g",
    thumbnail: require("../assets/tomato.jpg"),
  },
];

function ItemScreen({ route, navigation }) {
  const { item } = route.params;
  const { index } = route.params;
  const [data, setData] = useState(DATA);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.circle}></View>
        <Text style={styles.item_name} numberOfLines={3}>
          {item.name}
        </Text>
        <Image style={styles.item_thumbnail} source={item.thumbnail} />
        <Text style={styles.item_description}>{item.description}</Text>
      </View>
      <View style={styles.sumaryContainer}>
        <View style={styles.item_Chart}>
          <Text style={styles.chart_value}>{item.time + "\nMin"}</Text>
        </View>
        <View style={styles.item_Chart}>
          <Text style={styles.chart_value}>{item.energy + "\nKCal"}</Text>
        </View>
        <View style={styles.item_Chart}>
          <Text style={styles.chart_value}>{item.fat + "\nFAT"}</Text>
        </View>
      </View>
      <View style={styles.separateLine} />
      <View style={styles.preparationConainer}>
        <Text style={styles.preparationTitle}>{string.title_preparation}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item, index }) => {
              return (
                <MyMagicIngredientItem
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              ); //animation each item
            }}
            numColumns={Math.ceil(data.length / 2)}
          />
        </ScrollView>
        <View style={styles.separateLine} />
      </View>
    </ScrollView>
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
    alignItems: "center",
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
  item_name: {
    width: width * 0.7,
    height: height * 0.1, // 20% height screen
    textAlign: "center",
    fontFamily: "Times New Roman",
    color: colors.white,
    fontSize: 25,
  },
  item_thumbnail: {
    width: height * 0.25, // 25% height screen
    height: height * 0.25, // circle
    borderRadius: height * 0.15, //circle
    marginTop: height * 0.03,
  },
  item_description: {
    width: width * 0.9,
    height: height * 0.12,
    textAlign: "justify",
    marginTop: height * 0.02,
    fontSize: 16,
    fontFamily: "Times New Roman",
  },
  sumaryContainer: {
    width: width,
    height: (height * 3) / 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  item_Chart: {
    width: height * 0.12, // 15% height screen
    height: height * 0.12, // circle
    borderRadius: height * 0.12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.cardView_color,
    borderWidth: 3,
  },
  chart_value: {
    textAlign: "center",
    fontSize: 16,
    color: colors.cardView_color,
    fontWeight: "bold",
  },
  separateLine: {
    height: 3,
    width: width * 0.8,
    backgroundColor: colors.cardView_color,
    alignSelf: "center",
  },
  preparationConainer: {
    height: (height * 6) / 16,
    alignItems: "center",
    padding: height * 0.01,
  },
  preparationTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
export default ItemScreen;
