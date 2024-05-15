import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import * as SecureStorage from "./utility/secureStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginPage from "./Components/LoginPage";
import SignUpUserPage from "./Components/UserSignUpPage";
import ProfilePage from "./Components/ProfilePage";
import MainPage from "./Components/MainPage";
import EditProfilePage from "./Components/EditProfilePage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    //TODO: Implement login logic
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    //TODO: Implement logout logic
    await SecureStorage.RemoveTokens();
    await AsyncStorage.removeItem("userEmail");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to load the token.");
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="MainPage" options={{ headerShown: false }}>
                {(props) => <MainPage {...props} onLogout={handleLogout} />}
              </Stack.Screen>
              <Stack.Screen name="LoginPage" options={{ headerShown: false }}>
                {(props) => <LoginPage {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfilePage}
                options={{ title: "Edit Profile" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="LoginPage" options={{ headerShown: false }}>
                {(props) => <LoginPage {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen
                name="SignUpUserPage"
                component={SignUpUserPage}
                options={{ title: "Sign Up" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
});
