import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  Text,
  Image,
  Animated,
} from "react-native";
import colors from "../config/color";
import string from "../config/string";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  FlatList,
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import SearchScreen from "../screens/SearchScreen";

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

const SPACING = 10;
const ITEM_WIDTH = width * 0.55; //Item Width = 55% Screen Width
const ITEM_HEIGHT = ITEM_WIDTH * 2.3;
const VISIBLE_ITEM = 3;

function HomeScreen(props) {
  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  }, []);

  const [data, setData] = useState(DATA);
  const [index, setIndex] = useState(0);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -100],
    });

    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [1 - 1 / VISIBLE_ITEM, 1, 0],
    });
    return (
      <Animated.View
        style={{
          ...styles.cardView,
          transform: [{ translateX }, { scale }],
          opacity,
        }}
      >
        <MaterialIcons
          style={styles.fav_icon}
          name={string.ic_name_favorite}
          size={30}
          color={colors.white}
        />
        <Image style={styles.item_thumbnail} source={item.thumbnail} />
        <Text style={styles.item_name} numberOfLines={3}>
          {item.name}
        </Text>
        <Text style={styles.item_description}>{item.description}</Text>
      </Animated.View>
    );
  };

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (index === data.length - 1) {
      //fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
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
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.circle}>
              <Text style={styles.logo}>{string.logo}</Text>
            </View>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.title_rec}>{string.title_rec}</Text>
            <FlatList
              style={styles.list}
              horizontal
              inverted
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, index) => String(index)}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              removeClippedSubviews={false}
              // wrap list item into new view with diff z-index
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [style, { zIndex: data.length - index }];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: SPACING,
              }}
            ></FlatList>
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: StatusBar.currentHeight,
    backgroundColor: colors.white,
  },
  header: {
    flex: 3, //header 3/16
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
  mainContent: {
    // main content 11/16
    flex: 11,
  },
  title_rec: {
    fontSize: 25,
    left: width / 12, //8.33% width screen
    fontWeight: "bold",
  },
  list: {
    marginTop: 5,
    marginEnd: "5%",
  },
  cardView: {
    width: ITEM_WIDTH, //55% width screen
    height: ITEM_HEIGHT,
    position: "absolute",
    left: -ITEM_WIDTH / 2,
    marginBottom: height / 16, //6.25% height screen
    borderRadius: 15,
    backgroundColor: colors.cardView_color,
    alignItems: "center",
    shadowColor: colors.cardView_shawdow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  fav_icon: {
    alignSelf: "flex-end",
    margin: "6%",
  },
  item_thumbnail: {
    width: (width * 2) / 5, // parent: 55% width screen, child 40% width screen
    height: (width * 2) / 5, // parent: 55% width screen, child 40% width screen
    borderRadius: (width * 2) / 5, //circle
    marginTop: "15%", // 15% parent
  },
  item_name: {
    height: "20%", // 20% parent height
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.white,
    fontFamily: "Times New Roman",
    fontSize: 20,
    fontWeight: "bold",
    marginStart: "7%", //7% parent width
    marginEnd: "7%", //7% parent width
  },
  item_description: {
    height: "25%", //25% parent height
    marginStart: "7%", //7% parent width
    marginEnd: "7%", //7% parent width
    fontFamily: "Times New Roman",
    textAlign: "justify",
    alignSelf: "flex-start",
    color: colors.white,
    opacity: 0.7,
  },
});

export default HomeScreen;
