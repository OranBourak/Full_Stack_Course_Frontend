import React, { FC, useState, useEffect } from "react";
import { VStack, Box, Text, HStack, IconButton, Center } from "native-base";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainPage: FC<{ navigation: any; onLogout: any }> = ({
  navigation,
  onLogout,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]); // Replace 'any' with your post type

  useEffect(() => {
    const loadUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      if (storedUserName !== null) {
        setUserName(storedUserName);
      }
    };

    loadUserName();
    //TODO: Replace with your API call to fetch posts
  }, []);

  const fetchPosts = async () => {
    //TODO: Your API call to fetch posts
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout", // Title of the alert
      "Are you sure you want to log out?", // Message of the alert
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            onLogout();
            navigation.navigate("LoginPage");
          },
        },
      ],
      { cancelable: false } // This prevents tapping outside of the alert from closing it
    );
  };

  return (
    <VStack space={4} flex={1}>
      <Box safeAreaTop bg="primary.600" />
      <HStack
        bg="primary.600"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Welcome, {userName}!
          </Text>
        </HStack>
      </HStack>
      <VStack space={4} flex={1}>
        {/* Your content goes here, replace with your actual post components */}
        {posts.map((post) => (
          <Box key={post.id} p="5" shadow={2} bg="white">
            <Text color="coolGray.800">{post.content}</Text>
          </Box>
        ))}
      </VStack>
      <HStack
        bg="primary.600"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          icon={<MaterialIcons name="person" size={24} color="white" />}
          onPress={() => navigation.navigate("ProfilePage")}
        />
        <IconButton
          icon={<MaterialIcons name="add" size={24} color="white" />}
          onPress={() => navigation.navigate("AddPostPage")}
        />
        <IconButton
          icon={<MaterialIcons name="home" size={24} color="white" />}
          onPress={() => navigation.navigate("MainPage")}
        />
        <IconButton
          icon={<MaterialIcons name="logout" size={24} color="white" />}
          onPress={handleLogout}
        />
      </HStack>
    </VStack>
  );
};

export default MainPage;
