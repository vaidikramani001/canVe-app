import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [signInMutation] = useMutation(Login_mutation);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken) {
      const user = jwtDecode(authToken);
      if (user.userId) {
        navigation.navigate('HomeScreen');
      }
    }
  };

  const handleLogin = async () => {
    // navigation.navigate('HomeScreen');

    try {
      const { data } = await signInMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      if (data.login.errors && data.login.errors.length > 0) {
        setErrorMessage(data.login.errors[0].message);
        setIsError(true);
      } else {
        const { accessToken } = data.login;
        await AsyncStorage.setItem('authToken', accessToken);
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      setIsError(true);
      console.error('Error logging in:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}> */}
      <View style={styles.centeredContent}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcome}>Login to your account</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              textContentType="password"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.link}>Reset password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#00A08B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  links: {
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    color: '#00A08B',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
});

export default LoginScreen;