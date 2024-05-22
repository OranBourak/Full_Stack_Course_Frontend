import React, { useState, FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import * as SecureStorage from "./utility/secureStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginPage from "./Screens/LoginScreen";
import SignUpUserPage from "./Screens/SignUpScreen";
import ProfilePage from "./Screens/ProfileScreen";
import MainPage from "./Screens/MainScreen";
import EditProfilePage from "./Screens/EditProfileScreen";
import PostUploadScreen from "./Screens/AddPostScreen";
import EditPostScreen from "./Screens/EditPostScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop",
  "source.uri should not be an empty string",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userEmail");
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" options={{ headerShown: false }}>
            {(props) => <LoginPage {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUpUserPage"
            component={SignUpUserPage}
            options={{ title: "Sign Up" }}
          />

          <Stack.Screen name="MainPage" options={{ headerShown: false }}>
            {(props) => <MainPage {...props} onLogout={handleLogout} />}
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
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
