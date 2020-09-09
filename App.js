import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, Dimensions, Button } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  navigationOptions,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "./app/screens/HomeScreen";
import SearchScreen from "./app/screens/SearchScreen";
import FavoriteScreen from "./app/screens/FavoriteScreen";
import ItemScreen from "./app/screens//ItemScreen";
import colors from "./app/config/color";
import string from "./app/config/string";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const { width, height } = Dimensions.get("screen");

const myFont = {
  "Times New Roman": require("../Project_3/app/fonts/font-times-new-roman.ttf"),
};

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={MyTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={MyTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorite"
        component={MyTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Item"
        component={ItemScreen}
        options={{
          headerShown: true,
          headerTitle: false,

          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0.1,
            shadowOpacity: 0.1,
            borderBottomWidth: 0,
          },
          headerTintColor: colors.white,

          headerRight: () => (
            <MaterialIcons
              style={{ alignSelf: "center", marginEnd: width * 0.05 }}
              name={string.ic_name_favorite}
              color={colors.white}
              size={24}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      sceneAnimationEnabled={true}
      shifting={true}
      backBehavior={"none"}
      barStyle={{
        height: height * 0.09,
        backgroundColor: colors.primary,
        marginStart: "10%", //navigation width 80% width screen
        marginEnd: "10%", //navigation width 80% width screen
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        overflow: "hidden",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Tab.Screen
        name={string.tab_bar_Home}
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={styles.label}>{string.tab_bar_Home}</Text>,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name={string.ic_name_home}
              color={colors.white}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name={string.tab_bar_Search}
        component={SearchScreen}
        options={{
          tabBarLabel: (
            <Text style={styles.label}>{string.tab_bar_Search}</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name={string.ic_name_search}
              color={colors.white}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name={string.tab_bar_Favorite}
        component={FavoriteScreen}
        options={{
          tabBarLabel: (
            <Text style={styles.label}>{string.tab_bar_Favorite}</Text>
          ),

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name={string.ic_name_favorite}
              color={colors.white}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!fontLoaded) {
      loadFont();
    }
  }, []);

  async function loadFont() {
    await Font.loadAsync(myFont);
    setFontLoaded(true);
  }

  return fontLoaded ? (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
});
