import React,{FC, useState} from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';

const LoginPage:FC<{navigation: any}> = ({navigation})=>{
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  // Google Sign-In request and response
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '259698500105-5v2g2mnfto185u6ebm282a0afeve4en2.apps.googleusercontent.com',
    responseType: ResponseType.IdToken,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // You can now use the ID token to sign in to your backend
    }
  }, [response]);

  const handleRegularLogin = () => {
    // Handle the regular login with email and password here
  };

  return (
    <View>
      {/* Regular Login */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleRegularLogin}
      />

      {/* Separator */}
      <Text>OR</Text>

      {/* Google Login */}
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />

      {/* Navigate to Sign-Up Page */}
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUpUserPage')}
      />
    </View>
  );
}

export default LoginPage;
