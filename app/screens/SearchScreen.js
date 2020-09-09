import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Picker,
} from "react-native";
import colors from "../config/color";
import string from "../config/string";
import { TextInput, FlatList } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyMagicHistoryItem from "../component/MyMagicHistoryItem";
import MyMagicCategoryItem from "../component/MyMagicCategoryItem";

const { width, height } = Dimensions.get("screen");
const DATA = [
  {
    id: "1",
    thumbnail: require("../assets/item_1.png"),
  },
  {
    id: "2",
    thumbnail: require("../assets/item_2.png"),
  },
  {
    id: "3",
    thumbnail: require("../assets/item_3.png"),
  },
  {
    id: "4",
    thumbnail: require("../assets/item_1.png"),
  },
];

const DATA_CATEGORY = [
  {
    id: "1",
    title: "Appetizers",
    thumbnail: require("../assets/item_1.png"),
  },
  {
    id: "2",
    title: "Soups",
    thumbnail: require("../assets/item_2.png"),
  },
  {
    id: "3",
    title: "Salads",
    thumbnail: require("../assets/item_3.png"),
  },
  {
    id: "4",
    title: "Main Dishes",
    thumbnail: require("../assets/item_3.png"),
  },
  {
    id: "5",
    title: "Breads",
    thumbnail: require("../assets/item_2.png"),
  },
  {
    id: "6",
    title: "Rolls",
    thumbnail: require("../assets/item_1.png"),
  },
  {
    id: "7",
    title: "Desserts",
    thumbnail: require("../assets/item_2.png"),
  },
  {
    id: "8",
    title: "Beverages",
    thumbnail: require("../assets/item_1.png"),
  },
  {
    id: "9",
    title: "Miscellaneous",
    thumbnail: require("../assets/item_3.png"),
  },
];

function SearchScreen(props) {
  const [selectedItem, setSelectedItem] = useState(string.comboBox_msg_1);
  const [data, setData] = useState(DATA);
  const [category, setCategory] = useState(DATA_CATEGORY);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
          >
            <Picker.Item
              label={string.comboBox_msg_1}
              value={string.comboBox_msg_1}
            />
            <Picker.Item
              label={string.comboBox_msg_2}
              value={string.comboBox_msg_2}
            />
          </Picker>
        </View>
        <View style={styles.searchBoxContainer}>
          <MaterialIcons
            name={string.ic_name_search}
            size={24}
            color={colors.inactive_tab}
          />
          <TextInput
            style={styles.searchBox}
            placeholder={string.searchBox_msg}
          />
        </View>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.title_history}>{string.title_history}</Text>
        <FlatList
          style={styles.historyList}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return <MyMagicHistoryItem item={item} index={index} />; //animation each item
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.title_history}>{string.title_category}</Text>
        <FlatList
          data={category}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return <MyMagicCategoryItem item={item} index={index} />; //animation each item
          }}
          numColumns={3}
        />
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
    height: height / 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  historyContainer: {
    height: (height * 3) / 16,
    alignItems: "center",
  },
  categoryContainer: {
    height: (height * 9) / 16,
    alignItems: "center",
  },
  pickerContainer: {
    width: width * 0.3, // 30% width screen
    height: (height * 9) / 160, // 45% parent, parent = 12.5% height screen
    borderColor: colors.inactive_tab,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    padding: 5,
  },
  searchBoxContainer: {
    flexDirection: "row-reverse",
    width: width * 0.52, // 52% width screen
    height: (height * 9) / 160, // 45% parent, parent = 12.5% height screen
    borderColor: colors.inactive_tab,
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  searchBox: {
    width: width * 0.4, // 40% width screen
    height: (height * 9) / 160, // 45% parent, parent = 12.5% height screen
  },
  historyList: {
    marginStart: "5%",
  },
  title_history: {
    fontFamily: "Times New Roman",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginStart: "8%",
  },
});

export default SearchScreen;
