import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

import {store} from "./store/store";
import BookShelf from "./components/BookShelf";
import Book from "./components/Book";
import Search from "./components/Search";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BookShelf"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#b68973",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="BookShelf" component={BookShelf} />
          <Stack.Screen name="Book" component={Book} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
