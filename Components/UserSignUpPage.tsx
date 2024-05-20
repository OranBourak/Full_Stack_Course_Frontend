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
import React, { FC, useEffect, useState } from "react";
import UserModel, { User } from "../Models/UserModel";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const SignUpUserPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [avatarUri, setAvatarUri] = useState("../assets/Avatar.jpg");
  const [userName, setUserName] = useState("");

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // askPermission function to request camera permissions
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

  useEffect(() => {
    askPermission();
  }, []);

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setAvatarUri(uri);
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
        setAvatarUri(uri);
        console.log("URI: ", uri);
      }
    } catch (error) {
      console.log("Failed to open gallery: ", error);
    }
  };

  const onCancel = () => {
    console.log("Cancel");
    onChangeEmail("");
    onChangePassword("");
    setAvatarUri("");
    setUserName("");
    navigation.navigate("LoginPage");
  };

  const onSave = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    if (userName === "") {
      Alert.alert("Invalid Name", "Please enter your name.");
      return;
    }
    console.log("Save button pressed");
    const user: User = {
      name: userName,
      email: email,
      password: password,
      imgUrl: avatarUri,
    };
    try {
      console.log("Adding user to server: ", user);
      if (avatarUri !== "../assets/Avatar.jpg") {
        const url = await UserModel.uploadImage(avatarUri);
        console.log("Image uploaded to: ", url);
        user.imgUrl = url as string; // Type assertion to treat 'url' as string
      } else {
        user.imgUrl = "http://192.168.7.32:3000/uploads/Avatar.jpg";
      }
      const res = await UserModel.addUser(user);
      if (res) {
        if (res.status == 200) {
          Alert.alert(
            "Sign Up Successful",
            "You have successfully signed up. Please login to continue."
          );
        } else {
          Alert.alert(
            "Sign Up Failed",
            "User already exists. Please login to continue."
          );
        }
      }
    } catch (error) {
      console.log("Failed to add user to server: ", error);
    }
    onChangeEmail("");
    onChangePassword("");
    setAvatarUri("");
    setUserName("");

    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.container}>
      <View>
        {avatarUri == "../assets/Avatar.jpg" && (
          <Image
            source={require("../assets/Avatar.jpg")}
            style={styles.avatar}
          />
        )}
        {avatarUri !== "../assets/Avatar.jpg" && (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        )}
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name="camera" style={styles.cameraButton} size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name="image" style={styles.galleryButton} size={40} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter your email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    padding: 10,
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
});

export default SignUpUserPage;
