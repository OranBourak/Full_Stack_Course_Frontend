import { StyleSheet, StatusBar } from "react-native";
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
import PostUploadScreen from "./Components/AddPostPage";
import EditPostScreen from "./Components/EditPostScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop",
  "source.uri should not be an empty string",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
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
              <Stack.Screen
                name="PostUploadScreen"
                component={PostUploadScreen}
                options={{ title: "Upload Post" }}
              />
              <Stack.Screen
                name="EditPostScreen"
                component={EditPostScreen}
                options={{ title: "Edit Post" }}
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
