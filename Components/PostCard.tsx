import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Post } from "../Models/PostModel";
import { postApi } from "../api/PostApi";
import UserApi from "../api/UserApi";

const isLiked = (post: Post, userId: string) => {
  // Check if the post is liked
  if (post.likes?.includes(userId)) {
    return true;
  }
  return false;
};

const likePost = async (postId: any) => {
  await postApi.likePost(postId);
};

const unlikePost = async (postId: any) => {
  // Unlike a post via postId
  await postApi.unlikePost(postId);
};

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PostCard = ({
  post,
  isFollowing,
  userId,
}: {
  post: Post;
  isFollowing: boolean;
  userId: string;
}) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(isFollowing);
  const [postOwnerInfo, setPostOwnerInfo] = useState({ name: "", imgUrl: "" });

  useEffect(() => {
    const checkLikeStatus = async () => {
      const likeStatus = await isLiked(post, userId); // Ensure isLiked handles async operations correctly
      setLiked(likeStatus);
    };
    checkLikeStatus();
  }, [post, userId]);

  useEffect(() => {
    const fetchPostOwnerInfo = async () => {
      const ownerInfo: any = await UserApi.getUserInfoById(post.owner);
      setPostOwnerInfo(ownerInfo);
    };
    fetchPostOwnerInfo();
  }, []);

  const handleLike = async () => {
    if (liked) {
      await unlikePost(post._id);
    } else {
      await likePost(post._id);
    }
    setLiked(!liked);
  };

  const handleFollow = async (post: Post) => {
    if (following) {
      await UserApi.unFollowUser(post.owner);
    } else {
      await UserApi.followUser(post.owner);
    }
    setFollowing(!following);
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: postOwnerInfo.imgUrl }}
          style={styles.postAvatar}
        />
        <Text style={styles.postUsername}>{postOwnerInfo.name}</Text>
        <Text style={styles.postDate}>{formatDate(post.updatedAt)}</Text>
      </View>
      <Text style={styles.postDescription}>{post.title}</Text>
      <Text style={styles.postMessage}>{post.message}</Text>
      {post.photo && (
        <Image source={{ uri: post.photo }} style={styles.postImage} />
      )}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.postButton} onPress={handleLike}>
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={24}
            color={liked ? "red" : "grey"}
          />
          <Text style={styles.postButtonText}>{liked ? "Unlike" : "Like"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleFollow(post)}
        >
          <MaterialIcons
            name={following ? "person" : "person-add"}
            size={24}
            color={following ? "green" : "grey"}
          />
          <Text style={styles.postButtonText}>
            {following ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  postUsername: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  postDate: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  postDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  postButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
});

export default PostCard;
