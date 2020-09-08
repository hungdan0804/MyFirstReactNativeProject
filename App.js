import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "./app/screens/HomeScreen";
import SearchScreen from "./app/screens/SearchScreen";
import FavoriteScreen from "./app/screens/FavoriteScreen";
import colors from "./app/config/color";
import string from "./app/config/string";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const myFont = {
  "Times New Roman": require("../Project_3/app/fonts/font-times-new-roman.ttf"),
};

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator
      initialRouteName="Favorite"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
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
      <Tab.Navigator
        sceneAnimationEnabled={true}
        shifting={true}
        backBehavior={"none"}
        barStyle={{
          height: "9%",
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
          component={HomeStack}
          options={{
            tabBarLabel: (
              <Text style={styles.label}>{string.tab_bar_Home}</Text>
            ),

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
          component={SearchStack}
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
          component={FavoriteStack}
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
