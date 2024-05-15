import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import UserModel from "../Models/UserModel";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Skeleton } from "native-base";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
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

const EditProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldAvatar, setOldAvatar] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const storedEmail = await AsyncStorage.getItem("userEmail");
      console.log("Stored email: ", storedEmail);
      if (storedEmail) {
        const userData: UserData = (await UserModel.getUserInfoByEmail(
          storedEmail
        )) as UserData;
        console.log("User data: ", userData);
        if (userData) {
          setName(userData.name);
          setEmail(userData.email);
          setBio(userData.bio);
          setAvatar(userData.imgUrl.replace(/\\/g, "/"));
          setOldAvatar(userData.imgUrl.replace(/\\/g, "/"));
        } else {
          alert("Failed to fetch user data");
        }
      }
      setLoading(false);
    };

    loadProfile();
    askPermission();
  }, []);

  const askPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need camera permissions to make this work!");
      }
    } catch (error) {
      console.log("Ask permission error: ", error);
    }
  };

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setAvatar(uri);
      }
    } catch (error) {
      console.log("Failed to open camera: ", error);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setAvatar(uri);
      }
    } catch (error) {
      console.log("Failed to open gallery: ", error);
    }
  };

  const handleSubmit = async () => {
    if (avatar !== oldAvatar) {
      const url = await UserModel.updateUserImage(avatar, oldAvatar);
      console.log("Image uploaded to: ", url);
      if (url) {
        setAvatar(url);
      }
    }
    const user = { name, email, bio, imgUrl: avatar };
    console.log("User data to change: ", user);
    const res = await UserModel.updateUser(user);
    if (res) {
      Alert.alert("Profile updated successfully!");
    }
  };

  if (loading) {
    return (
      <ScrollView style={styles.skeletonContainer}>
        <Skeleton.Text px="4" lines={4} my="4" />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              avatar ||
              "https://www.bootdey.com/img/Content/avatar/avatar1.png",
          }}
        />
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name="camera" style={styles.cameraButton} size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name="image" style={styles.galleryButton} size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bio"
          value={bio}
          onChangeText={setBio}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -100,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  skeletonContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  avatarContainer: {
    marginTop: 0,
    width: Dimensions.get("window").width,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
});

export default EditProfilePage;
