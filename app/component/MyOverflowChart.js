import React from "react";
import { StyleSheet, Dimensions, View, Text, Animated } from "react-native";
import colors from "../config/color";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const OVERFLOW_HEIGHT = height * 0.1875;
const OVERFLOW_WIDTH = width * 0.8;
const ITEM_SIZE = width * 0.6;

function MyOverflowChart({ data, scrollXAnimated }) {
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
        <View style={styles.chartContainer}>
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
      </Animated.View>
    );
  };
  return (
    <View style={{ ...styles.overflowContainer }}>
      <FlatList
        horizontal
        inverted
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
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
    width: width * 0.9,
    position: "absolute",
    left: -(width * 0.9) / 2,
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    width: width,
  },

  item_Chart: {
    width: height * 0.12, // 12% height screen
    height: height * 0.12, // circle
    borderRadius: height * 0.12,
    backgroundColor: colors.white,
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
  chartContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default MyOverflowChart;
