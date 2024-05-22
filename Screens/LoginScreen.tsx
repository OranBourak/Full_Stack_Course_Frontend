import React, { FC, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clientApi from "../api/ClientApi";
import * as SecureStorage from "../utility/secureStorage";
import { authApi } from "../api/authApi";

// Endpoint configuration for Google Auth
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Configure the Google auth request
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId:
        "259698500105-4n62orajtejvjmv9h4p36tivhfqv22sq.apps.googleusercontent.com",
      scopes: ["openid", "profile", "email"],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  // Handle the response from Google auth
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleAuthentication(authentication);
    }
  }, [response]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStorage.getAccessToken();
        if (token) {
          clientApi.setHeader("Authorization", `Bearer ${token}`);
          navigation.navigate("MainPage");
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to load the token.");
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleGoogleAuthentication = async (authentication: any) => {
    try {
      const backendResponse = await clientApi.post<{
        accessToken: string;
        refreshToken: string;
      }>("/auth/googleLogin", {
        id_token: authentication.idToken,
      });

      if (backendResponse.ok) {
        storeEmailAndNavigate(email);
      } else {
        Alert.alert("Login Failed", "Unable to log in with Google");
      }
    } catch (error) {
      console.error("Google login error: ", error);
      Alert.alert(
        "Login Error",
        "An error occurred during the Google login process"
      );
    }
  };

  const handleRegularLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userDetails = { email, password };
      const result = await authApi.login(userDetails);
      if (result.ok) {
        storeEmailAndNavigate(email);
      } else {
        Alert.alert("Error", "Failed to log in");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Login Error", "An error occurred during the login process.");
    }
  };

  const storeEmailAndNavigate = async (email: string) => {
    try {
      await AsyncStorage.setItem("userEmail", email);

      setEmail("");
      setPassword("");

      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("MainPage");
    } catch (e) {
      Alert.alert("Error", "Failed to save tokens");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome to MyApp!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegularLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>OR</Text>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <FontAwesome
          name="google"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("SignUpUserPage")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "#0066ff",
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  separator: {
    marginVertical: 20,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#0066ff",
    textDecorationLine: "underline",
  },
  icon: {},
});

export default LoginPage;
