import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { postApi } from "../api/PostApi";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "native-base";
import postModel from "../Models/PostModel";

const EditPostScreen = ({ route, navigation }: any) => {
  const { post } = route.params;
  const [editedPost, setEditedPost] = useState(post);
  const [newImage, setNewImage] = useState("");
  const oldImage = post.photo;

  const handleUpdate = async () => {
    if (newImage !== "") {
      await postApi.removePostImage(oldImage.replace(/\\/g, "/"));
      const uri = await postModel.uploadPostImage(newImage);
      setEditedPost({ ...editedPost, photo: uri });
    } else if (oldImage !== editedPost.photo) {
      const res = await postApi.removePostImage(oldImage.replace(/\\/g, "/"));
      if (res && res.status !== 200) {
        Alert.alert("Failed to remove old image");
        return;
      }
    }
    const res = await postApi.updatePost(editedPost);
    if (res && res.status === 200) {
      Alert.alert("Post updated successfully!", "", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Failed to update post.");
    }
  };

  const handleDelete = () => {
    //TODO: Implement delete post functionality
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deletePost, style: "destructive" },
      ]
    );
  };

  const deletePost = async () => {
    await postApi.deletePost(editedPost._id);
    navigation.goBack();
  };

  const removeImage = () => {
    setEditedPost({ ...editedPost, photo: "" });
    setNewImage("");
  };

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setNewImage(uri);
        setEditedPost({ ...editedPost, photo: uri });
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
        setNewImage(uri);
        setEditedPost({ ...editedPost, photo: uri });
      }
    } catch (error) {
      console.log("Failed to open gallery: ", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.input}
          value={editedPost.title}
          onChangeText={(text) => setEditedPost({ ...editedPost, title: text })}
          placeholder="Title"
        />
        <Text style={styles.title}>Content</Text>
        <TextInput
          style={styles.input}
          value={editedPost.message}
          onChangeText={(text) =>
            setEditedPost({ ...editedPost, message: text })
          }
          placeholder="Message"
          multiline
        />
        {editedPost.photo ? (
          <View>
            <Text style={styles.title}>Image</Text>
            <View style={styles.input}>
              <Image
                source={{ uri: editedPost.photo }}
                style={styles.image}
                resizeMode="stretch"
              />
              <Button
                title="Remove Photo"
                onPress={removeImage}
                color="#ff4444"
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>Image</Text>
            <View style={styles.input}>
              <Text>
                You can upload image by clicking the gallery or camera icons.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={openCamera}>
                  <Ionicons
                    name="camera"
                    style={styles.cameraButton}
                    size={40}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery}>
                  <Ionicons
                    name="image"
                    style={styles.galleryButton}
                    size={40}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View style={{ marginTop: 10 }}>
          <Button title="Update Post" onPress={handleUpdate} />
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 6,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  cameraButton: {
    bottom: -10,
    left: 0,
    width: 50,
    height: 50,
  },
  galleryButton: {
    bottom: -10,
    right: 0,
    width: 50,
    height: 50,
  },
});

export default EditPostScreen;
