import React, { FC, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import PostModel from "../Models/PostModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from "react-native";

const PostUploadScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [post, setPost] = useState({
    title: "",
    message: "",
    photo: "",
    owner: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const getOwnerEmail = async () => {
      const ownerEmail = await AsyncStorage.getItem("userEmail");
      setPost({ ...post, owner: ownerEmail ?? "" });
    };
    getOwnerEmail();
  }, []);

  const handleUploadPost = async () => {
    const res = await PostModel.addPost(post);
    if (res && res.status === 201) {
      Alert.alert("Post uploaded successfully!", "", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Failed to upload post.");
    }
  };

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setPost({ ...post, photo: uri });
        setStatusMessage("Photo added successfully!");
      }
    } catch (error) {
      console.log("Failed to open camera: ", error);
      setStatusMessage("Failed to open camera.");
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setPost({ ...post, photo: uri });
        setStatusMessage("Photo added successfully!");
      }
    } catch (error) {
      console.log("Failed to open gallery: ", error);
      setStatusMessage("Failed to open gallery.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={post.title}
          onChangeText={(text) => setPost({ ...post, title: text })}
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          multiline={true}
          numberOfLines={4}
          value={post.message}
          onChangeText={(text) => setPost({ ...post, message: text })}
        />
        <Text>{statusMessage}</Text>
        {post.photo && (
          <Image
            source={{ uri: post.photo }}
            style={styles.preview}
            resizeMode="stretch"
          />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Choose Photo" onPress={openGallery} />
          <Button title="Take Photo" onPress={openCamera} />
        </View>
        <Button title="Upload Post" onPress={() => handleUploadPost()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  input: {
    width: "90%",
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc", // Light grey border
    borderRadius: 5, // Rounded corners
    backgroundColor: "#fff", // White background for inputs
  },
  messageInput: {
    width: "90%",
    margin: 10,
    borderWidth: 1,
    padding: 10,
    height: 120, // Larger height for message box
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlignVertical: "top", // Ensures text starts from the top
  },
  preview: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
});

export default PostUploadScreen;
