import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
  Animated,
} from "react-native";

import colors from "../config/color";
import string from "../config/string";
import {
  FlatList,
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import MyMagicIngredientItem from "../component/MyMagicIngredientItem";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("screen");

const DATA2 = [
  {
    step: 1,
    method:
      "Heat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more. Tip in the tomatoes and sugar, and season. Bring to a simmer, then add the gnocchi and cook for 8 mins, stirring often, until soft. Heat the grill to high.",
  },
  {
    step: 2,
    method:
      "Heat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more. Tip in the tomatoes and sugar, and season. Bring to a simmer, then add the gnocchi and cook for 8 mins, stirring often, until soft. Heat the grill to high.",
  },
  {
    step: 3,
    method:
      "Heat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more. Tip in the tomatoes and sugar, and season. Bring to a simmer, then add the gnocchi and cook for 8 mins, stirring often, until soft. Heat the grill to high.",
  },
];

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
const VISIBLE_ITEM = 3;

function ItemScreen({ route, navigation }) {
  const { item } = route.params;
  const { index } = route.params;
  const [data, setData] = useState(DATA);
  const [steps, setSteps] = useState(DATA2);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [myIndex, setMyIndex] = useState(0);

  const setActiveIndex = useCallback((activeIndex) => {
    setMyIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  }, []);

  const renderItem = ({ item, index }) => {
    const inputRange = [index - 1, index, index + 1];

    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });
    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    return (
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === steps.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }

              setActiveIndex(index - 1);
            }
          }}
        >
          <Animated.View
            style={{
              ...styles.stepViewContainer,
              transform: [{ translateX }, { scale }],
              opacity,
            }}
          >
            <Text style={styles.stepTitle}>{"Step: " + item.step}</Text>
            <Text style={styles.stepMedthod}>{item.method}</Text>
          </Animated.View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  };

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, []);

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
      <View style={styles.methodContainer}>
        <Text style={styles.preparationTitle}>{string.title_method}</Text>
        <FlatList
          horizontal
          inverted
          data={steps}
          keyExtractor={(_, index) => String(index)}
          scrollEnabled={false}
          removeClippedSubviews={false}
          renderItem={renderItem}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
          CellRendererComponent={({
            item,
            index,
            children,
            style,
            ...props
          }) => {
            const newStyle = [style, { zIndex: steps.length - index }];
            return (
              <View style={newStyle} index={index} {...props}>
                {children}
              </View>
            );
          }}
        />
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
    height: height * 0.1, // 10% height screen
    textAlign: "center",
    fontFamily: "Times New Roman",
    color: colors.white,
    fontSize: 25,
  },
  item_thumbnail: {
    width: height * 0.23, // 25% height screen
    height: height * 0.23, // circle
    borderRadius: height * 0.23, //circle
    marginTop: height * 0.05,
  },
  item_description: {
    width: width * 0.9,
    height: height * 0.12,
    textAlign: "justify",
    marginTop: height * 0.02,
    fontSize: 16,
    fontFamily: "Times New Roman",
    opacity: 0.7,
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
  methodContainer: {
    width: width,
    height: (height * 5) / 16,
    alignItems: "center",
  },
  stepViewContainer: {
    position: "absolute",
    height: height * 0.22,
    width: width * 0.7,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.cardView_color,
    left: -(width * 0.7) / 2,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepMedthod: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "justify",
  },
});
export default ItemScreen;
