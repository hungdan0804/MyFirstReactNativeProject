import React, { useRef, useEffect, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
} from "react-native";
import colors from "../config/color";
import { AppLoading } from "expo";
import {
  FlingGestureHandler,
  Directions,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

function MyMagicFavoriteItem({ item, index, navigation }) {
  const animateItem = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1, 2];

  const handleItemClick = useCallback(() => {
    console.log(item);
    navigation.navigate("Item", { item: item, index: index });
  }, []);

  const translateX = animateItem.interpolate({
    inputRange,
    outputRange: index % 2 == 0 ? [width, 0, 0] : [-width, 0, 0],
  });

  const opacity = animateItem.interpolate({
    inputRange,
    outputRange: [0, 0, 1],
  });
  const scale = animateItem.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  const rotate = animateItem.interpolate({
    inputRange,
    outputRange: ["0deg", "360deg", "1080deg"],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 500),
      Animated.timing(animateItem, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(animateItem, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const EvenView = () => {
    return (
      <View style={{ ...styles.container, flexDirection: "row" }}>
        <Animated.Image
          style={{
            ...styles.item_thumbnail,
            transform: [{ translateX }, { scale }, { rotate }],
          }}
          source={item.thumbnail}
        />
        <Animated.View
          style={{
            ...styles.cardView,
            backgroundColor: colors.cardView_color,
            flexDirection: "row",
            opacity,
          }}
        >
          <Animated.Text style={{ ...styles.item_name, color: colors.white }}>
            {item.name}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  };

  const OddView = () => {
    return (
      <View style={{ ...styles.container, flexDirection: "row-reverse" }}>
        <Animated.Image
          style={{
            ...styles.item_thumbnail,
            transform: [{ translateX }, { scale }, { rotate }],
          }}
          source={item.thumbnail}
        />
        <Animated.View
          style={{
            ...styles.cardView,
            backgroundColor: colors.white,
            flexDirection: "row-reverse",
            opacity,
          }}
        >
          <Text
            style={{ ...styles.item_name, color: colors.cardView_color }}
            numberOfLines={4}
          >
            {item.name}
          </Text>
        </Animated.View>
      </View>
    );
  };

  function MyView() {
    return index % 2 == 0 ? <EvenView /> : <OddView />;
  }
  return (
    <TouchableWithoutFeedback onPress={handleItemClick}>
      <MyView />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cardView: {
    width: width * 0.7, //80% width screen
    height: height * 0.15, // 15% height screen
    borderRadius: 15,
    borderColor: colors.cardView_color,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15,
    alignItems: "flex-start",
    zIndex: 1,
    right: width * 0.07,
  },
  item_thumbnail: {
    width: height * 0.15, // 15% height screen
    height: height * 0.15, // circle
    borderRadius: height * 0.15, //circle
    zIndex: 2,
    left: width * 0.07,
  },
  item_name: {
    position: "absolute",
    width: width * 0.5,
    height: height * 0.15,
    textAlignVertical: "center",
    textAlign: "justify",
    left: height * 0.075,
    padding: 10,
    fontSize: 18,
    fontFamily: "Times New Roman",
  },
});
export default MyMagicFavoriteItem;
