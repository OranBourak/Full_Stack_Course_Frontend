import React, { FC, useState, useEffect } from "react";
import { Alert, FlatList, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VStack, Box, Text, HStack, IconButton } from "native-base";
import PostCard from "../Components/PostCard";
import { postApi } from "../api/PostApi";
import UserApi from "../api/UserApi";
import { Post } from "../Models/PostModel";
import { authApi } from "../api/authApi";
import { getRefreshToken } from "../utility/secureStorage";
import { useFocusEffect } from "@react-navigation/native";

const MainPage: FC<{ navigation: any; onLogout: any }> = ({
  navigation,
  onLogout,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null);
  const [showOnlyMyPosts, setShowOnlyMyPosts] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      const storedUserName = await AsyncStorage.getItem("userEmail");
      if (storedUserName) {
        setUserName(storedUserName);
      }
      await fetchFollowedUsers();
      await fetchPosts();
      setLoggedUserId(await UserApi.getLoggedInUserId());
    };
    initializePage();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch posts again when the page is focused
      fetchPosts();
    });

    return unsubscribe;
  }, [navigation, showOnlyMyPosts]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts(); // Fetch posts when the page is focused
      return () => {};
    }, [showOnlyMyPosts])
  );

  useEffect(() => {
    fetchPosts();
  }, [showOnlyMyPosts]);

  const fetchFollowedUsers = async () => {
    const userFollows: string[] =
      (await UserApi.getFollowedUserIds()) as string[];
    setFollowedUsers(new Set(userFollows));
  };

  const fetchPosts = async () => {
    try {
      const response = await postApi.fetchPosts();

      if (Array.isArray(response.data)) {
        if (showOnlyMyPosts) {
          const myPosts = response.data.filter(
            (post: Post) => post.owner === loggedUserId
          );
          setPosts(myPosts);
          return;
        }
        setPosts(response.data);
      } else {
        // Handle scenarios when the response is not an array
        console.error("API did not return an array:", response);
        Alert.alert(
          "Error",
          "Failed to fetch posts due to unexpected data format."
        );
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      Alert.alert(
        "Error",
        "Failed to fetch posts due to network or server error."
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
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
            const refreshToken = await getRefreshToken();
            console.log("Logging out with refresh token:", refreshToken);
            await authApi.logout({ refreshToken });

            navigation.navigate("LoginPage");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFollowChange = async (userId: string) => {
    if (followedUsers.has(userId)) {
      await UserApi.unFollowUser(userId);
      followedUsers.delete(userId);
    } else {
      await UserApi.followUser(userId);
      followedUsers.add(userId);
    }
    // Update the state to trigger re-render
    setFollowedUsers(new Set(followedUsers));
  };

  return (
    <VStack space={4} flex={1}>
      <Box safeAreaTop bg="primary.600" />
      <HStack
        bg="primary.600"
        px="1"
        py="3"
        justifyContent="center"
        alignItems="center"
        marginTop={-5}
      >
        {/* <Text color="white" fontSize="20" fontWeight="bold">
          Welcome, {userName}!
        </Text> */}
      </HStack>
      <HStack
        bg="primary.900"
        px="4"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        height={"50px"}
        marginTop={-5}
      >
        <Text color="white" fontSize="16">
          {"All Posts"}
        </Text>
        <Switch
          value={showOnlyMyPosts}
          onValueChange={(value) => setShowOnlyMyPosts(value)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={showOnlyMyPosts ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        <Text color="white" fontSize="16">
          {"My Posts"}
        </Text>
      </HStack>
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => (item._id ? item._id.toString() : "")}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            isFollowing={followedUsers.has(item.owner)}
            onFollowChange={() => handleFollowChange(item.owner)}
            userId={loggedUserId ?? ""}
            canEdit={showOnlyMyPosts && item.owner === loggedUserId}
            navigation={navigation}
          />
        )}
      />
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
          onPress={() => navigation.navigate("PostUploadScreen")}
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
