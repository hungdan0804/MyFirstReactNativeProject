import React from "react";
import { StyleSheet, Dimensions, View, Text, Animated } from "react-native";
import colors from "../config/color";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const OVERFLOW_HEIGHT = height * 0.1;
const OVERFLOW_WIDTH = width * 0.8;
const ITEM_SIZE = width * 0.6;

function MyOverflowDescriptions({ data, scrollXAnimated }) {
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });
    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });
    if (!item.thumbnail) return <View />;
    return (
      <Animated.View
        key={index}
        style={{
          ...styles.itemContainer,
          transform: [{ scale }, { translateX }],
          opacity,
        }}
      >
        <Text style={styles.item_description}>{item.description}</Text>
      </Animated.View>
    );
  };
  return (
    <View style={{ ...styles.overflowContainer }}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          padding: 10,
        }}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        scrollEnabled={false}
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle = [style, { zIndex: data.length - index }];
          return (
            <View style={newStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    width: OVERFLOW_WIDTH,

    position: "absolute",
    left: -(width * 0.8) / 2,
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    width: OVERFLOW_WIDTH,
    alignSelf: "center",
  },

  item_description: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: "Times New Roman",
  },
});

export default MyOverflowDescriptions;
