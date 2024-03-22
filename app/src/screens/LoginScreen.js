import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql, useQuery } from '@apollo/client';
import { setAuthToken, getAuthToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login_mutation = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      errors {
        message
      }
    }
  }
`;

const Dummy = gql`
query users{
  users{
    id
  }
}
`


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Login");
  const navigation = useNavigation();

  const [signInMutation] = useMutation(Login_mutation);
  const { loading, error, data } = useQuery(Dummy);
  
  console.log(data,"data")

  const handleLogin = async () => {
    try {
      const { data } = await signInMutation({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });
      if (data.login.errors && data.login.errors.length > 0) {
        // Handle errors
        setErrorMessage(data.login.errors[0].message);
      } else {
        const token = data.login.accessToken;
        await AsyncStorage.setItem('authToken', token)
        // setAuthToken(token);
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      setIsError(true);
      console.error('Error logging in:', error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  const userToken = getAuthToken();
  const checkLoggedIn = () => {
    console.log(userToken, "login")
    if (userToken) {
      const user = jwtDecode < String > (userToken);
      if (typeof user.userId !== 'undefined') {
        navigation.navigate('HomeScreen');
      }
    }
  };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.centerContainer}>
        <View style={styles.titleContainer}>
          <Text>{errorMessage}</Text>
        </View>
        <TextInput
          value={email}
          placeholder="Enter your email here"
          onChangeText={(text) => setEmail(text)}
          style={styles.inputBox}
        />
        <TextInput
          value={password}
          placeholder="Enter your password here"
          onChangeText={(text) => setPassword(text)}
          style={styles.inputBox}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.inputButton}>
          <Text>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text>Resetpassword</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text>Register your account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;