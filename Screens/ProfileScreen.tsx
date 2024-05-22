import React, { FC, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "native-base";
import UserModel from "../Models/UserModel";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface UserData {
  name: string;
  email: string;
  bio: string;
  imgUrl: string;
  postCount: number;
  followers: string[];
  following: string[];
}

const ProfilePage: FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [postsCount, setPostsCount] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);

  const loadProfile = async () => {
    setLoading(true);
    const storedEmail = await AsyncStorage.getItem("userEmail");
    if (storedEmail) {
      const userData: UserData = (await UserModel.getUserInfoByEmail(
        storedEmail
      )) as UserData;
      if (userData) {
        setUserName(userData.name);
        setEmail(userData.email);
        setBio(userData.bio);
        setPostsCount(userData.postCount);
        setFollowers(userData.followers.length);
        setFollowing(userData.following.length);
        setProfileImage(userData.imgUrl.replace(/\\/g, "/"));
      } else {
        alert("Failed to fetch user data");
      }
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleEditPress = () => {
    navigation.navigate("EditProfile");
  };

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <Skeleton.Text px="4" lines={4} my="4" />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {profileImage && (
            <Image
              style={styles.profilePhoto}
              source={{
                uri: profileImage,
              }}
            />
          )}
          <Text style={styles.nameText}>{userName}</Text>
          <Text style={styles.nameText}>{email}</Text>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{bio}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{postsCount}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
  },
  button: {
    backgroundColor: "#0066cc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default ProfilePage;
