import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import SlideScreen from "./app/screens/SlideScreens";
import Settings from "./app/screens/Setting";
import FullScreenImageScreen from "./app/screens/FullScreenImageScreen";
import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();

export default function App() {
  const db = SQLite.openDatabase("example.db");
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM domainName LIMIT 1",
        null,
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            setInitialRoute("ViewImageScreen");
          } else {
            setInitialRoute("WelcomeScreen");
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  }, []);
  // if (initialRoute != null) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ViewImageScreen"
            component={ViewImageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SlideScreens"
            component={SlideScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FullScreenImageScreen"
            component={FullScreenImageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  // }
}
