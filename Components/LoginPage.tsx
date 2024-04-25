import React, { FC, useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UseApi from '../api/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '259698500105-5v2g2mnfto185u6ebm282a0afeve4en2.apps.googleusercontent.com',
    responseType: ResponseType.IdToken,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Use the ID token to sign in to your backend
    }
  }, [response]);

  const handleRegularLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    const userDetails = { email, password };
    const result = await UseApi.userLogin(userDetails);
    if (result && result.status === 200) {
      // Assuming result.data contains the tokens
      const { accessToken, refreshToken } = result.data as { accessToken: string, refreshToken: string };
      try {
        // Save tokens to AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('HomeScreen'); // Navigate to home screen or dashboard
      } catch (e) {
        Alert.alert('Error', 'Failed to save tokens');
      }
    } else {
      Alert.alert('Error', 'Failed to log in');
    }
    AsyncStorage.getItem('accessToken').then(token => {
      console.log('AccessToken:', token);
    });
    
    AsyncStorage.getItem('refreshToken').then(token => {
      console.log('RefreshToken:', token);
    });
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcomeMessage}>Welcome to MyApp!</Text>
      
      {/* Regular Login */}
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

      {/* Separator */}
      <Text style={styles.separator}>OR</Text>

      {/* Google Login */}
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <FontAwesome name="google" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Navigate to Sign-Up Page */}
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('SignUpUserPage')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#0066ff',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    marginVertical: 20,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#0066ff',
    textDecorationLine: 'underline',
  },
  icon: {
  }
});

export default LoginPage;
